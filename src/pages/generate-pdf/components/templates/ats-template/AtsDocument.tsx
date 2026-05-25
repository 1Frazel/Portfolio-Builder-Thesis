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

const hasText = (value?: string) => Boolean(value?.trim());

const joinText = (parts: Array<string | undefined>, separator = ", ") =>
  parts.filter((part) => hasText(part)).map((part) => part!.trim()).join(separator);

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

  const fullName = joinText([firstName, lastName]);
  const headerText = joinText([fullName, jobTarget]);
  const cityPostal = joinText([cityState, postalCode], " ");
  const contactText = joinText([address, cityPostal, country, phone, email]);

  if (!headerText && !contactText) return null;

  return (
    <>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={[
            atsStyles.fontHeader,
            { fontWeight: "bold", textAlign: "center" },
          ]}
        >
          {headerText}
        </Text>
      </View>
      <View
        style={[
          {
            marginTop: "6px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          },
        ]}
      >
        <Text
          style={[atsStyles.fontParagraph, { textAlign: "center" }]}
        >
          {contactText}
        </Text>
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
        <Text style={[atsStyles.fontParagraph, { width: "78%" }]}>
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

  const validWorkExperiences = workExperiences.filter(
    (experience) =>
      hasText(experience.jobTitle) ||
      hasText(experience.employer) ||
      hasText(experience.address) ||
      hasText(experience.description) ||
      hasText(experience.startAt) ||
      hasText(experience.endsAt),
  );

  if (validWorkExperiences.length === 0) return null;

  return (
    <>
      <SectionDetailsWrapper title="EMPLOYMENT HISTORY">
        {validWorkExperiences.map((experience) => {
          return (
            <SectionDetails
              key={experience.id}
              startAt={formatDate(experience.startAt)}
              endsAt={formatDate(experience.endsAt, true)}
              title={joinText([experience.jobTitle, experience.employer])}
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

  const validEducations = educations.filter(
    (education) =>
      hasText(education.degree) ||
      hasText(education.school) ||
      hasText(education.city) ||
      hasText(education.description) ||
      hasText(education.startAt) ||
      hasText(education.endsAt),
  );

  if (validEducations.length === 0) return null;

  return (
    <>
      <SectionDetailsWrapper title="EDUCATION">
        {validEducations.map((education) => {
          return (
            <SectionDetails
              key={education.id}
              startAt={formatDate(education.startAt)}
              endsAt={formatDate(education.endsAt, true)}
              title={joinText([education.degree, education.school])}
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

  const validSkills = skills.filter(
    (skill) => hasText(skill.name) || hasText(skill.expertise),
  );

  if (validSkills.length === 0) return null;

  return (
    <>
      <SectionWrapper title="SKILLS">
        <SectionContainer>
          {validSkills.map((skill) => {
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

  const validLanguages = languages.filter(
    (language) => hasText(language.name) || hasText(language.expertise),
  );

  if (validLanguages.length === 0) return null;

  return (
    <>
      <SectionWrapper title="LANGUAGES">
        <SectionContainer>
          {validLanguages.map((language) => {
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

  const validProfessionalTraining = professionalTraining.filter(
    (training) =>
      hasText(training.courseName) ||
      hasText(training.institution) ||
      hasText(training.startAt) ||
      hasText(training.endsAt),
  );

  if (validProfessionalTraining.length === 0) return null;

  return (
    <>
      <SectionDetailsWrapper title="COURSES">
        {validProfessionalTraining.map((training) => {
          return (
            <SectionDetails
              key={training.id}
              startAt={formatDate(training.startAt)}
              endsAt={formatDate(training.endsAt, true)}
              title={joinText([training.courseName, training.institution])}
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

  const validLicenses = licensesCertifications.filter(
    (license) =>
      hasText(license.name) ||
      hasText(license.issuer) ||
      hasText(license.startAt) ||
      hasText(license.endsAt),
  );

  if (validLicenses.length === 0) return null;

  return (
    <>
      <SectionDetailsWrapper title="LICENSES">
        {validLicenses.map((license) => {
          return (
            <SectionDetails
              key={license.id}
              startAt={formatDate(license.startAt)}
              endsAt={formatDate(license.endsAt, true)}
              title={joinText([license.name, license.issuer])}
            />
          );
        })}
      </SectionDetailsWrapper>
    </>
  );
};

export default AtsDocument;
