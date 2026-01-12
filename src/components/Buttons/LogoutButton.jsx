const LogoutButton = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="
        px-3 py-1
        text-sm
        sm:px-4 sm:py-1.5 sm:text-base
        md:px-5 md:text-lg
        rounded-xl
        font-medium
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
