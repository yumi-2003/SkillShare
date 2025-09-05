import React from "react";
import { useState } from "react";

const CourseFilter = ({ categories, onFilter }) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSearch = () => {};

  const handleClear = () => {};

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      {/* search input */}
      <input
        type="text"
        placeholder="Search Courses"
        value={search}
        className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
      />
      {/* category button */}
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
