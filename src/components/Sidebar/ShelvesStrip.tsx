import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  BookOpen,
  Heart,
  CheckCircle2,
  Sparkles,
  Library,
  ChevronRight,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import type { LibraryStats } from "../../types";

interface NavItemProps {
  to: string;
  icon: ComponentType<LucideProps>;
  label: string;
  count?: number;
  active: boolean;
}

const NavItem = ({ to, icon: Icon, label, count, active }: NavItemProps) => (
  <Link
    to={to}
    className={`
      group flex shrink-0 items-center gap-2 rounded-2xl px-3 py-2 text-sm transition-all duration-200
      ${
        active
          ? "bg-rose-soft font-semibold text-burgundy shadow-sm"
          : "bg-white/50 text-ink-muted hover:bg-parchment/90 hover:text-ink"
      }
    `}
  >
    <span
      className={`
        flex h-5 w-5 items-center justify-center rounded-full
        ${active ? "bg-burgundy text-white" : "bg-sand/80 text-ink-muted group-hover:bg-sand"}
      `}
    >
      <Icon className="h-3 w-3" strokeWidth={2.5} />
    </span>
    <span className="whitespace-nowrap">{label}</span>
    {typeof count === "number" && (
      <span className="text-xs tabular-nums text-ink-muted/80">{count}</span>
    )}
  </Link>
);

interface ShelvesStripProps {
  stats?: LibraryStats;
}

const ShelvesStrip = ({ stats = {} }: ShelvesStripProps) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const shelf = searchParams.get("shelf");
  const {
    total = 0,
    favorites = 0,
    finished = 0,
    unread = 0,
  } = stats;

  const onFavorites = pathname === "/favorites";

  const items: NavItemProps[] = [
    {
      to: "/",
      icon: Library,
      label: "All Books",
      count: total,
      active: pathname === "/" || pathname === "",
    },
    {
      to: "/favorites",
      icon: Heart,
      label: "Favorites",
      count: favorites,
      active: onFavorites && !shelf,
    },
    {
      to: "/favorites?shelf=to-read",
      icon: BookOpen,
      label: "To Read",
      count: unread,
      active: onFavorites && shelf === "to-read",
    },
    {
      to: "/favorites?shelf=finished",
      icon: CheckCircle2,
      label: "Finished",
      count: finished,
      active: onFavorites && shelf === "finished",
    },
    {
      to: "/favorites",
      icon: Sparkles,
      label: "Recent Favs",
      count: favorites,
      active: false,
    },
  ];

  return (
    <div className="rounded-2xl border border-sand/70 bg-white/80 p-2.5 shadow-sm backdrop-blur-sm">
      <div className="mb-1.5 flex items-center justify-between px-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-muted/70">
          Shelves
        </p>
        <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-ink-muted/80">
          swipe
          <ChevronRight className="h-3 w-3" />
        </span>
      </div>

      <div className="relative">
        <div className="shelves-scroll flex gap-1.5 overflow-x-auto pb-2">
          {items.map((item) => (
            <NavItem key={`${item.label}-${item.to}`} {...item} />
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white/95 to-transparent"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ShelvesStrip;
