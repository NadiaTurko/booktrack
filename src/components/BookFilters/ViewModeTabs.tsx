import type { ComponentType } from "react";
import { LayoutGrid, Rows3, Library, List, type LucideProps } from "lucide-react";
import type { ViewMode } from "../../types";

const views: { id: ViewMode; label: string; icon: ComponentType<LucideProps> }[] = [
  { id: "books", label: "Books", icon: Library },
  { id: "cards", label: "Cards", icon: LayoutGrid },
  { id: "library", label: "Library", icon: Rows3 },
  { id: "list", label: "List", icon: List },
];

interface ViewModeTabsProps {
  view: ViewMode | string;
  setView: (value: ViewMode) => void;
}

const ViewModeTabs = ({ view, setView }: ViewModeTabsProps) => (
  <div className="min-w-0 w-full">
    <div
      role="tablist"
      aria-label="View mode"
      className="shelves-scroll flex w-full items-center gap-1 overflow-x-auto rounded-full border border-[#ddd4c6] bg-[#f5f2ea] p-1 shadow-sm"
    >
      <span className="shrink-0 px-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#5d574d] sm:px-2.5 sm:text-[11px]">
        View
      </span>
      {views.map(({ id, label, icon: Icon }) => {
        const active = view === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            title={label}
            onClick={() => setView(id)}
            className={`
              inline-flex shrink-0 items-center gap-1 rounded-full
              px-2.5 py-1.5 text-xs font-semibold transition-all duration-200
              sm:gap-1.5 sm:px-3 sm:text-[13px]
              ${
                active
                  ? "bg-[#63735e] text-white shadow-sm"
                  : "text-[#5d574d] hover:bg-white/60"
              }
            `}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  </div>
);

export default ViewModeTabs;
