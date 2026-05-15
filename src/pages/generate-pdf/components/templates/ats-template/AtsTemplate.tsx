import Preview from "../../preview/Preview";

import GeneratePdfFooter from "../../footer/GeneratePdfFooter";
import ProgressBar from "../../ProgressBar";
import useAtsTemplate from "../../../../../shared/hooks/useAtsTemplate";
import Header from "../../../../../shared/components/Header";
import useIsMobile from "../../../../../shared/hooks/useIsMobile";
import { useState } from "react";

const AtsTemplate = () => {
  const {
    nextComponent,
    nextSectionTitle,
    activeSectionIndex,
    sectionLength,
    handlePreviousSection,
    handleNextSection,
    setActiveSectionIndex,
    activeAdditionalSection,
    handleAdditionalSection,
    docs,
    listAtsTemplateSection,
  } = useAtsTemplate({ useMock: true });

  // mode: 'edit' | 'preview' — controls mobile view
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header />

      {/* Mobile mode toggle: visible only on mobile via hook */}
      {isMobile && (
        <div className="mx-auto mt-4 w-[min(92vw,330px)] rounded-full bg-[#2951A3] p-1 shadow-sm">
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setMode("edit")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "edit"
                  ? "bg-white text-[#2951A3] shadow"
                  : "bg-transparent text-white"
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "preview"
                  ? "bg-white text-[#2951A3] shadow"
                  : "bg-transparent text-white"
              }`}
            >
              Preview
            </button>
          </div>
        </div>
      )}

      {!isMobile && (
        <ProgressBar
          steps={listAtsTemplateSection}
          currentStepIndex={activeSectionIndex}
          onStepClick={(index) => {
            if (index >= 0 && index <= activeSectionIndex + 1) {
              setActiveSectionIndex(index);
            }
          }}
        />
      )}

      <div className="h-full w-full flex flex-col md:flex-row gap-6 md:gap-[24px] px-0 md:px-[24px] py-4">
        {isMobile ? (
          // On mobile show either editor or preview full width
          mode === "edit" ? (
            <div className="w-full">
              {nextComponent}
              <GeneratePdfFooter
                nextSectionTitle={nextSectionTitle}
                activeSectionIndex={activeSectionIndex}
                sectionLength={sectionLength}
                handlePreviousSection={handlePreviousSection}
                handleNextSection={handleNextSection}
                activeAdditionalSection={activeAdditionalSection}
                handleAdditionalSection={handleAdditionalSection}
              />
            </div>
          ) : (
            <div className="w-full">
              <Preview docs={docs} />
            </div>
          )
        ) : (
          // Desktop: show both editor and preview with equal, proportional sizing
          <>
            <div className="flex flex-col gap-4 w-full md:flex-1 md:min-w-0">
              {nextComponent}
              <GeneratePdfFooter
                nextSectionTitle={nextSectionTitle}
                activeSectionIndex={activeSectionIndex}
                sectionLength={sectionLength}
                handlePreviousSection={handlePreviousSection}
                handleNextSection={handleNextSection}
                activeAdditionalSection={activeAdditionalSection}
                handleAdditionalSection={handleAdditionalSection}
              />
            </div>

            <div className="w-full md:flex-1 md:min-w-0">
              <Preview docs={docs} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AtsTemplate;
