import React from "react";
import { useAuthUser } from "../../hooks/useAuthUser";

const getInitial = (user) => {
  const name = user?.displayName?.trim();
  if (name) return name[0].toUpperCase();

  const email = user?.email?.trim();
  if (email) return email[0].toUpperCase();

  return "U";
};

const UserAvatar = ({ size = "md", className = "" }) => {
  const user = useAuthUser();

  const sizes = {
    sm: "w-7 h-7 text-xs sm:w-8 sm:h-8 sm:text-sm",
    md: "w-8 h-8 text-sm sm:w-9 sm:h-9 sm:text-base",
    lg: "w-10 h-10 text-base sm:w-11 sm:h-11 sm:text-lg",
  };

  if (!user) return null;

  return (
    <div
      title={user.displayName || user.email || "Signed in"}
      className={`
        ${sizes[size]}
        flex items-center justify-center
        rounded-full bg-emerald-600 text-white font-bold
        shadow-md select-none
        ${className}
      `}
    >
      {getInitial(user)}
    </div>
  );
};

export default UserAvatar;
