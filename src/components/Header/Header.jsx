import LogoutButton from "../Buttons/LogoutButton";

const Header = ({ onLogout }) => {
  return (
    <header className="w-full bg-emerald-600 text-white py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-lg font-semibold cursor-pointer hover:text-emerald-200 transition">
          📚 Books
        </h1>
        <LogoutButton onLogout={onLogout} />
      </div>
    </header>
  );
};

export default Header;
