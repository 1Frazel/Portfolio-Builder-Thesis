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

import dayjs from "dayjs";
import professionalStyles from "./ProfessionalStyles";
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

const ProfessionalDocument = ({
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
  const sidebarColor = personalDetail.accentColor?.trim() || "#0f5a4e";

  return (
    <Document>
      <Page size="A4" style={professionalStyles.page}>
        <View
          fixed
          style={[
            professionalStyles.sidebar,
            { backgroundColor: sidebarColor },
          ]}
        >
          {isDifferent(personalDetail, DEFAULT_PERSONAL_DETAIL) && (
            <SidebarPersonalDetail personalDetail={personalDetail} />
          )}
          {isDifferent(skills, [DEFAULT_SKILLS]) && (
            <SidebarSkillSection skills={skills} />
          )}
          {isDifferent(languages, [DEFAULT_LANGUAGES]) && (
            <SidebarLanguageSection languages={languages} />
          )}
        </View>

        <View style={professionalStyles.content}>
          <MainProfileSummary profileSummary={profileSummary} />
          <MainWorkExperience workExperiences={workExperiences} />
          <MainEducation educations={educations} />
          <MainProfessionalTraining
            professionalTraining={professionalTraining}
          />
          <MainLicenses licensesCertifications={licensesCertifications} />
        </View>
      </Page>
    </Document>
  );
};

const hasText = (value?: string) => Boolean(value?.trim());

const joinText = (parts: Array<string | undefined>, separator = ", ") =>
  parts
    .filter((part) => hasText(part))
    .map((part) => part!.trim())
    .join(separator);

const SidebarPersonalDetail = ({
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

  const fullName = joinText([firstName, lastName], " ");
  const detailLines = [
    address,
    cityState,
    country,
    postalCode,
    phone,
    email,
  ].filter((line) => hasText(line));

  return (
    <View wrap={false}>
      {hasText(fullName) && (
        <Text style={professionalStyles.name}>{fullName}</Text>
      )}
      {hasText(jobTarget) && (
        <Text style={professionalStyles.jobTarget}>{jobTarget.trim()}</Text>
      )}

      {detailLines.length > 0 && (
        <>
          <Text style={professionalStyles.sidebarHeading}>Details</Text>
          {hasText(address) && (
            <Text style={professionalStyles.detailText}>{address.trim()}</Text>
          )}
          {hasText(cityState) && (
            <Text style={professionalStyles.detailText}>
              {cityState.trim()}
            </Text>
          )}
          {hasText(country) && (
            <Text style={professionalStyles.detailText}>{country.trim()}</Text>
          )}
          {hasText(postalCode) && (
            <Text style={professionalStyles.linkText}>{postalCode.trim()}</Text>
          )}
          {hasText(phone) && (
            <Text style={professionalStyles.linkText}>{phone.trim()}</Text>
          )}
          {hasText(email) && (
            <Text style={professionalStyles.linkText}>{email.trim()}</Text>
          )}
        </>
      )}

      <View style={professionalStyles.sidebarDivider} />
    </View>
  );
};

const SidebarSkillSection = ({ skills }: { skills: ISkill[] }) => {
  const validSkills = skills.filter(
    (skill) => hasText(skill.name) || hasText(skill.expertise),
  );
  if (validSkills.length === 0) return null;

  return (
    <View wrap={false}>
      <Text style={professionalStyles.sidebarHeading}>Skills</Text>
      <View style={professionalStyles.oneColumnList}>
        {validSkills.map((skill) => (
          <View key={skill.id} style={professionalStyles.oneColumnItem}>
            <Text style={professionalStyles.skillName}>
              {skill.name.trim()}
            </Text>
          </View>
        ))}
      </View>
      <View style={professionalStyles.sidebarDivider} />
    </View>
  );
};

const SidebarLanguageSection = ({ languages }: { languages: ILanguages[] }) => {
  const validLanguages = languages.filter(
    (language) => hasText(language.name) || hasText(language.expertise),
  );
  if (validLanguages.length === 0) return null;

  return (
    <View wrap={false}>
      <Text style={professionalStyles.sidebarHeading}>Languages</Text>
      <View style={professionalStyles.oneColumnList}>
        {validLanguages.map((language) => (
          <View key={language.id} style={professionalStyles.oneColumnItem}>
            <Text style={professionalStyles.skillName}>
              {language.name.trim()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const MainProfileSummary = ({ profileSummary }: { profileSummary: string }) => {
  if (
    !isDifferent(profileSummary, DEFAULT_PROFILE_SUMMARY) ||
    !hasText(profileSummary)
  )
    return null;

  return (
    <SectionBlock title="Profile">
      <Text style={professionalStyles.paragraph}>{profileSummary.trim()}</Text>
    </SectionBlock>
  );
};

const MainWorkExperience = ({
  workExperiences,
}: {
  workExperiences: IWorkExperience[];
}) => {
  if (!isDifferent(workExperiences, [DEFAULT_WORK_EXPERIENCES])) return null;

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
    <SectionBlock title="Employment History">
      {validWorkExperiences.map((experience) => (
        <View key={experience.id} style={{ marginBottom: "12px" }}>
          <View style={professionalStyles.sectionHeaderRow}>
            <Text style={professionalStyles.roleText}>
              {joinText([
                experience.jobTitle,
                experience.employer,
                experience.address,
              ])}
            </Text>
          </View>
          <Text style={professionalStyles.dateText}>
            {`${formatDate(experience.startAt)} — ${formatDate(
              experience.endsAt,
              true,
            )}`}
          </Text>
          {hasText(experience.description) && (
            <Text style={professionalStyles.paragraph}>
              {experience.description.trim()}
            </Text>
          )}
        </View>
      ))}
    </SectionBlock>
  );
};

const MainEducation = ({ educations }: { educations: IEducation[] }) => {
  if (!isDifferent(educations, [DEFAULT_EDUCATION])) return null;

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
    <SectionBlock title="Education">
      {validEducations.map((education) => (
        <View key={education.id} style={{ marginBottom: "12px" }}>
          <View style={professionalStyles.sectionHeaderRow}>
            <Text style={professionalStyles.roleText}>
              {joinText([education.degree, education.school, education.city])}
            </Text>
          </View>
          <Text style={professionalStyles.dateText}>
            {`${formatDate(education.startAt)} — ${formatDate(
              education.endsAt,
              true,
            )}`}
          </Text>
          {hasText(education.description) && (
            <Text style={professionalStyles.paragraph}>
              {education.description.trim()}
            </Text>
          )}
        </View>
      ))}
    </SectionBlock>
  );
};

const MainProfessionalTraining = ({
  professionalTraining,
}: {
  professionalTraining: IProfessionalTraining[];
}) => {
  if (!isDifferent(professionalTraining, [DEFAULT_PROFESSIONAL_TRAINING]))
    return null;

  const validProfessionalTraining = professionalTraining.filter(
    (training) =>
      hasText(training.courseName) ||
      hasText(training.institution) ||
      hasText(training.startAt) ||
      hasText(training.endsAt),
  );

  if (validProfessionalTraining.length === 0) return null;

  return (
    <SectionBlock title="Courses">
      {validProfessionalTraining.map((training) => (
        <View key={training.id} style={{ marginBottom: "12px" }}>
          <Text style={professionalStyles.roleText}>
            {joinText([training.courseName, training.institution])}
          </Text>
          <Text style={professionalStyles.dateText}>
            {`${formatDate(training.startAt)} — ${formatDate(
              training.endsAt,
              true,
            )}`}
          </Text>
        </View>
      ))}
    </SectionBlock>
  );
};

const MainLicenses = ({
  licensesCertifications,
}: {
  licensesCertifications: ILicensesCertifications[];
}) => {
  if (!isDifferent(licensesCertifications, [DEFAULT_LICENSES_CERTIFICATION]))
    return null;

  const validLicenses = licensesCertifications.filter(
    (license) =>
      hasText(license.name) ||
      hasText(license.issuer) ||
      hasText(license.startAt) ||
      hasText(license.endsAt),
  );

  if (validLicenses.length === 0) return null;

  return (
    <SectionBlock title="Licenses">
      {validLicenses.map((license) => (
        <View key={license.id} style={{ marginBottom: "12px" }}>
          <Text style={professionalStyles.roleText}>
            {joinText([license.name, license.issuer])}
          </Text>
          <Text style={professionalStyles.dateText}>
            {`${formatDate(license.startAt)} — ${formatDate(
              license.endsAt,
              true,
            )}`}
          </Text>
        </View>
      ))}
    </SectionBlock>
  );
};

const SectionBlock = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={professionalStyles.sectionBlock}>
    <Text style={professionalStyles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const isDifferent = <T,>(value: T, defaultValue: T) => {
  try {
    return JSON.stringify(value) !== JSON.stringify(defaultValue);
  } catch {
    return Boolean(value) !== Boolean(defaultValue);
  }
};

const formatDate = (date?: string, isEnd = false) => {
  if (!date) return isEnd ? "Present" : "";
  if (typeof date === "string" && date.trim().toLowerCase() === "present") {
    return "Present";
  }

  try {
    return dayjs(date).format("MMM YYYY");
  } catch {
    return date;
  }
};

export default ProfessionalDocument;
