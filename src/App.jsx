import { useState } from "react";
import "./App.css";
import ShowBooksButton from "./components/Buttons/ShowBooksButton";

function App() {
  const [showBooks, setShowBooks] = useState(false);

  const handleShowBooks = () => {
    setShowBooks(true);
  };

  return (
    <div className="flex flex-col items-center space-y-6 ">
      <h1 className="text-3xl font-bold text-green-800 drop-shadow-lg">
        Hello BookTrack 📚
      </h1>
      <ShowBooksButton onClick={handleShowBooks} />
    </div>
  );
}

export default App;
