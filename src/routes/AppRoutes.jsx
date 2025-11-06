import React from "react";

import { Routes, Route } from "react-router-dom";
import LoginPage from "../containers/page/LoginPage";
import BooksPage from "../containers/page/BooksPage";
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
    </Routes>
  );
};

export default AppRoutes;
