import { useMemo, useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewsFilter from "./ReviewFilter";
import HiddenCard from "./HiddenCard";
export default function ReviewsAll({
  reviews = [],
  ondelete,
  hasMore,
  loadingMore,
  onLoadMore,
}) {
  const [filters, setFilters] = useState({
    category: "All",
    recommendation: "All",
    query: "",
  });

  const categories = useMemo(
    () => Array.from(new Set(reviews.map((r) => r.category).filter(Boolean))),
    [reviews],
  );

  const filtered = useMemo(
    () =>
      reviews.filter((r) => {
        const catOk =
          filters.category === "All" || r.category === filters.category;
        const recOk =
          filters.recommendation === "All" ||
          r.recommended === filters.recommendation;
        const q = filters.query.toLowerCase();
        const txtOk =
          !q ||
          r.text?.toLowerCase().includes(q) ||
          r.subcategory?.toLowerCase().includes(q);
        return catOk && recOk && txtOk;
      }),
    [reviews, filters],
  );

  return (
    <div className="flex flex-col rounded-2xl border border-white/[0.07] bg-surface/85 backdrop-blur-xl lg:h-full lg:overflow-hidden">
      <div className="shrink-0 px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border border-purple-500/20 bg-gradient-to-br from-purple-500/20 to-cyan/20 text-[13px]">
                💬
              </div>
              <h2 className="font-display text-[15px] font-extrabold tracking-tight sm:text-white/90">
                Reviews
              </h2>
            </div>
            <p className="text-[12px] text-white/30 sm:text-[13px]">
              Real talk from real people — unfiltered (but kind)
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-lime/20 bg-lime/[0.08] px-2.5 py-1 font-display text-[11px] font-bold text-lime sm:px-3 sm:text-[12px]">
            {filtered.length} posts
          </span>
        </div>
        <ReviewsFilter
          filters={filters}
          setFilters={setFilters}
          categories={categories}
        />
        <hr className="mt-3 border-white/[0.05] sm:mt-4" />
      </div>

      <div className="px-4 py-3 sm:px-5 sm:py-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex min-h-[160px] flex-col items-center justify-center gap-2 text-white/20 lg:h-full">
            <span className="text-3xl">🫥</span>
            <p className="text-[13px]">nothing here yet. be the first.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {filtered.map((r, i) =>
              r.ishidden ? (
                <HiddenCard key={r.id} r={r} i={i} />
              ) : (
                <ReviewCard key={r.id} r={r} i={i} ondelete={ondelete} />
              ),
            )}
            {hasMore && (
              <button
                onClick={onLoadMore}
                disabled={loadingMore}
                className="mt-1 w-full rounded-xl border border-white/[0.07] py-2.5 text-[12px] text-white/30 transition-all hover:border-cyan/20 hover:text-cyan disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loadingMore ? "loading..." : "load more"}
              </button>
            )}

            {!hasMore && reviews.length > 0 && (
              <p className="mt-1 text-center text-[11px] text-white/15">
                you've seen it all ✦
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
