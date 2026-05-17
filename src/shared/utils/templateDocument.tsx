import type { JSX } from "react";
import AtsDocument from "../../pages/generate-pdf/components/templates/ats-template/AtsDocument";
import type { FormData } from "../hooks/useFormData";

type TemplateDocumentProps = {
  personalDetail: FormData["personalDetail"];
  profileSummary: FormData["profileSummary"];
  workExperiences: FormData["workExperiences"];
  educations: FormData["educations"];
  skills: FormData["skills"];
  languages: FormData["languages"];
  professionalTraining: FormData["professionalTraining"];
  licensesCertifications: FormData["licensesCertifications"];
};

type TemplateDocumentComponent = (props: TemplateDocumentProps) => JSX.Element;

const templateDocumentMap: Record<string, TemplateDocumentComponent> = {
  ats: AtsDocument,
};

export const normalizeTemplateKey = (template?: string): string =>
  (template || "ats").trim().toLowerCase();

export const getTemplateDocumentComponent = (
  template?: string,
): TemplateDocumentComponent => {
  const normalizedTemplate = normalizeTemplateKey(template);
  return templateDocumentMap[normalizedTemplate] ?? AtsDocument;
};

export const buildTemplateDocument = (
  template: string | undefined,
  formData: FormData,
): JSX.Element => {
  const SelectedDocument = getTemplateDocumentComponent(template);

  return (
    <SelectedDocument
      personalDetail={formData.personalDetail}
      profileSummary={formData.profileSummary}
      workExperiences={formData.workExperiences}
      educations={formData.educations}
      skills={formData.skills}
      languages={formData.languages}
      professionalTraining={formData.professionalTraining}
      licensesCertifications={formData.licensesCertifications}
    />
  );
};
