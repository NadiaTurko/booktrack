import type { User } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

/** Thin alias — prefer useAuth() when you also need logout / isAuthReady. */
export const useAuthUser = (): User | null => {
  const { user } = useAuth();
  return user;
};
