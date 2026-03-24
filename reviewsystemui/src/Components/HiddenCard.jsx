import { useState } from "react";
import ReviewCard from "./ReviewCard";

export default function HiddenCard({ r, i }) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-[13px]">🚩</span>
          <p className="text-[11px] text-amber-300/80 leading-relaxed">
            {r.sentimentreason ?? "this review was flagged"}
          </p>
        </div>
        <button
          onClick={() => setShow((p) => !p)}
          className="ml-3 shrink-0 rounded-lg border border-amber-400/20 px-2.5 py-1 text-[10px] text-amber-300/60 transition-all hover:border-amber-400/40 hover:text-amber-300"
        >
          {show ? "hide" : "show anyway"}
        </button>
      </div>
      {show && <ReviewCard r={r} i={i} />}
    </div>
  );
}