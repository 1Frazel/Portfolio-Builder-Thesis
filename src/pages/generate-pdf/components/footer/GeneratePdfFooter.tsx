const GeneratePdfFooter = ({
  children,
  nextSectionTitle,
  activeSectionIndex,
  sectionLength,
  handleNextSection,
  handlePreviousSection,
}: {
  children: React.ReactNode;
  nextSectionTitle: string;
  activeSectionIndex: number;
  sectionLength: number;
  handleNextSection: () => void;
  handlePreviousSection: () => void;
}) => {
  return (
    <div className="flex justify-between items-center shadow-md p-[16px]">
      {children}
      <div className="flex gap-[16px]">
        {activeSectionIndex !== 0 && (
          <button
            onClick={handlePreviousSection}
            disabled={activeSectionIndex === 0}
          >
            Back
          </button>
        )}
        <button
          onClick={handleNextSection}
          disabled={activeSectionIndex === sectionLength}
        >{`Next: ${nextSectionTitle}`}</button>
      </div>
    </div>
  );
};

export default GeneratePdfFooter;
