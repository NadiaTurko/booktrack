const LogoutButton = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="
        px-5 py-1.5
        rounded-xl
        text-lg font-medium
        text-emerald-700
        bg-white/60
        backdrop-blur-md
        transition-transform duration-300
        hover:scale-105
        active:scale-95
      "
    >
      Logout
    </button>
  );
};

export default LogoutButton;
