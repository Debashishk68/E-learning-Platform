import { FaSearch, FaFilter } from "react-icons/fa";

const FilterBar = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex items-center border rounded-md px-2 py-1">
        <input
          type="text"
          placeholder="Search User"
          className="outline-none text-sm"
        />
        <FaSearch className="text-gray-500 ml-2" />
      </div>
      <select className="border px-3 py-1 rounded-md text-sm">
        <option>Relevance</option>
        <option>Newest</option>
        <option>Top Rated</option>
      </select>
      <button className="border px-3 py-1 rounded-md flex items-center gap-1 text-sm">
        <FaFilter />
        Filter
      </button>
    </div>
  );
};

export default FilterBar;
