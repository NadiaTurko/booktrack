import React from "react";
import type { User } from "firebase/auth";
import { useAuthUser } from "../../hooks/useAuthUser";

const getInitial = (user: User | null): string => {
  const name = user?.displayName?.trim();
  if (name) return name[0].toUpperCase();

  const email = user?.email?.trim();
  if (email) return email[0].toUpperCase();

  return "U";
};

type AvatarSize = "sm" | "md" | "lg";

interface UserAvatarProps {
  size?: AvatarSize;
  className?: string;
}

const UserAvatar = ({ size = "md", className = "" }: UserAvatarProps) => {
  const user = useAuthUser();

  const sizes: Record<AvatarSize, string> = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-11 h-11 text-base",
  };

  if (!user) return null;

  return (
    <div
      title={user.displayName || user.email || "Signed in"}
      className={`
        ${sizes[size]}
        flex select-none items-center justify-center
        rounded-full bg-burgundy font-bold text-white shadow-sm
        ${className}
      `}
    >
      {getInitial(user)}
    </div>
  );
};

export default UserAvatar;
