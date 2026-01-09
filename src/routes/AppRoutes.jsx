import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "../containers/page/LoginPage";
import BooksPage from "../containers/page/BooksPage";
import FavoritesPage from "../containers/page/FavoritesPage";
import BookDetailsPage from "../containers/page/bookDetailsPage";
import SignupPage from "../containers/page/SignupPage";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

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

      <Route
        path="/books/*"
        element={
          <ProtectedRoute>
            <BookDetailsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
