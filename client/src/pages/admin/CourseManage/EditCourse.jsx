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
    lessons: [],
  });

  const handleAddLesson = () => {
    setCourseData({
      ...courseData,
      lessons: [...courseData.lessons, { title: "", content: "", type: "video" }],
    });
  };

  const handleRemoveLesson = (index) => {
    const updatedLessons = [...courseData.lessons];
    updatedLessons.splice(index, 1);
    setCourseData({ ...courseData, lessons: updatedLessons });
  };

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...courseData.lessons];
    updatedLessons[index][field] = value;
    setCourseData({ ...courseData, lessons: updatedLessons });
  };

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
            lessons: courseDoc.lessons || [],
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
    formData.append("lessons", JSON.stringify(courseData.lessons));
    formData.append("totalLessons", courseData.lessons.length);

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

          {/* Lessons Section */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Lessons</h3>
              <button
                type="button"
                onClick={handleAddLesson}
                className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
              >
                + Add Lesson
              </button>
            </div>

            {courseData.lessons.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">No lessons added yet.</p>
            ) : (
              <div className="space-y-4">
                {courseData.lessons.map((lesson, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative group">
                    <button
                      type="button"
                      onClick={() => handleRemoveLesson(index)}
                      className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Lesson Title</label>
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) => handleLessonChange(index, "title", e.target.value)}
                          placeholder="Lesson Title"
                          className="w-full mt-1 px-3 py-2 text-sm border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
                        <select
                          value={lesson.type}
                          onChange={(e) => handleLessonChange(index, "type", e.target.value)}
                          className="w-full mt-1 px-3 py-2 text-sm border rounded-lg"
                        >
                          <option value="video">Video</option>
                          <option value="blog">Blog</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">
                        {lesson.type === "video" ? "Video URL" : "Blog Content"}
                      </label>
                      <textarea
                        value={lesson.content}
                        onChange={(e) => handleLessonChange(index, "content", e.target.value)}
                        placeholder={lesson.type === "video" ? "https://..." : "Write your lesson content here..."}
                        rows={lesson.type === "video" ? 1 : 4}
                        className="w-full mt-1 px-3 py-2 text-sm border rounded-lg"
                        required
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
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
