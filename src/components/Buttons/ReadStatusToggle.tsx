import React, { type MouseEventHandler } from "react";
import type { ShelfStatus } from "../../types";

interface ReadStatusToggleProps {
  value?: ShelfStatus;
  onToggle?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const ReadStatusToggle = ({
  value = "unread",
  onToggle,
  className = "",
}: ReadStatusToggleProps) => {
  const isRead = value === "read";

  return (
    <button
      type="button"
      onClick={onToggle}
      title="Toggle read status"
      className={`
        inline-flex items-center gap-1.5 rounded-full px-2.5 py-1
        text-[11px] font-semibold transition
        ${
          isRead
            ? "bg-sage-soft text-sage"
            : "bg-rose-soft text-burgundy"
        }
        ${className}
      `}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isRead ? "bg-sage" : "bg-burgundy"}`}
        aria-hidden="true"
      />
      {isRead ? "Finished" : "To Read"}
    </button>
  );
};

export default ReadStatusToggle;
