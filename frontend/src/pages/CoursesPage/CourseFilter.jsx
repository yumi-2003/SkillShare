import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../stores/slices/categorySlice";

const CourseFilter = () => {
  const [search, setSearch] = useState("");
  const { categories, status, error } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  console.log(categories);

  const handleSearch = () => {};

  const handleClear = () => {};

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      {/* search input */}
      <input
        type="text"
        placeholder="Search Courses"
        // value={search}
        className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
      />
      <div className="flex gap-2">
        {Array.isArray(categories) &&
          categories.map((category) => (
            <button
              key={category._id}
              // onClick={()=>setActiveCategory(category.id)}
              className={
                // activeCategory === category.id
                // ? "px-4 py-2 rounded-lg bg-blue-600 text-white"
                "px-4 py-2 rounded bg-gray-200 text-gray-800"
              }
            >
              {category.name}
            </button>
          ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default CourseFilter;
