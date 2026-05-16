import React from "react";

import Education from "./Education";
import PersonalDetail from "./PersonalDetails";
import ProfileSummary from "./ProfileSummary";
import Skills from "./Skills";
import WorkExperiences from "./WorkExperiences";
import type {
  IAdditionalSections,
  IEducation,
  IPersonalDetail,
  ISkill,
  IWorkExperience,
  IListSections,
} from "../../interface/generatePdfInterface";

const FinishUp = ({
  personalDetail,
  setPersonalDetail,
  workExperiences,
  setWorkExperiences,
  educations,
  setEducations,
  skills,
  setSkills,
  profileSummary,
  setProfileSummary,
  additionalSections,
  listAdditionalSections,
}: {
  personalDetail: IPersonalDetail;
  setPersonalDetail: React.Dispatch<React.SetStateAction<IPersonalDetail>>;
  workExperiences: IWorkExperience[];
  setWorkExperiences: React.Dispatch<React.SetStateAction<IWorkExperience[]>>;
  educations: IEducation[];
  setEducations: React.Dispatch<React.SetStateAction<IEducation[]>>;
  skills: ISkill[];
  setSkills: React.Dispatch<React.SetStateAction<ISkill[]>>;
  profileSummary: string;
  setProfileSummary: React.Dispatch<React.SetStateAction<string>>;
  additionalSections: IAdditionalSections[];
  listAdditionalSections: IListSections[];
}) => {
  const selectedAdditionalSections = listAdditionalSections.filter(
    (section) =>
      additionalSections.find((item) => item.id === section.id)?.isSet ?? false,
  );

  return (
    <div className="flex h-[calc(100vh-220px)] min-h-0 flex-col overflow-hidden p-2">
      <div className="min-h-0 flex-1 space-y-4 overflow-auto">
        <PersonalDetail
          personalDetail={personalDetail}
          setPersonalDetail={setPersonalDetail}
          summaryMode
        />
        <WorkExperiences
          workExperiences={workExperiences}
          setWorkExperience={setWorkExperiences}
          summaryMode
        />
        <Education
          educations={educations}
          setEducations={setEducations}
          summaryMode
        />
        <Skills skills={skills} setSkills={setSkills} summaryMode />
        <ProfileSummary
          profileSummary={profileSummary}
          setProfileSummary={setProfileSummary}
          summaryMode
        />
        {selectedAdditionalSections.length > 0 ? (
          selectedAdditionalSections.map((section) => (
            <React.Fragment key={section.id}>
              {React.cloneElement(section.component, { summaryMode: true })}
            </React.Fragment>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
            No additional sections were selected.
          </div>
        )}
      </div>
    </div>
  );
};

export default FinishUp;
