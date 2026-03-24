import {useState} from "react";
import { formatDistanceToNow } from "date-fns";
import  RemoveModel from "./RemoveModel";
const TYPE_META = {
  Good: { badge: "border-cyan/20 bg-cyan/10 text-cyan", emoji: "🔥" },
  Moderate: {
    badge: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    emoji: "😐",
  },
  Bad: {
    badge: "border-orange-400/20 bg-orange-400/10 text-orange-300",
    emoji: "💀",
  },
};
export default function ReviewCard({ r, i, ondelete }) {
  const meta = TYPE_META[r.type] ?? {
    badge: "border-white/10 bg-white/5 text-white/50",
    emoji: "📝",
  };
const [reporting, setReporting] = useState(false);
  return (
    <article
      className="animate-fadein rounded-2xl border border-white/[0.06] bg-surface2/70 p-3.5 transition-all hover:-translate-y-px hover:border-cyan/20 sm:p-4"
      style={{ animationDelay: `${i * 0.04}s` }}
    >
      <div className="mb-3 flex flex-wrap gap-1.5">
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
          {r.category}
          {r.subcategory ? ` · ${r.subcategory}` : ""}
        </span>
        <span
          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${meta.badge}`}
        >
          {meta.emoji} {r.type}
        </span>
        <span
          className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${
            r.recommended === "Yes"
              ? "border-lime/20 bg-lime/[0.07] text-lime"
              : "border-rose-500/20 bg-rose-500/[0.07] text-rose-400"
          }`}
        >
          {r.recommended === "Yes" ? "✓ rec'd" : "✗ skip it"}
        </span>
      </div>

      <p className="text-[13px] italic leading-relaxed text-white/80">
        "{r.text}"
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[11px] text-white/20">
          {r.createdAt
            ? formatDistanceToNow(new Date(r.createdAt+"+05:30"), { addSuffix: true })
            : ""}
        </span>{" "}
       <button onClick={() => setReporting(true)} className="rounded-lg border border-rose-500/20 px-2.5 py-1 text-[11px] text-rose-400/60 transition-all hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-400">
  remove
</button>
{reporting && <RemoveModel reviewId={r.id} reviewtext={r.text} onClose={() => setReporting(false)} />}

      </div>
    </article>
  );
}
