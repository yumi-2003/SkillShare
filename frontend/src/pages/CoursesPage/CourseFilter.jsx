const CourseFilter = ({
  search,
  setSearch,
  selectedCat,
  setSelectedCat,
  categories,
  onClear,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      {/* search input */}
      <input
        type="text"
        placeholder="Search by title, instructor or categories..."
        value={search}
        className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded bg-gray-200 text-gray-800">
          All
        </button>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((cat) => (
            <button
              key={cat._id}
              className={`px-4 py-2 rounded ${
                selectedCat === cat.name
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedCat(cat.name)}
            >
              {cat.name}
            </button>
          ))
        ) : (
          <p className="text-gray-500">No Category Found</p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default CourseFilter;
