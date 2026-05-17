import { Document, Page, Text, View } from "@react-pdf/renderer";
import type {
  IEducation,
  ILanguages,
  ILicensesCertifications,
  IPersonalDetail,
  IProfessionalTraining,
  ISkill,
  IWorkExperience,
} from "../../../interface/generatePdfInterface";

import Divider from "../Divider";
import dayjs from "dayjs";
import { Section, SectionContainer, SectionWrapper } from "./AtsSection";
import { SectionDetails, SectionDetailsWrapper } from "./AtsSectionDetails";
import atsStyles from "./atsStyles";
import {
  DEFAULT_EDUCATION,
  DEFAULT_LICENSES_CERTIFICATION,
  DEFAULT_PROFESSIONAL_TRAINING,
  DEFAULT_SKILLS,
  DEFAULT_WORK_EXPERIENCES,
  DEFAULT_LANGUAGES,
  DEFAULT_PROFILE_SUMMARY,
  DEFAULT_PERSONAL_DETAIL,
} from "../../../const/generatePdfConst";

const AtsDocument = ({
  personalDetail,
  profileSummary,
  workExperiences,
  educations,
  skills,
  languages,
  professionalTraining,
  licensesCertifications,
}: {
  personalDetail: IPersonalDetail;
  profileSummary: string;
  workExperiences: IWorkExperience[];
  educations: IEducation[];
  skills: ISkill[];
  languages: ILanguages[];
  professionalTraining: IProfessionalTraining[];
  licensesCertifications: ILicensesCertifications[];
}) => {
  return (
    <Document>
      <Page size="A4" style={atsStyles.page}>
        <View style={atsStyles.section}>
          {isDifferent(personalDetail, DEFAULT_PERSONAL_DETAIL) && (
            <PersonalDetail personalDetail={personalDetail} />
          )}
          <ProfileSummary profileSummary={profileSummary} />
          <WorkExperience workExperiences={workExperiences} />
          <Education educations={educations} />
          <Skill skills={skills} />
          <Language languages={languages} />
          <ProfessionalTraining professionalTraining={professionalTraining} />
          <LicensesCertifications
            licensesCertifications={licensesCertifications}
          />
        </View>
      </Page>
    </Document>
  );
};

const PersonalDetail = ({
  personalDetail,
}: {
  personalDetail: IPersonalDetail;
}) => {
  const {
    jobTarget,
    firstName,
    lastName,
    email,
    phone,
    postalCode,
    cityState,
    country,
    address,
  } = personalDetail;

  return (
    <>
      <View style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Text
          style={[atsStyles.fontHeader, { fontWeight: "bold" }]}
        >{`${firstName} ${lastName}, ${jobTarget}`}</Text>
      </View>
      <View
        style={[
          atsStyles.sectionMargin,
          {
            display: "flex",
            alignItems: "center",
            width: "100%",
          },
        ]}
      >
        <Text
          style={atsStyles.fontParagraph}
        >{`${address}, ${cityState} ${postalCode}, ${country}, ${phone}, ${email}`}</Text>
      </View>
      <Divider />
    </>
  );
};

const isDifferent = <T,>(value: T, defaultValue: T) => {
  try {
    return JSON.stringify(value) !== JSON.stringify(defaultValue);
  } catch {
    return Boolean(value) !== Boolean(defaultValue);
  }
};

const formatDate = (date?: string, isEnd = false) => {
  if (!date) return isEnd ? "Present" : "";
  if (typeof date === "string" && date.trim().toLowerCase() === "present")
    return "Present";
  try {
    return dayjs(date).format("MMM, YYYY");
  } catch {
    return date;
  }
};

const ProfileSummary = ({ profileSummary }: { profileSummary: string }) => {
  if (!isDifferent(profileSummary, DEFAULT_PROFILE_SUMMARY)) return null;

  return (
    <>
      <SectionWrapper title="PROFILE">
        <Text style={[atsStyles.fontParagraph, { width: "80%" }]}>
          {profileSummary}
        </Text>
      </SectionWrapper>
      <Divider />
    </>
  );
};

const WorkExperience = ({
  workExperiences,
}: {
  workExperiences: IWorkExperience[];
}) => {
  const defaultWork = [DEFAULT_WORK_EXPERIENCES];
  if (!isDifferent(workExperiences, defaultWork)) return null;

  return (
    <>
      <SectionDetailsWrapper title="EMPLOYMENT HISTORY">
        {workExperiences.map((experience) => {
          return (
            <SectionDetails
              key={experience.id}
              startAt={formatDate(experience.startAt)}
              endsAt={formatDate(experience.endsAt, true)}
              title={`${experience.jobTitle}, ${experience.employer}`}
              address={experience.address}
              description={experience.description}
            />
          );
        })}
      </SectionDetailsWrapper>
      <Divider />
    </>
  );
};

const Education = ({ educations }: { educations: IEducation[] }) => {
  const defaultEd = [DEFAULT_EDUCATION];
  if (!isDifferent(educations, defaultEd)) return null;

  return (
    <>
      <SectionDetailsWrapper title="EDUCATION">
        {educations.map((education) => {
          return (
            <SectionDetails
              key={education.id}
              startAt={formatDate(education.startAt)}
              endsAt={formatDate(education.endsAt, true)}
              title={`${education.degree}, ${education.school}`}
              address={education.city}
              description={education.description}
            />
          );
        })}
      </SectionDetailsWrapper>
      <Divider />
    </>
  );
};

const Skill = ({ skills }: { skills: ISkill[] }) => {
  const defaultSkills = [DEFAULT_SKILLS];
  if (!isDifferent(skills, defaultSkills)) return null;

  return (
    <>
      <SectionWrapper title="SKILLS">
        <SectionContainer>
          {skills.map((skill) => {
            return (
              <Section
                key={skill.id}
                name={skill.name}
                level={skill.expertise}
              />
            );
          })}
        </SectionContainer>
      </SectionWrapper>
      <Divider />
    </>
  );
};

const Language = ({ languages }: { languages: ILanguages[] }) => {
  const defaultLang = [DEFAULT_LANGUAGES];
  if (!isDifferent(languages, defaultLang)) return null;

  return (
    <>
      <SectionWrapper title="LANGUAGES">
        <SectionContainer>
          {languages.map((language) => {
            return (
              <Section
                key={language.id}
                name={language.name}
                level={language.expertise}
              />
            );
          })}
        </SectionContainer>
      </SectionWrapper>
      <Divider />
    </>
  );
};

const ProfessionalTraining = ({
  professionalTraining,
}: {
  professionalTraining: IProfessionalTraining[];
}) => {
  const defaultProf = [DEFAULT_PROFESSIONAL_TRAINING];
  if (!isDifferent(professionalTraining, defaultProf)) return null;

  return (
    <>
      <SectionDetailsWrapper title="COURSES">
        {professionalTraining.map((training) => {
          return (
            <SectionDetails
              key={training.id}
              startAt={formatDate(training.startAt)}
              endsAt={formatDate(training.endsAt, true)}
              title={`${training.courseName}, ${training.institution}`}
            />
          );
        })}
      </SectionDetailsWrapper>
      <Divider />
    </>
  );
};

const LicensesCertifications = ({
  licensesCertifications,
}: {
  licensesCertifications: ILicensesCertifications[];
}) => {
  const defaultLic = [DEFAULT_LICENSES_CERTIFICATION];
  if (!isDifferent(licensesCertifications, defaultLic)) return null;

  return (
    <>
      <SectionDetailsWrapper title="LICENSES">
        {licensesCertifications.map((license) => {
          return (
            <SectionDetails
              key={license.id}
              startAt={formatDate(license.startAt)}
              endsAt={formatDate(license.endsAt, true)}
              title={`${license.name}, ${license.issuer}`}
            />
          );
        })}
      </SectionDetailsWrapper>
      <Divider />
    </>
  );
};

export default AtsDocument;
