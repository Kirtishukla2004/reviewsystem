export default function ReviewsFilter({ filters, setFilters, categories }) {
  const fieldCls =
    "rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-[12px] text-[#e8e8f0] outline-none placeholder:text-white/25 focus:border-cyan/40 focus:ring-2 focus:ring-cyan/[0.06] transition-colors font-body appearance-none";

  const recBtn = (val, label) => (
    <button
      key={val}
      type="button"
      onClick={() => setFilters((f) => ({ ...f, recommendation: val }))}
      className={`rounded-full border px-2.5 py-1.5 text-[11px] font-medium transition-all sm:px-3 ${
        filters.recommendation === val
          ? "border-cyan/35 bg-cyan/10 text-cyan"
          : "border-white/[0.08] bg-transparent text-white/35 hover:text-white/60"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative w-full sm:w-auto">
        <select
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
          className={`${fieldCls} w-full pr-7 sm:w-auto`}
        >
          <option value="All">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-white/25">
          ▼
        </span>
      </div>
      <div className="flex gap-1.5">
        {recBtn("All", "All")}
        {recBtn("Yes", "✓ Rec'd")}
        {recBtn("No", "✗ Skip")}
      </div>

      <input
        placeholder="Search…"
        value={filters.query}
        onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
        className={`${fieldCls} w-full sm:ml-auto sm:w-36`}
      />
    </div>
  );
}