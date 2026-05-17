import Preview from "../../preview/Preview";

import GeneratePdfFooter from "../../footer/GeneratePdfFooter";
import ProgressBar from "../../ProgressBar";
import useAtsTemplate from "../../../../../shared/hooks/useAtsTemplate";
import Header from "../../../../../shared/components/Header";
import LoadingPage from "../../../../../shared/components/LoadingPage";
import useIsMobile from "../../../../../shared/hooks/useIsMobile";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useToast } from "../../../../../shared/hooks/useToast";
import { getCV } from "../../../../../shared/utils/cvService";

const AtsTemplate = () => {
  const navigate = useNavigate();
  const { id: resumeId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  // Development-only toggle: set true manually when you want mock data
  const USE_MOCK_DATA = true;
  const { showToast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState(
    searchParams.get("template") || "ats",
  );

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
    formData,
    setFormData,
  } = useAtsTemplate({ useMock: USE_MOCK_DATA, template: selectedTemplate });

  const [initialResumeTitle, setInitialResumeTitle] = useState("");
  const [isLoadingCurrentCV, setIsLoadingCurrentCV] = useState(
    Boolean(resumeId),
  );

  useEffect(() => {
    const loadExistingCV = async () => {
      if (!resumeId) {
        setIsLoadingCurrentCV(false);
        return;
      }

      setIsLoadingCurrentCV(true);

      try {
        const cv = await getCV(resumeId);
        setFormData(cv.data);
        setInitialResumeTitle(cv.title);
        setSelectedTemplate(cv.template || "ats");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load resume";
        showToast(message, "error");
        navigate("/creation");
      } finally {
        setIsLoadingCurrentCV(false);
      }
    };

    loadExistingCV();
  }, [navigate, resumeId, setFormData, showToast]);

  // mode: 'edit' | 'preview' — controls mobile view
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const isMobile = useIsMobile();

  if (isLoadingCurrentCV) {
    return <LoadingPage message="Fetching current CV data..." />;
  }

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
            if (
              index >= 0 &&
              index <= activeSectionIndex + 1 &&
              index !== sectionLength
            ) {
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
                docs={docs}
                formData={formData}
                template={selectedTemplate}
                resumeId={resumeId}
                initialTitle={initialResumeTitle}
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
                docs={docs}
                formData={formData}
                template={selectedTemplate}
                resumeId={resumeId}
                initialTitle={initialResumeTitle}
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
