import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import type { ChangeEventHandler } from "react";

import LogoutButton from "../Buttons/LogoutButton";
import FavoritesButton from "../Buttons/FavoritesButton";
import UserAvatar from "../UserAvatar/UserAvatar";

interface HeaderProps {
  search?: string;
  setSearch?: (value: string) => void;
}

const Header = ({ search, setSearch }: HeaderProps) => {
  const hasSearch = typeof setSearch === "function";

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch?.(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-sand/70 bg-cream/90 backdrop-blur-xl">
      <div className="mx-auto max-w-[1600px] px-3 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <Link to="/" className="group flex min-w-0 shrink-0 items-center gap-2.5">
            <span
              className="
                flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                bg-burgundy text-sm font-bold text-white shadow-sm
                transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105
              "
            >
              B
            </span>
            <div className="hidden leading-tight min-[400px]:block">
              <p className="font-display text-lg font-semibold tracking-tight text-ink">
                BookTrack
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                Reading Library
              </p>
            </div>
          </Link>

          {hasSearch && (
            <div className="relative hidden min-w-0 flex-1 md:block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted/70" />
              <input
                type="search"
                value={search ?? ""}
                onChange={onSearchChange}
                placeholder="Search titles, authors, notes…"
                className="
                  w-full truncate rounded-full border border-sand bg-parchment/70
                  py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-ink-muted/55
                  outline-none transition focus:border-burgundy/40 focus:bg-white
                  focus:ring-2 focus:ring-burgundy/15
                "
              />
            </div>
          )}

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <FavoritesButton />
            <UserAvatar size="md" />
            <LogoutButton />
          </div>
        </div>

        {hasSearch && (
          <div className="relative mt-3 min-w-0 md:hidden">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted/70" />
            <input
              type="search"
              value={search ?? ""}
              onChange={onSearchChange}
              placeholder="Search books…"
              className="
                w-full rounded-full border border-sand bg-parchment/70
                py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted/55
                outline-none transition focus:border-burgundy/40 focus:bg-white
                focus:ring-2 focus:ring-burgundy/15
              "
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
