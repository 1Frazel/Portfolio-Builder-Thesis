import { useState } from "react";
import {
  defaultAdditionalSections,
  defaultEducation,
  defaultLanguages,
  defaultLicensesCertification,
  defaultPersonalDetail,
  defaultProfessionalTraining,
  defaultProfileSummary,
  defaultSkills,
  defaultWorkExperiences,
} from "../../pages/generate-pdf/const/generatePdfConst";
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

const useAtsTemplate = () => {
  const [personalDetail, setPersonalDetail] = useState({
    ...defaultPersonalDetail,
  });
  const [workExperiences, setWorkExperiences] = useState([
    defaultWorkExperiences,
  ]);
  const [educations, setEducations] = useState([defaultEducation]);
  const [skills, setSkills] = useState([defaultSkills]);
  const [profileSummary, setProfileSummary] = useState(defaultProfileSummary);
  const [additionalSections, setAdditionalSections] = useState(
    defaultAdditionalSections,
  );
  const [languages, setLanguages] = useState([defaultLanguages]);
  const [professionalTraining, setProfessionalTraining] = useState([
    defaultProfessionalTraining,
  ]);
  const [licensesCertifications, setLicensesCertification] = useState([
    defaultLicensesCertification,
  ]);

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
    activeAdditionalSection,
    handleAdditionalSection: () => setActiveAdditionalSection("default"),
    docs: <AtsDocument personalDetail={personalDetail} />,
  };
};

export default useAtsTemplate;
