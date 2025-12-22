import React from "react";

const FavoriteButton = ({ favorite, onClick }) => (
  <button
    onClick={onClick}
    className={`
      w-1/6 text-2xl relative transition-transform hover:scale-110
      ${favorite ? "text-red-500" : ""}
    `}
    title={favorite ? "Убрати з улюблених" : "Додати в улюблене"}
  >
    {favorite ? (
      "❤️"
    ) : (
      <span className="inline-block text-transparent bg-clip-text bg-linear-to-br from-gray-300 via-green-300 to-emerald-400 drop-shadow-sm">
        ❤️
      </span>
    )}
  </button>
);

export default FavoriteButton;
