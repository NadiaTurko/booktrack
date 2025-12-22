import React from "react";
import { Search, SortAsc } from "lucide-react";

const BookFilters = ({ search, setSearch, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative w-full sm:w-1/2">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 shadow-sm"
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
      </div>

      <div className="relative w-full sm:w-1/3">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 shadow-sm bg-white"
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
          <option value="popular">Most popular</option>
        </select>
        <SortAsc className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

export default BookFilters;
