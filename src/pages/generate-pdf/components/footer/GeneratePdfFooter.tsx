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
  const isFirstSection = activeSectionIndex === 0;
  const isLastSection = activeSectionIndex === sectionLength;
  return (
    <div className="flex justify-between items-center shadow-md p-[16px]">
      {children}
      <div className="flex gap-[16px]">
        {!isFirstSection && (
          <button onClick={handlePreviousSection}>Back</button>
        )}
        {!isLastSection && (
          <button
            onClick={handleNextSection}
          >{`Next: ${nextSectionTitle}`}</button>
        )}
      </div>
    </div>
  );
};

export default GeneratePdfFooter;
