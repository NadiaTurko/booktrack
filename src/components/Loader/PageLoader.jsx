import React from "react";
import BookIcon from "../../assets/book.svg";

const PageLoader = ({ text = "Loading..." }) => {
  return (
    <div className="w-full flex justify-center py-10 sm:py-14">
      <div className="w-full max-w-sm rounded-3xl p-[1px] bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-400">
        <div className="rounded-[22px] bg-white/85 backdrop-blur-xl px-6 py-5 shadow-lg flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/70 border border-emerald-200/60 flex items-center justify-center">
            <img src={BookIcon} alt="" className="w-5 h-5 opacity-80" />
          </div>

          <p className="text-emerald-800 font-semibold flex-1">{text}</p>

          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/55 animate-pulse [animation-delay:120ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 animate-pulse [animation-delay:240ms]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
