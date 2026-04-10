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
    <div className="flex gap-[16px] justify-center">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        Previous
      </button>

      <p> {`Page ${currentPage} / ${pageAmount}`}</p>

      <button
        disabled={currentPage === pageAmount}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default PreviewNavigator;
