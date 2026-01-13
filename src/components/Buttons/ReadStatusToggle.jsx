import React from "react";

const ReadStatusToggle = ({
  value = "unread", // "read" | "unread"
  onToggle,
  className = "",
}) => {
  const isRead = value === "read";

  return (
    <button
      type="button"
      onClick={onToggle}
      title="Toggle read status"
      className={`
        inline-flex
        rounded-xl
        p-[1px]
        bg-gradient-to-b
        from-emerald-200
        via-emerald-300
        to-emerald-400
        shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5
        active:scale-95
        ${className}
      `}
    >
      <span
        className={`
          inline-flex items-center gap-2
          px-3 py-1.5
          rounded-[10px]
          text-xs font-semibold
          border border-white/60
          backdrop-blur-sm
          transition-all duration-200
          ${
            isRead
              ? "bg-white/90 text-emerald-900"
              : "bg-white/75 text-emerald-800"
          }
        `}
      >
        {/* status dot */}
        <span
          className={`
            inline-flex h-4 w-4 items-center justify-center
            rounded-full
            border border-emerald-200/70
            bg-white/80
            text-[10px]
            transition-opacity duration-200
            ${isRead ? "opacity-100" : "opacity-70"}
          `}
          aria-hidden="true"
        >
          {isRead ? "✓" : "•"}
        </span>

        <span className="leading-none">{isRead ? "Read" : "Unread"}</span>
      </span>
    </button>
  );
};

export default ReadStatusToggle;
