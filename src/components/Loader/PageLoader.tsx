import React from "react";

interface PageLoaderProps {
  text?: string;
}

const PageLoader = ({ text = "Loading..." }: PageLoaderProps) => {
  return (
    <div className="flex w-full justify-center py-14">
      <div className="library-panel flex w-full max-w-sm items-center gap-3 rounded-[22px] px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-soft font-display font-semibold text-burgundy">
          B
        </div>
        <p className="flex-1 font-medium text-ink">{text}</p>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-burgundy/70" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-burgundy/50 [animation-delay:120ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-burgundy/35 [animation-delay:240ms]" />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
