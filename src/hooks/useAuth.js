import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/");
  };

  const getUser = () => JSON.parse(localStorage.getItem("user"));

  return { login, logout, getUser };
};
