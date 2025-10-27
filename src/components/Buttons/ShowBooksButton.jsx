import React from "react";

const ShowBooksButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-1/3 bg-green-800 text-white px-5 py-3 rounded-lg shadow-md hover:bg-green-900 transition-colors duration-300"
    >
      Show books
    </button>
  );
};

export default ShowBooksButton;
