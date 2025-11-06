const LogoutButton = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="bg-white text-emerald-700 px-4 py-1 rounded-lg font-medium hover:bg-emerald-100 transition-colors duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
