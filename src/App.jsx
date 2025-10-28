import { useState } from "react";
import "./App.css";

import { useDispatch } from "react-redux";
import { fetchBooks } from "./features/books/booksSlice";

import ShowBooksButton from "./components/Buttons/ShowBooksButton";
import BooksList from "./components/BooksList/BooksList";

function App() {
  const dispatch = useDispatch();

  const handleShowBooks = () => {
    dispatch(fetchBooks());
  };

  return (
    <div className="flex flex-col items-center space-y-6 ">
      <h1 className="text-3xl font-bold text-green-800 drop-shadow-lg">
        Hello BookTrack 📚
      </h1>
      <ShowBooksButton onClick={handleShowBooks} />
      <BooksList />
    </div>
  );
}

export default App;
