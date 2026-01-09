import React from "react";

const ReadMoreButton = ({ text = "View Details", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        rounded-xl
        p-[1px]                  
        bg-gradient-to-b
        from-emerald-200
        via-emerald-300
        to-emerald-400
        transition-all duration-300
        hover:-translate-y-0.5
        active:scale-95
      "
    >
      <span
        className="
          block w-full
          px-4 py-2
          rounded-[10px]
          text-sm font-medium
          text-emerald-700
          bg-white/90
          backdrop-blur-sm
          shadow-sm
          transition-all duration-300
          hover:bg-white
          hover:text-emerald-800
        "
      >
        {text}
      </span>
    </button>
  );
};

export default ReadMoreButton;
