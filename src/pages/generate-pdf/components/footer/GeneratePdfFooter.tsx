import type React from "react";

const GeneratePdfFooter = ({
  children,
  nextSectionTitle,
  activeSectionIndex,
  sectionLength,
  handleNextSection,
  handlePreviousSection,
  activeAdditionalSection,
  handleAdditionalSection,
}: {
  children: React.ReactNode;
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
        {activeAdditionalSection !== "default" && isLastSection && (
          <button onClick={handleAdditionalSection}>
            Add another additional section
          </button>
        )}
      </div>
    </div>
  );
};

export default GeneratePdfFooter;
