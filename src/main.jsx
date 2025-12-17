import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BooksProvider } from "./context/BooksContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BooksProvider>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </BooksProvider>
);
