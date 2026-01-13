import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { BooksProvider } from "../context/BooksContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { useAuthUser } from "../hooks/useAuthUser";

const ProvidersWithUser = ({ children }) => {
  const user = useAuthUser();

  const key = user?.uid || "guest";

  return (
    <BooksProvider key={key}>
      <FavoritesProvider key={key}>{children}</FavoritesProvider>
    </BooksProvider>
  );
};

const AppProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProvidersWithUser>{children}</ProvidersWithUser>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
