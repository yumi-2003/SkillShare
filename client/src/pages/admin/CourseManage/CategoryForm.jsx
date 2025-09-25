import React, { useState } from "react";
import { addNewCategory } from "../../../stores/slices/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [formData, seFormData] = useState({
    name: "",
    description: "",
  });

  //make the first letter to uppercase
  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;
    if (name === "name" && value.length === 1) {
      newValue = value.charAt(0).toUpperCase();
    }
    // Update form data state

    seFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check user is instructor
    if (user.userType !== "instructor") {
      toast.error("You must be an instructor to create a category");
      return;
    }

    try {
      await dispatch(addNewCategory(formData)).unwrap();
      toast.success("Category created successfully");
    } catch (err) {
      toast.error(err.message || "Failed to create category");
      return;
    }
    seFormData({
      name: "",
      description: "",
    });
    setShowForm(false); // close form after submit
  };
  //handle form show and hide only show when user click the button of create cateogory
  const [showForm, setShowForm] = useState(false);
  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        + Create Category
      </button>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative transform transition-all duration-300 ease-out animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={handleCancel}
            >
              <X className="" size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Create A new Category
            </h2>
            <form action="" className="flex flex-col gap-4">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Create Category
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryForm;
