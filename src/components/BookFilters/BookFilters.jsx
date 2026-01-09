import React from "react";
import { Search, SortAsc } from "lucide-react";

const BookFilters = ({ search, setSearch, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative w-full sm:w-1/2">
        <div
          className="
          rounded-xl
          p-[1px]
          bg-gradient-to-b
          from-emerald-200
          via-emerald-300
          to-emerald-400
        "
        >
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              pl-10 pr-4 py-2
              rounded-[11px]
              bg-white/90
              backdrop-blur-sm
              text-gray-800
              outline-none
              transition-all duration-300
              focus:ring-2 focus:ring-emerald-400/60
            "
          />
        </div>

        <Search className="absolute left-3 top-2.5 w-5 h-5 text-emerald-400 pointer-events-none" />
      </div>

      <div className="relative w-full sm:w-1/3">
        <div
          className="
          rounded-xl
          p-[1px]
          bg-gradient-to-b
          from-emerald-200
          via-emerald-300
          to-emerald-400
        "
        >
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="
              w-full
              pl-10 pr-4 py-2
              rounded-[11px]
              bg-white/90
              backdrop-blur-sm
              text-gray-800
              outline-none
              appearance-none
              transition-all duration-300
              focus:ring-2 focus:ring-emerald-400/60
            "
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>

        <SortAsc className="absolute left-3 top-2.5 w-5 h-5 text-emerald-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default BookFilters;
