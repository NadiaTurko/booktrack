import LogoutButton from "../Buttons/LogoutButton";
import FavoritesButton from "../Buttons/FavoritesButton";
import { Link } from "react-router-dom";

const Header = ({ onLogout }) => {
  return (
    <header className="w-full bg-linear-to-r from-emerald-600 to-emerald-700 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/">
          <h1 className="text-2xl font-bold tracking-wide cursor-pointer hover:text-emerald-200 transition-colors duration-200">
            📚 BookTrack
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          <FavoritesButton />
          <LogoutButton onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
