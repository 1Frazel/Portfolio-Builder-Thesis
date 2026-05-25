import type { Dispatch, ReactElement, SetStateAction } from "react";
import PdfDownloadBtn from "../button/PdfDownloadBtn";
import type { FormData } from "../../../../shared/hooks/useFormData";

import { useTranslation } from "react-i18next";

const GeneratePdfFooter = ({
  nextSectionTitle,
  activeSectionIndex,
  sectionLength,
  handleNextSection,
  handlePreviousSection,
  activeAdditionalSection,
  handleAdditionalSection,
  docs,
  formData,
  setFormData,
  template,
  resumeId,
  initialTitle,
}: {
  nextSectionTitle: string;
  activeSectionIndex: number;
  sectionLength: number;
  handleNextSection: () => void;
  handlePreviousSection: () => void;
  activeAdditionalSection: string;
  handleAdditionalSection: () => void;
  docs?: ReactElement;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  template: string;
  resumeId?: string;
  initialTitle?: string;
}) => {
  const { t } = useTranslation("creationPage");
  const isFirstSection = activeSectionIndex === 0;
  const isLastSection = activeSectionIndex === sectionLength;
  const isProfessionalPersonalStep = template === "professional" && isFirstSection;

  const sidebarAccentColors = [
    { label: "The Great Runaway", value: "#1BAC4B" },
    { label: "Blue Comet", value: "#333185" },
    { label: "Petal Shamrock", value: "#7F55B1" },
    { label: "Coral Meteor", value: "#D25353" },
    { label: "Morning Eclipse", value: "#E9B63B" },
    { label: "Breeze Horizon", value: "#B87C4C" },
  ];

  const selectedAccentColor =
    formData.personalDetail.accentColor || sidebarAccentColors[0].value;
  const submittedResumeName =
    `${formData.personalDetail.firstName} ${formData.personalDetail.lastName}`.trim() ||
    initialTitle ||
    "resume";

  const updateAccentColor = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      personalDetail: {
        ...prev.personalDetail,
        accentColor: value,
      },
    }));
  };

  const primaryButtonClass =
    "inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#3057b5] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#274a9f] focus:outline-none focus:ring-2 focus:ring-[#3057b5]/30 sm:w-auto sm:min-w-[196px]";
  const secondaryButtonClass =
    "inline-flex min-h-10 w-full items-center justify-center rounded-md border-2 border-[#3057b5] bg-white px-5 py-2.5 text-sm font-semibold text-[#3057b5] transition hover:bg-[#eef3ff] focus:outline-none focus:ring-2 focus:ring-[#3057b5]/20 sm:w-auto sm:min-w-[196px]";

  const isDefaultAdditionalSection = activeAdditionalSection === "default";

  let primaryAction = (
    <button
      onClick={() => {
        if (!isLastSection) handleNextSection();
      }}
      className={primaryButtonClass}
    >
      {nextSectionTitle}
    </button>
  );

  if (!isDefaultAdditionalSection) {
    primaryAction = (
      <button onClick={handleAdditionalSection} className={secondaryButtonClass}>
        {t(
          "additionalSectionLanguages.addAnotherSectionButton",
          "Add Another Additional Section",
        )}
      </button>
    );
  } else if (isLastSection && docs) {
    primaryAction = (
      <PdfDownloadBtn
        filename={`${submittedResumeName} CV.pdf`}
        docs={docs}
        formData={formData}
        template={template}
        resumeId={resumeId}
        initialTitle={initialTitle}
      />
    );
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-md">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-wrap gap-3 sm:w-auto">
          {!isFirstSection && (
            <button
              onClick={handlePreviousSection}
              className={secondaryButtonClass}
            >
              {t("general.back", "Back")}
            </button>
          )}
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-1 sm:flex-row sm:items-center">
          {isProfessionalPersonalStep && (
            <div className="flex flex-col gap-2 sm:items-start">
              <span className="text-xs font-semibold text-slate-500">
                {t("templateSelection.template.professional.sidebarColor", "Sidebar color")}
              </span>
              <div className="flex flex-wrap gap-2">
                {sidebarAccentColors.map((color) => {
                  const isSelected = color.value === selectedAccentColor;

                  return (
                    <button
                      key={color.value}
                      type="button"
                      title={color.label}
                      aria-label={color.label}
                      aria-pressed={isSelected}
                      onClick={() => updateAccentColor(color.value)}
                      className={`h-8 w-8 rounded-full border-2 transition focus:outline-none focus:ring-2 focus:ring-[#3057b5]/20 ${
                        isSelected
                          ? "border-[#3057b5] shadow-md shadow-[#3057b5]/20"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.value }}
                    />
                  );
                })}
              </div>
            </div>
          )}
          <div className="sm:ml-auto">{primaryAction}</div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePdfFooter;
