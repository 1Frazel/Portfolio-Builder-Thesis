import type React from "react";

import Education from "./Education";
import Languages from "./Languages";
import LicensesCertifications from "./LicencesCertifications";
import PersonalDetail from "./PersonalDetails";
import ProfileSummary from "./ProfileSummary";
import ProfessionalTraining from "./ProfessionalTraining";
import Skills from "./Skills";
import WorkExperiences from "./WorkExperiences";
import type {
  IEducation,
  ILanguages,
  ILicensesCertifications,
  IPersonalDetail,
  IProfessionalTraining,
  ISkill,
  IWorkExperience,
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
  languages,
  setLanguages,
  professionalTraining,
  setProfessionalTraining,
  licensesCertifications,
  setLicensesCertifications,
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
  languages: ILanguages[];
  setLanguages: React.Dispatch<React.SetStateAction<ILanguages[]>>;
  professionalTraining: IProfessionalTraining[];
  setProfessionalTraining: React.Dispatch<
    React.SetStateAction<IProfessionalTraining[]>
  >;
  licensesCertifications: ILicensesCertifications[];
  setLicensesCertifications: React.Dispatch<
    React.SetStateAction<ILicensesCertifications[]>
  >;
}) => {
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
        <Languages
          languages={languages}
          setLanguages={setLanguages}
          summaryMode
        />
        <LicensesCertifications
          licensesCertifications={licensesCertifications}
          setLicensesCertifications={setLicensesCertifications}
          summaryMode
        />
        <ProfessionalTraining
          professionalTraining={professionalTraining}
          setProfessionalTraining={setProfessionalTraining}
          summaryMode
        />
      </div>
    </div>
  );
};

export default FinishUp;
