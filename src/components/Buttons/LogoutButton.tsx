import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface LogoutButtonProps {
  className?: string;
}

const LogoutButton = ({ className = "" }: LogoutButtonProps) => {
  const { logout } = useAuth();

  return (
    <button
      type="button"
      onClick={() => {
        void logout();
      }}
      title="Logout"
      className={`
        inline-flex h-9 items-center justify-center gap-1.5
        rounded-full border border-sand bg-white/80
        px-2.5 text-sm font-medium text-ink-muted
        transition hover:border-burgundy/30 hover:text-ink
        active:scale-[0.98] sm:px-3.5
        ${className}
      `}
    >
      <LogOut className="h-4 w-4 sm:hidden" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
};

export default LogoutButton;
