import { useState, type JSX } from "react";
import AtsDocument from "./AtsDocument";

import Preview from "../../preview/Preview";
import { defaultPersonalDetail } from "../../input/personalDetail";
import PersonalDetail from "../../input/PersonalDetails";
import GeneratePdfFooter from "../../footer/GeneratePdfFooter";
import PdfDownloadBtn from "../../button/PdfDownloadBtn";

import { defaultWorkExperiences } from "../../input/workExperience";
import WorkExperiences from "../../input/WorkExperiences";
import { defaultEducation } from "../../input/education";
import Education from "../../input/Education";
import { defaultSkills } from "../../input/skill";
import Skills from "../../input/Skills";
import { defaultProfileSummary } from "../../input/profileSummary";
import ProfileSummary from "../../input/ProfileSummary";
import AdditionalSections from "../../input/AdditionalSections";
import { defaultAdditionalSections } from "../../input/additionalSections";
import { defaultLanguages } from "../../input/languages";
import Languages from "../../input/Languages";

const A4_SIZE = {
  height: "h-[841px]",
  width: "w-[595px]",
};

export interface IListSections {
  id: string;
  title: string;
  component: JSX.Element;
}

const AtsTemplate = () => {
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
      component: <></>,
    },
    {
      id: "professionalTraining",
      title: "Professional Training",
      component: <></>,
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
  });

  return (
    <div className="h-full w-full flex gap-[24px]">
      <div className="flex flex-col gap-[8px] basis-1/2">
        {nextComponent}
        <GeneratePdfFooter
          nextSectionTitle={nextSectionTitle}
          activeSectionIndex={activeSectionIndex}
          sectionLength={listAtsTemplateSection.length - 1}
          handlePreviousSection={() =>
            setActiveSectionIndex((prev) => prev - 1)
          }
          handleNextSection={() => setActiveSectionIndex((prev) => prev + 1)}
          activeAdditionalSection={activeAdditionalSection}
          handleAdditionalSection={() => setActiveAdditionalSection("default")}
        >
          <PdfDownloadBtn
            filename="ats-cv"
            docs={<AtsDocument personalDetail={personalDetail} />}
          />
        </GeneratePdfFooter>
      </div>

      <Preview
        heightClass={A4_SIZE.height}
        widthClass={A4_SIZE.width}
        docs={<AtsDocument personalDetail={personalDetail} />}
      />
    </div>
  );
};

export default AtsTemplate;
