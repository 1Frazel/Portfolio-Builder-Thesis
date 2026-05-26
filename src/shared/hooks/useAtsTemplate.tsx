import { useState } from "react";
import { useTranslation } from "react-i18next";

import Languages from "../../pages/generate-pdf/components/input/Languages";
import LicensesCertifications from "../../pages/generate-pdf/components/input/LicencesCertifications";
import ProfessionalTraining from "../../pages/generate-pdf/components/input/ProfessionalTraining";
import CustomAdditionalSection from "../../pages/generate-pdf/components/input/CustomAdditionalSection";
import PersonalDetail from "../../pages/generate-pdf/components/input/PersonalDetails";
import WorkExperiences from "../../pages/generate-pdf/components/input/WorkExperiences";
import Education from "../../pages/generate-pdf/components/input/Education";
import Skills from "../../pages/generate-pdf/components/input/Skills";
import ProfileSummary from "../../pages/generate-pdf/components/input/ProfileSummary";
import AdditionalSections from "../../pages/generate-pdf/components/input/AdditionalSections";
import { DEFAULT_CUSTOM_SECTION } from "../../pages/generate-pdf/const/generatePdfConst";
import { useFormData } from "./useFormData";
import FinishUp from "../../pages/generate-pdf/components/input/FinishUp";
import { buildTemplateDocument } from "../utils/templateDocument";

const useAtsTemplate = ({
  useMock,
  template,
}: {
  useMock: boolean;
  template: string;
}) => {
  const { t } = useTranslation("creationPage");
  const {
    formData,
    setFormData,
    setLanguages,
    setWorkExperiences,
    setEducations,
    setSkills,
    setProfileSummary,
    setPersonalDetail,
    setAdditionalSections,
    setCustomSections,
    setProfessionalTraining,
    setLicensesCertifications,
  } = useFormData({ useMock });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeAdditionalSection, setActiveAdditionalSection] =
    useState("default");

  const customAdditionalSections = formData.customSections ?? [DEFAULT_CUSTOM_SECTION];

  const listAdditionalSections = [
    {
      id: "language",
      title: t("additionalSections.labels.language"),
      component: (
        <Languages languages={formData.languages} setLanguages={setLanguages} />
      ),
    },
    {
      id: "licensesOrCertifications",
      title: t("additionalSections.labels.licensesCertifications"),
      component: (
        <LicensesCertifications
          licensesCertifications={formData.licensesCertifications}
          setLicensesCertifications={setLicensesCertifications}
        />
      ),
    },
    {
      id: "professionalTraining",
      title: t("additionalSections.labels.professionalTraining"),
      component: (
        <ProfessionalTraining
          professionalTraining={formData.professionalTraining}
          setProfessionalTraining={setProfessionalTraining}
        />
      ),
    },
    {
      id: "custom",
      title: t("additionalSections.labels.custom", "Custom Section"),
      component: (
        <CustomAdditionalSection sections={customAdditionalSections} setSections={setCustomSections} />
      ),
    },
  ];

  const listAtsTemplateSection = [
    {
      id: "personalDetail",
      title: t("personalInfo.title"),
      nextButton: t("personalInfo.nextButton"),
      component: (
        <PersonalDetail
          personalDetail={formData.personalDetail}
          setPersonalDetail={setPersonalDetail}
          template={template}
        />
      ),
    },
    {
      id: "workExperiences",
      title: t("workExperience.title"),
      nextButton: t("workExperience.nextButton"),
      component: (
        <WorkExperiences
          workExperiences={formData.workExperiences}
          setWorkExperience={setWorkExperiences}
        />
      ),
    },
    {
      id: "education",
      title: t("education.title"),
      nextButton: t("education.nextButton"),
      component: (
        <Education
          educations={formData.educations}
          setEducations={setEducations}
        />
      ),
    },
    {
      id: "skills",
      title: t("skills.title"),
      nextButton: t("skills.nextButton"),
      component: <Skills skills={formData.skills} setSkills={setSkills} />,
    },
    {
      id: "profileSummary",
      title: t("profileSummary.title"),
      nextButton: t("profileSummary.nextButton"),
      component: (
        <ProfileSummary
          profileSummary={formData.profileSummary}
          setProfileSummary={setProfileSummary}
        />
      ),
    },
    {
      id: "additionalSections",
      title: t("additionalSections.title"),
      nextButton: t("additionalSections.nextButton"),
      component: (
        <AdditionalSections
          additionalSections={formData.additionalSections}
          setAdditionalSections={setAdditionalSections}
          listAdditionalSections={listAdditionalSections}
          activeAdditionalSection={activeAdditionalSection}
          setActiveAdditionalSection={setActiveAdditionalSection}
        />
      ),
    },
    {
      id: "finishUp",
      title: t("finishUp.title", "Finish Up"),
      nextButton: "",
      component: (
        <FinishUp
          personalDetail={formData.personalDetail}
          setPersonalDetail={setPersonalDetail}
          template={template}
          workExperiences={formData.workExperiences}
          setWorkExperiences={setWorkExperiences}
          educations={formData.educations}
          setEducations={setEducations}
          skills={formData.skills}
          setSkills={setSkills}
          profileSummary={formData.profileSummary}
          setProfileSummary={setProfileSummary}
          additionalSections={formData.additionalSections}
          listAdditionalSections={listAdditionalSections}
        />
      ),
    },
  ];


  const nextSectionTitle = listAtsTemplateSection[activeSectionIndex].nextButton;

  const nextComponent = listAtsTemplateSection[activeSectionIndex].component;

  return {
    nextComponent,
    nextSectionTitle,
    activeSectionIndex,
    formData,
    sectionLength: listAtsTemplateSection.length - 1,
    handlePreviousSection: () => setActiveSectionIndex((prev) => prev - 1),
    handleNextSection: () => setActiveSectionIndex((prev) => prev + 1),
    setActiveSectionIndex,
    activeAdditionalSection,
    handleAdditionalSection: () => setActiveAdditionalSection("default"),
    docs: buildTemplateDocument(template, formData),
    listAtsTemplateSection: listAtsTemplateSection.map((section) => ({
      id: section.id,
      title: section.title,
    })),
    setFormData,
  };
};

export default useAtsTemplate;
