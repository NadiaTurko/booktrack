import React from "react";

const FavoriteButton = ({ favorite, onClick }) => (
  <button
    onClick={onClick}
    title={favorite ? "Remove from favorites" : "Add to favorites"}
    className="
      text-2xl
      transition-transform duration-300
      hover:scale-110
      active:scale-95
    "
  >
    <span
      className={`
        inline-block
        transition-all duration-300 ease-out
        ${
          favorite
            ? `
              text-red-500
              scale-110
              drop-shadow-sm
            `
            : `
              text-transparent
              bg-clip-text
              bg-linear-to-br
              from-emerald-400
              via-emerald-500
              to-emerald-600
              drop-shadow-sm
            `
        }
      `}
    >
      ❤️
    </span>
  </button>
);

export default FavoriteButton;
