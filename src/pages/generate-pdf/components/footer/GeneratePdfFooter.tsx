const GeneratePdfFooter = ({
  nextSectionTitle,
  activeSectionIndex,
  sectionLength,
  handleNextSection,
  handlePreviousSection,
  activeAdditionalSection,
  handleAdditionalSection,
}: {
  nextSectionTitle: string;
  activeSectionIndex: number;
  sectionLength: number;
  handleNextSection: () => void;
  handlePreviousSection: () => void;
  activeAdditionalSection: string;
  handleAdditionalSection: () => void;
}) => {
  const isFirstSection = activeSectionIndex === 0;
  const isLastSection = activeSectionIndex === sectionLength;
  const isFinishUpStep = nextSectionTitle === "Finish Up";

  const primaryButtonClass =
    "inline-flex min-h-10 w-full items-center justify-center rounded-md bg-[#3057b5] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#274a9f] focus:outline-none focus:ring-2 focus:ring-[#3057b5]/30 sm:w-auto sm:min-w-[196px]";
  const secondaryButtonClass =
    "inline-flex min-h-10 w-full items-center justify-center rounded-md border-2 border-[#3057b5] bg-white px-5 py-2.5 text-sm font-semibold text-[#3057b5] transition hover:bg-[#eef3ff] focus:outline-none focus:ring-2 focus:ring-[#3057b5]/20 sm:w-auto sm:min-w-[196px]";

  return (
    <div className="rounded-2xl bg-white p-4 shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="grid w-full grid-cols-1 gap-3 sm:flex sm:w-auto sm:justify-between sm:items-center">
        {!isFirstSection && (
          <button
            onClick={handlePreviousSection}
            className={secondaryButtonClass}
          >
            Back
          </button>
        )}

        {activeAdditionalSection !== "default" && isFinishUpStep ? (
          <button
            onClick={handleAdditionalSection}
            className={secondaryButtonClass}
          >
            Add Another Additional Section
          </button>
        ) : (
          <button
            onClick={() => {
              if (!isLastSection) handleNextSection();
            }}
            className={primaryButtonClass}
          >
            {isFinishUpStep
              ? "Finish Your Resume"
              : `Next up, ${nextSectionTitle}`}
          </button>
        )}
      </div>
    </div>
  );
};

export default GeneratePdfFooter;
