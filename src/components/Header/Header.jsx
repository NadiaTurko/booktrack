import LogoutButton from "../Buttons/LogoutButton";
import FavoritesButton from "../Buttons/FavoritesButton";
import { Link } from "react-router-dom";

const Header = ({ onLogout }) => {
  return (
    <header className="w-full bg-emerald-600 text-white py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/">
          <h1 className="text-lg font-semibold cursor-pointer hover:text-emerald-200 transition">
            📚 Books
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <FavoritesButton />
          <LogoutButton onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
