import React from "react";

const ShowMoreButton = ({ onClick, disabled, text = "Show More" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-1/5
        rounded-2xl
        p-[1.5px]             
        transition-all duration-300
        ${
          disabled
            ? "opacity-60 cursor-not-allowed"
            : `
              bg-gradient-to-b
              from-emerald-200
              via-emerald-300
              to-emerald-400
              hover:-translate-y-0.5
              active:scale-95
            `
        }
      `}
    >
      {/* Inner button */}
      <span
        className={`
          block w-full
          px-6 py-3
          rounded-[14px]
          font-semibold
          text-emerald-900
          shadow-md
          transition-all duration-300
          ${
            disabled
              ? "bg-emerald-200 shadow-inner"
              : `
                bg-gradient-to-b
                from-emerald-100
                via-emerald-200
                to-emerald-300
                hover:brightness-105
                hover:shadow-lg
              `
          }
        `}
      >
        {text}
      </span>
    </button>
  );
};

export default ShowMoreButton;
