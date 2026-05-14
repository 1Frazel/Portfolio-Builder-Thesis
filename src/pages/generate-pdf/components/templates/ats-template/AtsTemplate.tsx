import Preview from "../../preview/Preview";

import GeneratePdfFooter from "../../footer/GeneratePdfFooter";
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
    activeAdditionalSection,
    handleAdditionalSection,
    docs,
  } = useAtsTemplate({ useMock: true });

  // mode: 'edit' | 'preview' — controls mobile view
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header />

      {/* Mobile mode toggle: visible only on mobile via hook */}
      {isMobile && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() => setMode("edit")}
            className={`px-4 py-2 rounded-full border ${
              mode === "edit"
                ? "bg-white text-blue-700 shadow"
                : "bg-transparent"
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setMode("preview")}
            className={`px-4 py-2 rounded-full border ${
              mode === "preview"
                ? "bg-white text-blue-700 shadow"
                : "bg-transparent"
            }`}
          >
            Preview
          </button>
        </div>
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
          // Desktop: show both editor and preview
          <>
            <div className="flex flex-col gap-4 w-full md:basis-1/2">
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

            <div className="w-full md:basis-1/2">
              <Preview docs={docs} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AtsTemplate;
