import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BooksProvider } from "./context/BooksContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BooksProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </BooksProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
