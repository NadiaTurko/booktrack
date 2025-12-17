import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "../containers/page/LoginPage";
import BooksPage from "../containers/page/BooksPage";
import FavoritesPage from "../containers/page/FavoritesPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <BooksPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
