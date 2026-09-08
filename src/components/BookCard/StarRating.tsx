import { Star } from "lucide-react";

interface StarRatingProps {
  count?: number;
  className?: string;
}

const StarRating = ({ count, className = "" }: StarRatingProps) => {
  const filled = Math.min(5, Math.max(0, Math.round((count || 0) / 200) || 3));
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      aria-label={`${filled} of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < filled ? "fill-gold text-gold" : "fill-sand text-sand"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
