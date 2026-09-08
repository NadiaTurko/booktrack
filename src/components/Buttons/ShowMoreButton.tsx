import React, { type MouseEventHandler } from "react";

interface ShowMoreButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  text?: string;
}

const ShowMoreButton = ({
  onClick,
  disabled,
  text = "Show More",
}: ShowMoreButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-full px-8 py-3 text-sm font-semibold transition
        ${
          disabled
            ? "cursor-not-allowed bg-sand text-ink-muted/60"
            : "bg-burgundy text-white shadow-sm hover:bg-burgundy-dark active:scale-[0.98]"
        }
      `}
    >
      {text}
    </button>
  );
};

export default ShowMoreButton;
