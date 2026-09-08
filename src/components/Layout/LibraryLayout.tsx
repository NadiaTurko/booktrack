import type { ReactNode } from "react";
import Header from "../Header/Header";
import LeftSidebar from "../Sidebar/LeftSidebar";
import RightSidebar from "../Sidebar/RightSidebar";
import type { BookDoc, LibraryStats } from "../../types";

interface LibraryLayoutProps {
  search?: string;
  setSearch?: (value: string) => void;
  stats?: LibraryStats;
  currentlyReading?: BookDoc[];
  children: ReactNode;
}

const LibraryLayout = ({
  search,
  setSearch,
  stats,
  currentlyReading = [],
  children,
}: LibraryLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Header search={search} setSearch={setSearch} />

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 px-3 pb-10 pt-3 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-5 lg:px-5 lg:pt-4 xl:grid-cols-[240px_minmax(0,1fr)_280px]">
        <aside className="hidden lg:block">
          <LeftSidebar stats={stats} />
        </aside>

        <main className="min-w-0">{children}</main>

        <aside className="hidden xl:block">
          <RightSidebar currentlyReading={currentlyReading} />
        </aside>
      </div>
    </div>
  );
};

export default LibraryLayout;
