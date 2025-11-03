import { createContext, useContext, useEffect, useState } from "react";
import { BASE_API_URL, ITEMS_PER_PAGE } from "../constants/api";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);

  const fetchBooks = async (pageNum = 1) => {
    setStatus("loading");
    const offset = (pageNum - 1) * ITEMS_PER_PAGE;
    try {
      const res = await fetch(
        `${BASE_API_URL}&limit=${ITEMS_PER_PAGE}&offset=${offset}`
      );
      const data = await res.json();
      setBooks((prev) => [...prev, ...data.docs]);
      setTotalBooks(data.numFound);
      setStatus("succeeded");
    } catch (error) {
      setStatus("failed");
    }
  };

  useEffect(() => {
    fetchBooks(1);
  }, []);

  const loadMoreBooks = () => {
    const nextPage = page + 1;
    fetchBooks(nextPage);
    setPage(nextPage);
  };

  return (
    <BooksContext.Provider value={{ books, totalBooks, status, loadMoreBooks }}>
      {children}
    </BooksContext.Provider>
  );
};
export const useBooks = () => useContext(BooksContext);
