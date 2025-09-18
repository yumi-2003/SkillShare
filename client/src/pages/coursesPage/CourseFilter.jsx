const CourseFilter = ({
  search,
  setSearch,
  selectedCat,
  setSelectedCat,
  categories,
  onClear,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or instructor name..."
          value={search}
          className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            selectedCat === ""
              ? "bg-blue-600 text-white"
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
              className={`px-4 py-2 rounded ${
                selectedCat === cat._id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setSelectedCat(cat._id)}
            >
              {cat.name}
            </button>
          ))
        ) : (
          <p className="text-gray-500">No Categories Found</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default CourseFilter;
