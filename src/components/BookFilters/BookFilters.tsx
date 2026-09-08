import { useState } from "react";
import { Clock3, Library } from "lucide-react";
import ShelvesStrip from "../Sidebar/ShelvesStrip";
import FilterSelect from "../ui/FilterSelect";
import ViewModeTabs from "./ViewModeTabs";
import type { LibraryStats, SortOrder, ViewMode } from "../../types";

interface BookFiltersProps {
  sortOrder: SortOrder;
  setSortOrder: (value: SortOrder) => void;
  showStatusFilter?: boolean;
  statusFilter?: string;
  setStatusFilter?: (value: string) => void;
  view?: ViewMode | string;
  setView?: (value: ViewMode) => void;
  stats?: LibraryStats;
}

const BookFilters = ({
  sortOrder,
  setSortOrder,
  showStatusFilter = false,
  statusFilter = "all",
  setStatusFilter = () => {},
  view = "cards",
  setView = () => {},
  stats = {},
}: BookFiltersProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="mb-5 space-y-3">
      <div className="library-panel overflow-visible rounded-[22px] p-3 sm:p-4">
        <div className="mb-3 px-0.5">
          <p className="font-display text-base font-semibold text-ink">
            Browse & refine
          </p>
          <p className="text-xs text-ink-muted">
            Sort the shelf{showStatusFilter ? ", then filter by status." : "."}
          </p>
        </div>

        <div
          className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${
            showStatusFilter ? "lg:grid-cols-2" : ""
          }`}
        >
          <FilterSelect
            id="sort"
            openId={openId}
            setOpenId={setOpenId}
            icon={Clock3}
            label="Sort by"
            accent="burgundy"
            value={sortOrder}
            onChange={(value) => setSortOrder(value as SortOrder)}
            options={[
              { value: "title_asc", label: "Recently added" },
              { value: "title_desc", label: "Title Z → A" },
              { value: "unread_first", label: "Unread first" },
              { value: "read_first", label: "Read first" },
              { value: "popular", label: "Most popular" },
            ]}
          />

          {showStatusFilter && (
            <FilterSelect
              id="status"
              openId={openId}
              setOpenId={setOpenId}
              icon={Library}
              label="Status"
              accent="burgundy"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: "all", label: "All statuses" },
                { value: "unread", label: "To read" },
                { value: "read", label: "Finished" },
              ]}
            />
          )}
        </div>
      </div>

      <div className="lg:hidden">
        <ShelvesStrip stats={stats} />
      </div>

      <ViewModeTabs view={view} setView={setView} />
    </div>
  );
};

export default BookFilters;
