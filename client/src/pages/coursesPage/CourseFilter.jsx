const CourseFilter = ({
  search,
  setSearch,
  selectedCat,
  setSelectedCat,
  categories,
  onClear,
}) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-lg shadow mb-5 text-sm sm:text-base">
      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by title or instructor name..."
          value={search}
          className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:ring focus:ring-green-300"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          className={`px-3 py-1.5 text-xs sm:text-sm rounded ${
            selectedCat === ""
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setSelectedCat("")}
        >
          All Categories
        </button>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((cat) => (
            <button
              key={cat._id}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded ${
                selectedCat === cat._id
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setSelectedCat(cat._id)}
            >
              {cat.name}
            </button>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No Categories Found</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onClear}
          className="px-3 py-1.5 text-xs sm:text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default CourseFilter;
