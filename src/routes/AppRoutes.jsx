import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import LoginPage from "../containers/page/LoginPage";
import BooksPage from "../containers/page/BooksPage";
import FavoritesPage from "../containers/page/FavoritesPage";
import BookDetailsPage from "../containers/page/bookDetailsPage";
import SignupPage from "../containers/page/SignupPage";

import ProtectedRoute from "./ProtectedRoute";
import { logoutUser } from "../services/auth"; // ✅ перевір шлях

const AppRoutes = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <BooksPage onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoritesPage onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/books/*"
        element={
          <ProtectedRoute>
            <BookDetailsPage onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
