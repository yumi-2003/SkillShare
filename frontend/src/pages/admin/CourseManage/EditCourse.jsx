import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCourse } from "../../../stores/slices/courseSlice";
import { getAllCategories } from "../../../stores/slices/categorySlice";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../apiCalls/axiosInstance";
const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { status, error } = useSelector((state) => state.course);
  const firstRender = useRef(true);

  const [preview, setPreview] = useState("");
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    totalLessons: "",
    duration: "",
    category: "",
    image: null,
  });

  // Fetch categories
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // Fetch course data
  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const res = await axiosInstance.get(`/courses/${id}`);
        if (res.data.isSuccess) {
          const { courseDoc } = res.data;
          setCourseData({
            title: courseDoc.title || "",
            description: courseDoc.description || "",
            totalLessons: courseDoc.totalLessons || "",
            duration: courseDoc.duration || "",
            category: courseDoc.category?._id || "",
            image: null, // don’t preload file
          });
          setPreview(courseDoc.image || "");
        }
      } catch (err) {
        console.error("Failed to fetch course", err.message);
        toast.error("Failed to fetch course");
      }
    };
    fetchCourseById();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setCourseData({ ...courseData, image: files[0] });
    } else {
      setCourseData({ ...courseData, [name]: value });
    }
  };

  // Preview new image
  useEffect(() => {
    if (courseData.image) {
      const objectUrl = URL.createObjectURL(courseData.image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [courseData.image]);

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("category", courseData.category);
    formData.append("duration", courseData.duration || "");
    formData.append("totalLessons", courseData.totalLessons || "");

    if (courseData.image) {
      formData.append("image", courseData.image);
    }

    dispatch(updateCourse({ id, data: formData }));
  };

  // Watch status for toast
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (status === "loading") {
      toast.info("Updating course...", { autoClose: 1000 });
    }
    if (status === "succeeded") {
      toast.success("Course updated successfully!", { autoClose: 2000 });
      navigate("/allcourses"); // redirect after update
    }
    if (status === "failed") {
      toast.error(error || "Something went wrong!", { autoClose: 3000 });
    }
  }, [status, error, navigate]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6 text-center">Edit Course</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 font-medium">Title:</label>
            <input
              name="title"
              type="text"
              value={courseData.title}
              onChange={handleChange}
              placeholder="Course title"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Category:</label>
            <select
              name="category"
              value={courseData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            >
              <option value="">Select Category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Description:</label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">Total Lessons</label>
              <input
                type="number"
                name="totalLessons"
                value={courseData.totalLessons}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Duration</label>
              <input
                type="text"
                name="duration"
                value={courseData.duration}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="e.g. 8 weeks"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Course Image:</label>
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={handleChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg mt-2"
              />
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 w-full rounded-lg text-white hover:bg-blue-700"
          >
            Update Course
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default EditCourse;
