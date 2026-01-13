import React from "react";
import { HashRouter } from "react-router-dom";
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
    <HashRouter>
      <AuthProvider>
        <ProvidersWithUser>{children}</ProvidersWithUser>
      </AuthProvider>
    </HashRouter>
  );
};

export default AppProviders;
