import React, { type MouseEventHandler } from "react";

interface ReadMoreButtonProps {
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "outline" | "solid";
}

const ReadMoreButton = ({
  text = "View",
  onClick,
  variant = "outline",
}: ReadMoreButtonProps) => {
  const styles =
    variant === "solid"
      ? "bg-burgundy text-white hover:bg-burgundy-dark border-transparent"
      : "border-sand bg-white/80 text-ink-muted hover:border-burgundy/30 hover:text-burgundy";

  return (
    <button
      onClick={onClick}
      className={`
        rounded-full border px-3 py-1.5 text-xs font-semibold
        transition active:scale-[0.98] ${styles}
      `}
    >
      {text}
    </button>
  );
};

export default ReadMoreButton;
