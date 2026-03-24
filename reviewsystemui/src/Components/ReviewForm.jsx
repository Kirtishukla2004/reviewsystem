import { useEffect, useState } from "react";
import {UpdateReview} from "../services/Formservices"

const TYPES = ["Good", "Moderate", "Bad"];

const typeStyle = {
  Good: {
    pill: "border-cyan/25 bg-cyan/10 text-cyan",
    active: "border-cyan/50 bg-cyan/15",
  },
  Moderate: {
    pill: "border-amber-400/25 bg-amber-400/10 text-amber-300",
    active: "border-amber-400/50 bg-amber-400/15",
  },
  Bad: {
    pill: "border-orange-400/25 bg-orange-400/10 text-orange-300",
    active: "border-orange-400/50 bg-orange-400/15",
  },
};

const EMOJI = { Good: "🔥", Moderate: "😐", Bad: "💀" };

const fieldCls =
  "w-full rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-2.5 text-[13px] text-[#e8e8f0] outline-none placeholder:text-white/25 focus:border-cyan/40 focus:ring-2 focus:ring-cyan/[0.06] transition-colors font-body appearance-none";

export default function ReviewForm({ categories, onReviewSubmitted }) {
  const [form, setForm] = useState({
    categoryid: "",
    subcategory: "",
    reviewtype: TYPES[0],
    reviewtext: "",
    recommended: "Yes",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error,setError]=useState("")
 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("") 
  try {
    setSubmitting(true);
    await UpdateReview(form);
    onReviewSubmitted();
  } catch (error) {
    if (error.message === "rate_limited") {
      setError("you've dropped 4 reviews today come back after 24 hours")
    } else {
      setError("something broke 😭 try again?")
    }
  } finally {
    setSubmitting(false);
    setForm({
      categoryid: "",
      subcategory: "",
      reviewtype: TYPES[0],
      reviewtext: "",
      recommended: "Yes",
    });
  }
};


  return (
    <div className="animate-fadein rounded-2xl border border-white/[0.07] bg-surface/85 p-4 backdrop-blur-xl sm:p-5 lg:h-full">
      <div className="mb-4 sm:mb-5">
        <div className="mb-1.5 flex items-center gap-2">
          <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border border-cyan/20 bg-gradient-to-b from-cyan/20 to-purple-500/20 text-[11px]">
            ✍️
          </div>
          <h2 className="font-display text-[15px] font-extrabold tracking-tight sm:text-white/90]">
            Drop a Review
          </h2>
        </div>
        <p className="text-[12px] leading-relaxed text-white/35">
          Keep it real. Keep it respectful. Your voice matters, fr.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <select
            value={form.categoryid}
            onChange={(e) => setForm({ ...form, categoryid: e.target.value })}
            className={fieldCls}
            required
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option  value={c.id}>
                {c.category}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-white/25">
            ▼
          </span>
        </div>

        <input
          type="text"
          placeholder="Subcategory — e.g. Chole Bhature, India Gate…"
          value={form.subcategory}
          onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
          className={fieldCls}
        />

        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.08em] text-white/30">
            Rating
          </p>
          <div className="flex flex-wrap gap-1.5">
            {TYPES.map((t) => {
              const s = typeStyle[t];
              const active = form.reviewtype === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, reviewtype: t })}
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-all sm:px-3.5 sm:text-[12px] ${
                    active
                      ? `${s.pill} ${s.active}`
                      : "border-white/10 bg-transparent text-white/40"
                  }`}
                >
                  {EMOJI[t]} {t}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.08em] text-white/30">
            Recommend it?
          </p>
          <div className="flex gap-2">
            {["Yes", "No"].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setForm({ ...form, recommended: v })}
                className={`rounded-full border px-4 py-1.5 text-[12px] font-medium transition-all ${
                  form.recommended === v
                    ? v === "Yes"
                      ? "border-lime/40 bg-lime/10 text-lime"
                      : "border-rose-500/35 bg-rose-500/10 text-rose-400"
                    : "border-white/10 bg-transparent text-white/40"
                }`}
              >
                {v === "Yes" ? "✓ Yeah" : "✗ Nah"}
              </button>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Say what you actually felt. No filter needed — just be kind about it."
          value={form.reviewtext}
          onChange={(e) => setForm({ ...form, reviewtext: e.target.value })}
          rows={4}
          className={`${fieldCls} resize-none leading-relaxed`}
          required
        />

        <button
          type="submit"
          disabled={submitting}
          className={`mt-1 w-full rounded-xl py-3 font-display text-[14px] font-extrabold tracking-wide  ${
            submitting
              ? "cursor-not-allowed bg-white/5 text-white/25"
              : " bg-gradient-to-r from-cyan to-purple-500 text-base hover:opacity-90 active:scale-[0.98]"
          }`}
        >
          {submitting ? "posting…" : "Post Review →"}
         
        </button>
        <span className="text-red-700"> {error}</span>
      </form>
    </div>
  );
}
