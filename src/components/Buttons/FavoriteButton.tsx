import React, { type MouseEventHandler } from "react";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  favorite: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const FavoriteButton = ({ favorite, onClick }: FavoriteButtonProps) => (
  <button
    onClick={onClick}
    title={favorite ? "Remove from favorites" : "Add to favorites"}
    className="
      inline-flex h-8 w-8 items-center justify-center rounded-full
      border border-sand bg-white/90 text-burgundy
      transition hover:scale-105 hover:border-burgundy/40 active:scale-95
    "
  >
    <Heart
      className={`h-4 w-4 transition ${favorite ? "fill-burgundy text-burgundy" : "text-ink-muted"}`}
    />
  </button>
);

export default FavoriteButton;
