import React from "react";

const ReadMoreButton = ({ text = "View Details", onClick }) => (
  <button
    onClick={onClick}
    className="
      w-full
      py-2
      px-4
      rounded-md
      text-sm
      font-medium
      bg-white/90
      text-emerald-700
      border
      border-emerald-200
      hover:bg-white
      hover:text-emerald-800
      transition
      duration-200
    "
  >
    {text}
  </button>
);

export default ReadMoreButton;
