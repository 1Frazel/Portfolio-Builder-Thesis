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
import { useTranslation } from "react-i18next";

const AtsTemplate = () => {
  const navigate = useNavigate();
  const { id: resumeId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation("creationPage");
  // Development-only toggle: set true manually when you want mock data
  const USE_MOCK_DATA = false;
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

  const isPersonalDetailComplete =
    formData.personalDetail.jobTarget.trim() !== "" &&
    formData.personalDetail.firstName.trim() !== "" &&
    formData.personalDetail.email.trim() !== "";

  const canLeavePersonalDetail = (targetIndex: number) => {
    if (activeSectionIndex !== 0 || targetIndex <= activeSectionIndex) {
      return true;
    }

    if (!isPersonalDetailComplete) {
      showToast(
        t("main.toast.personalData"),
        "error",
      );
      return false;
    }

    return true;
  };

  const handleValidatedNextSection = () => {
    if (!canLeavePersonalDetail(activeSectionIndex + 1)) {
      return;
    }

    setActiveSectionIndex((prev) => prev + 1);
  };

  const handleStepClick = (index: number) => {
    if (
      index >= 0 &&
      index <= activeSectionIndex + 1 &&
      index !== sectionLength &&
      canLeavePersonalDetail(index)
    ) {
      setActiveSectionIndex(index);
    }
  };

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
          err instanceof Error ? err.message : t("main.toast.formData");
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
  const editorAndPreviewLayout = "h-full w-full flex flex-col md:flex-row gap-6 md:gap-6 px-0 md:px-6 py-4";

  const renderFooter = () => (
    <GeneratePdfFooter
      nextSectionTitle={nextSectionTitle}
      activeSectionIndex={activeSectionIndex}
      sectionLength={sectionLength}
      handlePreviousSection={handlePreviousSection}
      handleNextSection={handleValidatedNextSection}
      activeAdditionalSection={activeAdditionalSection}
      handleAdditionalSection={handleAdditionalSection}
      docs={docs}
      formData={formData}
      setFormData={setFormData}
      template={selectedTemplate}
      resumeId={resumeId}
      initialTitle={initialResumeTitle}
    />
  );

  const mobileEditorContent = (
    <div className="w-full">
      {nextComponent}
      {renderFooter()}
    </div>
  );

  const mobilePreviewContent = (
    <div className="w-full">
      <Preview docs={docs} />
    </div>
  );

  const desktopContent = (
    <>
      <div className="flex w-full flex-col gap-4 md:min-w-0 md:flex-1">
        {nextComponent}
        {renderFooter()}
      </div>

      <div className="w-full md:min-w-0 md:flex-1">
        <Preview docs={docs} />
      </div>
    </>
  );

  let mainContent = desktopContent;
  if (isMobile) {
    mainContent = mode === "edit" ? mobileEditorContent : mobilePreviewContent;
  }

  if (isLoadingCurrentCV) {
    return <LoadingPage message={t("main.toast.fetching")} />;
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
          onStepClick={handleStepClick}
        />
      )}

      <div className={editorAndPreviewLayout}>{mainContent}</div>
    </div>
  );
};

export default AtsTemplate;
