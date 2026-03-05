import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../../stores/slices/courseSlice";
import { getAllCategories } from "../../../stores/slices/categorySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateCoursePage = () => {
  //get redux data user, and category
  const user = useSelector((state) => state.user.user);
  const { categories } = useSelector((state) => state.category);
  const { status, error } = useSelector((state) => state.course);
  const firstRender = useRef(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get all categories on page load or mount
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  //local states
  const [preview, setPreview] = useState(""); // stores preview url of the uploaded image
  // form state, store everything from the form
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    totalLessons: "",
    duration: "",
    category: "",
    image: null,
    lessons: [],
  });

  const handleAddLesson = () => {
    setFormData({
      ...formData,
      lessons: [...formData.lessons, { title: "", content: "", type: "video" }],
    });
  };

  const handleRemoveLesson = (index) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons.splice(index, 1);
    setFormData({ ...formData, lessons: updatedLessons });
  };

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons[index][field] = value;
    setFormData({ ...formData, lessons: updatedLessons });
  };

  // handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user?._id) return;

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.image
    ) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("duration", formData.duration ? String(formData.duration) : "");
    data.append(
      "totalLessons",
      formData.totalLessons ? Number(formData.totalLessons) : ""
    );
    data.append("userId", user._id);
    if (formData.image) {
      data.append("image", formData.image);
    }
    data.append("lessons", JSON.stringify(formData.lessons));

    // Automatically set totalLessons based on the lessons array
    data.append("totalLessons", formData.lessons.length);

    dispatch(createCourse(data));
  };

  // watch status for toast notifications
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // skip first run
      return;
    }
    if (status === "loading") {
      toast.info("Creating course...", { autoClose: 1000 });
    }
    if (status === "succeeded") {
      toast.success("Course created successfully!", { autoClose: 2000 });
      navigate("/instructor-dashboard");

      // reset form after success
      setFormData({
        title: "",
        description: "",
        totalLessons: "",
        duration: "",
        category: "",
        image: null,
      });
      setPreview("");
    }
    if (status === "failed") {
      toast.error(error || "Something went wrong!", { autoClose: 3000 });
    }
  }, [status, error, navigate]);

  // preview image
  useEffect(() => {
    if (formData.image) {
      const objectUrl = URL.createObjectURL(formData.image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [formData.image]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Create a new Course
        </h2>
        <form
          action="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <label className="block font-medium mb-2">Title:</label>
          <input
            name="title"
            type="text"
            placeholder="Course title"
            onChange={handleChange}
            value={formData.title}
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-200"
          />

          <label className="block font-medium mb-2">Category:</label>
          <select
            name="category"
            value={formData.category}
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

          <label className="block font-medium mb-2">Description:</label>
          <textarea
            name="description"
            onChange={handleChange}
            rows="4"
            value={formData.description}
            className="w-full border rounded-lg px-4 py-2"
          ></textarea>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">Total Lessons</label>
              <input
                type="number"
                name="totalLessons"
                value={formData.totalLessons}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Total Lessons"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 8 hours"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-medium">Course Image:</label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5.978 5.978 0 0112 6c1.657 0 3.156.672 4.243 1.757A4 4 0 1119 16H7z"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG (Max 5MB)</p>
                </div>
                <input
                  type="file"
                  id="dropzone-file"
                  name="image"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg shadow-md mt-3"
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

            {formData.lessons.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">No lessons added yet.</p>
            ) : (
              <div className="space-y-4">
                {formData.lessons.map((lesson, index) => (
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
            className="px-6 py-3 bg-blue-500 w-full rounded-lg hover:bg-blue-700 transition text-white"
          >
            Create Course
          </button>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default CreateCoursePage;
