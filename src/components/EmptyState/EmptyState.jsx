import React from "react";
import BookIcon from "../../assets/book.svg";

const EmptyState = ({ title, message, icon }) => {
  return (
    <div className="w-full flex justify-center py-20">
      {/* Gradient border */}
      <div
        className="
          max-w-md w-full
          rounded-3xl
          p-[1.5px]
          bg-gradient-to-b
          from-emerald-200
          via-emerald-300
          to-emerald-400
        "
      >
        {/* Glass card */}
        <div
          className="
            rounded-[22px]
            bg-white/85
            backdrop-blur-xl
            px-8 py-10
            text-center
            shadow-lg
          "
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <img
              src={BookIcon}
              alt="Empty state icon"
              className="w-14 h-14 opacity-80"
            />
          </div>

          <h3 className="text-xl font-bold text-emerald-800 mb-2">{title}</h3>

          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
