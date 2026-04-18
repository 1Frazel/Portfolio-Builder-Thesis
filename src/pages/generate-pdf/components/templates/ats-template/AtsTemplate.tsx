import { useState } from "react";
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

const A4_SIZE = {
  height: "h-[841px]",
  width: "w-[595px]",
};

const AtsTemplate = () => {
  const [personalDetail, setPersonalDetail] = useState({
    ...defaultPersonalDetail,
  });
  const [workExperiences, setWorkExperiences] = useState([
    defaultWorkExperiences,
  ]);
  const [educations, setEducations] = useState([defaultEducation]);
  const [skills, setSkills] = useState([defaultSkills]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const AtsTemplateSection = [
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
    { id: "profileSummary", title: "Profile Summary", component: <></> },
    {
      id: "additionalSections",
      title: "Additional Sections",
      component: <></>,
    },
  ];

  const nextSectionTitle = AtsTemplateSection[activeSectionIndex + 1].title;
  const nextComponent = AtsTemplateSection[activeSectionIndex].component;
  console.log({ personalDetail, workExperiences, educations, skills });

  return (
    <div className="h-full w-full flex gap-[24px]">
      <div className="flex flex-col gap-[8px] basis-1/2">
        {nextComponent}
        <GeneratePdfFooter
          nextSectionTitle={nextSectionTitle}
          activeSectionIndex={activeSectionIndex}
          sectionLength={AtsTemplateSection.length - 1}
          handlePreviousSection={() =>
            setActiveSectionIndex((prev) => prev - 1)
          }
          handleNextSection={() => setActiveSectionIndex((prev) => prev + 1)}
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
