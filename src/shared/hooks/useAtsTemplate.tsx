import { useState } from "react";

import Languages from "../../pages/generate-pdf/components/input/Languages";
import LicensesCertifications from "../../pages/generate-pdf/components/input/LicencesCertifications";
import ProfessionalTraining from "../../pages/generate-pdf/components/input/ProfessionalTraining";
import PersonalDetail from "../../pages/generate-pdf/components/input/PersonalDetails";
import WorkExperiences from "../../pages/generate-pdf/components/input/WorkExperiences";
import Education from "../../pages/generate-pdf/components/input/Education";
import Skills from "../../pages/generate-pdf/components/input/Skills";
import ProfileSummary from "../../pages/generate-pdf/components/input/ProfileSummary";
import AdditionalSections from "../../pages/generate-pdf/components/input/AdditionalSections";
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
    setProfessionalTraining,
    setLicensesCertifications,
  } = useFormData({ useMock });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeAdditionalSection, setActiveAdditionalSection] =
    useState("default");

  const listAdditionalSections = [
    {
      id: "language",
      title: "Language",
      component: (
        <Languages languages={formData.languages} setLanguages={setLanguages} />
      ),
    },
    {
      id: "licensesOrCertifications",
      title: "Licenses / Certifications",
      component: (
        <LicensesCertifications
          licensesCertifications={formData.licensesCertifications}
          setLicensesCertifications={setLicensesCertifications}
        />
      ),
    },
    {
      id: "professionalTraining",
      title: "Professional Training",
      component: (
        <ProfessionalTraining
          professionalTraining={formData.professionalTraining}
          setProfessionalTraining={setProfessionalTraining}
        />
      ),
    },
  ];

  const listAtsTemplateSection = [
    {
      id: "personalDetail",
      title: "Personal Information",
      component: (
        <PersonalDetail
          personalDetail={formData.personalDetail}
          setPersonalDetail={setPersonalDetail}
        />
      ),
    },
    {
      id: "workExperiences",
      title: "Work Experiences",
      component: (
        <WorkExperiences
          workExperiences={formData.workExperiences}
          setWorkExperience={setWorkExperiences}
        />
      ),
    },
    {
      id: "education",
      title: "Education",
      component: (
        <Education
          educations={formData.educations}
          setEducations={setEducations}
        />
      ),
    },
    {
      id: "skills",
      title: "Skills",
      component: <Skills skills={formData.skills} setSkills={setSkills} />,
    },
    {
      id: "profileSummary",
      title: "Profile Summary",
      component: (
        <ProfileSummary
          profileSummary={formData.profileSummary}
          setProfileSummary={setProfileSummary}
        />
      ),
    },
    {
      id: "additionalSections",
      title: "Additional Sections",
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
      title: "Finish Up",
      component: (
        <FinishUp
          personalDetail={formData.personalDetail}
          setPersonalDetail={setPersonalDetail}
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

  const isNotLast = activeSectionIndex < listAtsTemplateSection.length - 1;

  const nextSectionTitle =
    listAtsTemplateSection[
      isNotLast ? activeSectionIndex + 1 : activeSectionIndex
    ].title;

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
