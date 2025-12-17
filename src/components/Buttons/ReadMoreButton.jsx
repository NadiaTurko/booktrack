import React from "react";

const ReadMoreButton = ({ text = "📖 Read More", onClick }) => (
  <button
    onClick={onClick}
    className="w-5/6 py-2 px-4 rounded-lg text-sm font-medium bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:shadow-md transition-colors duration-300"
  >
    {text}
  </button>
);

export default ReadMoreButton;
