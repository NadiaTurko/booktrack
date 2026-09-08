import React from "react";

interface EmptyStateProps {
  title: string;
  message: string;
}

const EmptyState = ({ title, message }: EmptyStateProps) => {
  return (
    <div className="flex w-full justify-center py-16">
      <div className="library-panel w-full max-w-md rounded-[28px] px-8 py-10 text-center animate-softRise">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-soft font-display text-xl font-semibold text-burgundy">
          B
        </div>
        <h3 className="mb-2 font-display text-xl font-semibold text-ink">
          {title}
        </h3>
        <p className="leading-relaxed text-ink-muted">{message}</p>
      </div>
    </div>
  );
};

export default EmptyState;
