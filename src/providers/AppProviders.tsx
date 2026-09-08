import React, { type ReactNode } from "react";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { BooksProvider } from "../context/BooksContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { BookJournalProvider } from "../context/BookJournalContext";
import { useAuthUser } from "../hooks/useAuthUser";

interface ProvidersWithUserProps {
  children: ReactNode;
}

const ProvidersWithUser = ({ children }: ProvidersWithUserProps) => {
  const user = useAuthUser();

  const key = user?.uid || "guest";

  return (
    <BooksProvider key={key}>
      <FavoritesProvider key={key}>
        <BookJournalProvider key={key}>{children}</BookJournalProvider>
      </FavoritesProvider>
    </BooksProvider>
  );
};

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <HashRouter>
      <AuthProvider>
        <ProvidersWithUser>{children}</ProvidersWithUser>
      </AuthProvider>
    </HashRouter>
  );
};

export default AppProviders;
