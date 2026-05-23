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
  return (
    <Document>
      <Page size="A4" style={professionalStyles.page}>
        <View fixed style={professionalStyles.sidebar}>
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

  return (
    <View wrap={false}>
      <Text style={professionalStyles.name}>{`${firstName} ${lastName}`}</Text>
      <Text style={professionalStyles.jobTarget}>{jobTarget}</Text>

      <Text style={professionalStyles.sidebarHeading}>Details</Text>
      <Text style={professionalStyles.detailText}>{address}</Text>
      <Text style={professionalStyles.detailText}>{`${cityState}`}</Text>
      <Text style={professionalStyles.detailText}>{`${country}`}</Text>
      <Text style={professionalStyles.linkText}>{postalCode}</Text>
      <Text style={professionalStyles.linkText}>{phone}</Text>
      <Text style={professionalStyles.linkText}>{email}</Text>

      <View style={professionalStyles.sidebarDivider} />
    </View>
  );
};

const SidebarSkillSection = ({ skills }: { skills: ISkill[] }) => {
  return (
    <View wrap={false}>
      <Text style={professionalStyles.sidebarHeading}>Skills</Text>
      <View style={professionalStyles.oneColumnList}>
        {skills.map((skill) => (
          <View key={skill.id} style={professionalStyles.oneColumnItem}>
            <Text style={professionalStyles.skillName}>{skill.name}</Text>
          </View>
        ))}
      </View>
      <View style={professionalStyles.sidebarDivider} />
    </View>
  );
};

const SidebarLanguageSection = ({ languages }: { languages: ILanguages[] }) => {
  return (
    <View wrap={false}>
      <Text style={professionalStyles.sidebarHeading}>Languages</Text>
      <View style={professionalStyles.oneColumnList}>
        {languages.map((language) => (
          <View key={language.id} style={professionalStyles.oneColumnItem}>
            <Text style={professionalStyles.skillName}>{language.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const MainProfileSummary = ({ profileSummary }: { profileSummary: string }) => {
  if (!isDifferent(profileSummary, DEFAULT_PROFILE_SUMMARY)) return null;

  return (
    <SectionBlock title="Profile">
      <Text style={professionalStyles.paragraph}>{profileSummary}</Text>
    </SectionBlock>
  );
};

const MainWorkExperience = ({
  workExperiences,
}: {
  workExperiences: IWorkExperience[];
}) => {
  if (!isDifferent(workExperiences, [DEFAULT_WORK_EXPERIENCES])) return null;

  return (
    <SectionBlock title="Employment History">
      {workExperiences.map((experience) => (
        <View key={experience.id} style={{ marginBottom: "12px" }}>
          <View style={professionalStyles.sectionHeaderRow}>
            <Text style={professionalStyles.roleText}>
              {`${experience.jobTitle}, ${experience.employer}${experience.address ? `, ${experience.address}` : ""}`}
            </Text>
          </View>
          <Text style={professionalStyles.dateText}>
            {`${formatDate(experience.startAt)} — ${formatDate(
              experience.endsAt,
              true,
            )}`}
          </Text>
          {experience.description && (
            <Text style={professionalStyles.paragraph}>
              {experience.description}
            </Text>
          )}
        </View>
      ))}
    </SectionBlock>
  );
};

const MainEducation = ({ educations }: { educations: IEducation[] }) => {
  if (!isDifferent(educations, [DEFAULT_EDUCATION])) return null;

  return (
    <SectionBlock title="Education">
      {educations.map((education) => (
        <View key={education.id} style={{ marginBottom: "12px" }}>
          <View style={professionalStyles.sectionHeaderRow}>
            <Text style={professionalStyles.roleText}>
              {`${education.degree}, ${education.school}${education.city ? `, ${education.city}` : ""}`}
            </Text>
          </View>
          <Text style={professionalStyles.dateText}>
            {`${formatDate(education.startAt)} — ${formatDate(
              education.endsAt,
              true,
            )}`}
          </Text>
          {education.description && (
            <Text style={professionalStyles.paragraph}>
              {education.description}
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

  return (
    <SectionBlock title="Courses">
      {professionalTraining.map((training) => (
        <View key={training.id} style={{ marginBottom: "12px" }}>
          <Text style={professionalStyles.roleText}>{training.courseName}</Text>
          <Text style={professionalStyles.dateText}>
            {`${formatDate(training.startAt)} — ${formatDate(
              training.endsAt,
              true,
            )}`}
          </Text>
          {training.institution && (
            <Text style={professionalStyles.paragraph}>
              {training.institution}
            </Text>
          )}
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

  return (
    <SectionBlock title="Licenses">
      {licensesCertifications.map((license) => (
        <View key={license.id} style={{ marginBottom: "12px" }}>
          <Text style={professionalStyles.roleText}>{license.name}</Text>
          <Text style={professionalStyles.dateText}>
            {`${formatDate(license.startAt)} — ${formatDate(
              license.endsAt,
              true,
            )}`}
          </Text>
          {license.issuer && (
            <Text style={professionalStyles.paragraph}>{license.issuer}</Text>
          )}
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
