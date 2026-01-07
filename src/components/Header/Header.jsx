import LogoutButton from "../Buttons/LogoutButton";
import FavoritesButton from "../Buttons/FavoritesButton";
import { Link, useLocation } from "react-router-dom";

import BookIcon from "../../assets/book.svg";

const Header = ({ onLogout }) => {
  const location = useLocation();
  const isFavorites = location.pathname === "/favorites";

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Background layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 via-emerald-50 to-emerald-100 backdrop-blur-xl border-b border-emerald-200/60" />

      <div className="relative container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <img
              src={BookIcon}
              alt="BookTrack logo"
              className="
    w-8 h-8
    transition-transform duration-300
    group-hover:rotate-6
    group-hover:scale-110
  "
            />

            <div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                BookTrack
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5 hidden sm:block">
                Track • Save • Discover
              </p>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <FavoritesButton
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all
                ${
                  isFavorites
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white/80 text-gray-800 border border-gray-200 hover:bg-white shadow-sm"
                }`}
            />

            <LogoutButton
              onLogout={onLogout}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-white
                         bg-emerald-600 shadow-md
                         hover:bg-emerald-700 active:scale-95 transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
