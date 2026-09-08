import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  BookOpen,
  Heart,
  CheckCircle2,
  Sparkles,
  Library,
  type LucideProps,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
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
      group flex items-center gap-2.5 rounded-2xl px-3 py-2 text-sm transition-all duration-200
      ${
        active
          ? "bg-rose-soft font-semibold text-burgundy shadow-sm"
          : "text-ink-muted hover:bg-parchment/80 hover:text-ink"
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
    <span className="flex-1 truncate">{label}</span>
    {typeof count === "number" && (
      <span className="text-xs tabular-nums text-ink-muted/80">{count}</span>
    )}
  </Link>
);

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <div className="mb-5 last:mb-0">
    <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-muted/70">
      {title}
    </p>
    <div className="space-y-0.5">{children}</div>
  </div>
);

interface LeftSidebarProps {
  stats?: LibraryStats;
}

const LeftSidebar = ({ stats = {} }: LeftSidebarProps) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const shelf = searchParams.get("shelf");
  const {
    total = 0,
    favorites = 0,
    finished = 0,
    reading = 0,
    unread = 0,
  } = stats;

  const onFavorites = pathname === "/favorites";

  return (
    <nav className="library-panel sticky top-[76px] rounded-[22px] p-4 animate-softRise">
      <Section title="Shelves">
        <NavItem
          to="/"
          icon={Library}
          label="All Books"
          count={total}
          active={pathname === "/" || pathname === ""}
        />
        <NavItem
          to="/favorites"
          icon={Heart}
          label="Favorites"
          count={favorites}
          active={onFavorites && !shelf}
        />
        <NavItem
          to="/favorites?shelf=to-read"
          icon={BookOpen}
          label="To Read"
          count={unread}
          active={onFavorites && shelf === "to-read"}
        />
        <NavItem
          to="/favorites?shelf=finished"
          icon={CheckCircle2}
          label="Finished"
          count={finished}
          active={onFavorites && shelf === "finished"}
        />
      </Section>

      <Section title="Smart Shelves">
        <NavItem
          to="/favorites?shelf=to-read"
          icon={Sparkles}
          label="Currently Reading"
          count={reading}
          active={false}
        />
      </Section>
    </nav>
  );
};

export default LeftSidebar;
