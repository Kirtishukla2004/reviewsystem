import { useEffect, useState } from "react";
import ReviewForm from "./Components/ReviewForm";
import ReviewsAll from "./Components/ReviewsAll";
import { getReviews, fetchCategories } from "./services/Formservices";

export default function App() {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    loadReviews(1);
    loadCategories();
  }, []);

  const loadReviews = async (pageNum = 1) => {
    try {
      pageNum === 1 ? setLoading(true) : setLoadingMore(true);
      setError(null);

      const { data, hasMore } = await getReviews(pageNum, 10);

      setReviews((prev) => (pageNum === 1 ? data : [...prev, ...data]));
      setHasMore(hasMore);
      setPage(pageNum);
    } catch (err) {
      setError(err?.message || "Failed to load reviews");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadCategories = async () => {
    try {
      setCategories(await fetchCategories());
    } catch {
      setError("Failed to load categories");
    }
  };

  const loadMore = () => loadReviews(page + 1);

  return (
    <div className="min-h-screen font-body text-[#e8e8f0] lg:flex lg:h-dvh lg:flex-col lg:overflow-hidden">
      <div className="pointer-events-none fixed -left-48 -top-48 z-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,255,224,0.07)_0%,transparent_70%)]" />
      <div className="pointer-events-none fixed -bottom-44 -right-44 z-0 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,transparent_70%)]" />

      <header className="relative z-10 shrink-0 border-b border-white/5 bg-base/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 sm:px-6">
          <span className="text-[12px] font-semibold tracking-widest text-white/40 sm:text-[13px]">
            Feedback Matters
          </span>
          <h1
            className="
            font-display font-extrabold tracking-tight
            text-[13px] leading-tight
            sm:text-[15px]
            md:absolute md:left-1/2 md:-translate-x-1/2 md:whitespace-nowrap md:text-[clamp(14px,2vw,19px)]
          "
          >
            Honest Reviews. Real Experiences.
          </h1>
          <div className="hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/30 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            no cap, just facts
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-screen-xl flex flex-col gap-3 p-3 sm:p-4 sm:gap-4 md:grid md:grid-cols-[340px_1fr] lg:min-h-0 lg:flex-1 lg:grid lg:grid-cols-[340px_1fr]">
        <div className="lg:overflow-y-auto">
          <ReviewForm
            categories={categories}
            onReviewSubmitted={() => loadReviews(1)}
          />
        </div>
        <div className="min-h-0">
          {loading && (
            <div className="flex min-h-[200px] items-center justify-center lg:h-full">
              <p className="animate-pulse text-sm tracking-widest text-white/25">
                fetching the tea ☕
              </p>
            </div>
          )}
          {error && (
            <p className="mt-10 text-center text-sm text-red-400">{error}</p>
          )}
          {!loading && !error && (
            <ReviewsAll
              reviews={reviews}
              hasMore={hasMore}
              loadingMore={loadingMore}
              onLoadMore={loadMore}
            />
          )}
        </div>
      </main>
    </div>
  );
}
