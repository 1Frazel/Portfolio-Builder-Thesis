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
import AtsDocument from "../../pages/generate-pdf/components/templates/ats-template/AtsDocument";
import {
  DEFAULT_ADDITIONAL_SECTIONS,
  DEFAULT_EDUCATION,
  DEFAULT_LANGUAGES,
  DEFAULT_LICENSES_CERTIFICATION,
  DEFAULT_PERSONAL_DETAIL,
  DEFAULT_PROFESSIONAL_TRAINING,
  DEFAULT_PROFILE_SUMMARY,
  DEFAULT_SKILLS,
  DEFAULT_WORK_EXPERIENCES,
  mocks,
} from "../../pages/generate-pdf/const/generatePdfConst";

const useAtsTemplate = ({ useMock }: { useMock: boolean }) => {
  const [personalDetail, setPersonalDetail] = useState(
    useMock ? mocks.DEFAULT_PERSONAL_DETAIL : DEFAULT_PERSONAL_DETAIL,
  );
  const [workExperiences, setWorkExperiences] = useState(
    useMock ? mocks.DEFAULT_WORK_EXPERIENCES : [DEFAULT_WORK_EXPERIENCES],
  );
  const [educations, setEducations] = useState(
    useMock ? mocks.DEFAULT_EDUCATION : [DEFAULT_EDUCATION],
  );
  const [skills, setSkills] = useState(
    useMock ? mocks.DEFAULT_SKILLS : [DEFAULT_SKILLS],
  );
  const [profileSummary, setProfileSummary] = useState(
    useMock ? mocks.DEFAULT_PROFILE_SUMMARY : DEFAULT_PROFILE_SUMMARY,
  );
  const [additionalSections, setAdditionalSections] = useState(
    DEFAULT_ADDITIONAL_SECTIONS,
  );
  const [languages, setLanguages] = useState(
    useMock ? mocks.DEFAULT_LANGUAGES : [DEFAULT_LANGUAGES],
  );
  const [professionalTraining, setProfessionalTraining] = useState(
    useMock
      ? mocks.DEFAULT_PROFESSIONAL_TRAINING
      : [DEFAULT_PROFESSIONAL_TRAINING],
  );
  const [licensesCertifications, setLicensesCertification] = useState(
    useMock
      ? mocks.DEFAULT_LICENSES_CERTIFICATION
      : [DEFAULT_LICENSES_CERTIFICATION],
  );

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeAdditionalSection, setActiveAdditionalSection] =
    useState("default");

  const listAdditionalSections = [
    {
      id: "language",
      title: "Language",
      component: (
        <Languages languages={languages} setLanguages={setLanguages} />
      ),
    },
    {
      id: "licensesOrCertifications",
      title: "Licenses / Certifications",
      component: (
        <LicensesCertifications
          licensesCertifications={licensesCertifications}
          setLicensesCertifications={setLicensesCertification}
        />
      ),
    },
    {
      id: "professionalTraining",
      title: "Professional Training",
      component: (
        <ProfessionalTraining
          professionalTraining={professionalTraining}
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
          personalDetail={personalDetail}
          setPersonalDetail={setPersonalDetail}
        />
      ),
    },
    {
      id: "workExperiences",
      title: "Work Experiences",
      component: (
        <WorkExperiences
          workExperiences={workExperiences}
          setWorkExperience={setWorkExperiences}
        />
      ),
    },
    {
      id: "education",
      title: "Education",
      component: (
        <Education educations={educations} setEducations={setEducations} />
      ),
    },
    {
      id: "skills",
      title: "Skills",
      component: <Skills skills={skills} setSkills={setSkills} />,
    },
    {
      id: "profileSummary",
      title: "Profile Summary",
      component: (
        <ProfileSummary
          profileSummary={profileSummary}
          setProfileSummary={setProfileSummary}
        />
      ),
    },
    {
      id: "additionalSections",
      title: "Additional Sections",
      component: (
        <AdditionalSections
          additionalSections={additionalSections}
          setAdditionalSections={setAdditionalSections}
          listAdditionalSections={listAdditionalSections}
          activeAdditionalSection={activeAdditionalSection}
          setActiveAdditionalSection={setActiveAdditionalSection}
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

  console.log({
    personalDetail,
    workExperiences,
    educations,
    skills,
    profileSummary,
    additionalSections,
    languages,
    professionalTraining,
    licensesCertifications,
  });

  return {
    nextComponent,
    nextSectionTitle,
    activeSectionIndex,
    sectionLength: listAtsTemplateSection.length - 1,
    handlePreviousSection: () => setActiveSectionIndex((prev) => prev - 1),
    handleNextSection: () => setActiveSectionIndex((prev) => prev + 1),
    setActiveSectionIndex,
    activeAdditionalSection,
    handleAdditionalSection: () => setActiveAdditionalSection("default"),
    docs: (
      <AtsDocument
        personalDetail={personalDetail}
        profileSummary={profileSummary}
        workExperiences={workExperiences}
        educations={educations}
        skills={skills}
        languages={languages}
        professionalTraining={professionalTraining}
        licensesCertifications={licensesCertifications}
      />
    ),
    listAtsTemplateSection: listAtsTemplateSection.map((section) => ({
      id: section.id,
      title: section.title,
    })),
  };
};

export default useAtsTemplate;
