import React from "react";
import { Search, SortAsc, CheckCircle2 } from "lucide-react";

const FieldShell = ({ children, className = "" }) => (
  <div
    className={`
      rounded-xl p-[1px]
      bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400
      shadow-sm
      ${className}
    `}
  >
    <div className="relative rounded-[10px] bg-white/100 backdrop-blur-sm">
      {children}
    </div>
  </div>
);

const inputBase =
  "w-full bg-transparent text-sm font-medium text-emerald-900 " +
  "focus:outline-none focus:ring-2 focus:ring-emerald-300/60 transition";

const BookFilters = ({
  search,
  setSearch,
  sortOrder,
  setSortOrder,
  showStatusFilter = false,
  statusFilter = "all",
  setStatusFilter = () => {},
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search */}
      <div className="w-full sm:w-1/2">
        <FieldShell>
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600/80" />
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${inputBase} pl-10 pr-4 py-2 rounded-[10px]`}
          />
        </FieldShell>
      </div>

      {/* Sort */}
      <div className="w-full sm:w-1/3">
        <FieldShell>
          <SortAsc className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600/80" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={`${inputBase} appearance-none pl-10 pr-9 py-2 rounded-[10px]`}
          >
            <option value="title_asc">Title A → Z</option>
            <option value="title_desc">Title Z → A</option>
            <option value="unread_first">Unread first</option>
            <option value="read_first">Read first</option>
            <option value="popular">Most popular</option>
          </select>

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600/80 text-xs">
            ▾
          </span>
        </FieldShell>
      </div>

      {/* Status */}
      {showStatusFilter && (
        <div className="w-full sm:w-1/4">
          <FieldShell>
            <CheckCircle2 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600/80" />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`${inputBase} appearance-none pl-10 pr-9 py-2 rounded-[10px]`}
            >
              <option value="all">All books</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600/80 text-xs">
              ▾
            </span>
          </FieldShell>
        </div>
      )}
    </div>
  );
};

export default BookFilters;
