import React, { useState } from "react";
import {addNewCategory} from "../../../stores/slices/categorySlice";
import { useSelector,useDispatch } from "react-redux";

const CategoryForm = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [formData, seFormData] = useState({
    name: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    seFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // check user is instructor
    if (user.userType !== "instructor") {
      alert("You must be an instructor to create a category");
      return;
    }

    //send payload back to backend using axiosinstance
    dispatch(addNewCategory(formData));
    // clear form data
    seFormData({
      name: "",
      description: "",
    });
  };
  //handle form show and hide only show when user click the button of create cateogory
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleShowForm}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Create Category
      </button>
      {showForm && (
        <form
          action=""
          className="bg-white p-4 rounded-md shadow-md lg:w-1/2 flex flex-col"
        >
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
      )}
    </>
  );
};

export default CategoryForm;
