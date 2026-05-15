const PreviewNavigator = ({
  currentPage,
  pageAmount,
  setCurrentPage,
}: {
  currentPage: number;
  pageAmount: number;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
}) => {
  return (
    <div className="flex items-center justify-center gap-3 rounded-full bg-slate-900 px-4 py-2 text-white shadow-lg">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="flex h-6 w-6 items-center justify-center rounded-full text-lg leading-none text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        ‹
      </button>

      <p className="min-w-[42px] text-center text-sm font-semibold tracking-wide text-white">
        {currentPage} / {pageAmount}
      </p>

      <button
        type="button"
        disabled={currentPage === pageAmount}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="flex h-6 w-6 items-center justify-center rounded-full text-lg leading-none text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
};

export default PreviewNavigator;
