import React from "react";

const ShowMoreButton = ({ onClick, disabled, text = "Show More" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-1/5
        px-6 py-3
        font-semibold
        rounded-2xl
        shadow-lg
        text-white
        transition-all duration-300
        transform
        ${
          disabled
            ? "bg-emerald-500 opacity-70 cursor-not-allowed shadow-inner"
            : "bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 hover:scale-105 hover:brightness-110 hover:shadow-2xl"
        }
      `}
    >
      {text}
    </button>
  );
};

export default ShowMoreButton;
