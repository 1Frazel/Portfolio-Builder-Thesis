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
import { Section, SectionContainer, SectionWrapper } from "./AtsSection";
import { SectionDetails, SectionDetailsWrapper } from "./AtsSectionDetails";
import atsStyles from "./atsStyles";

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
          <PersonalDetail personalDetail={personalDetail} />
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

const ProfileSummary = ({ profileSummary }: { profileSummary: string }) => {
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
  return (
    <>
      <SectionDetailsWrapper title="EMPLOYMENT HISTORY">
        {workExperiences.map((experience) => {
          return (
            <SectionDetails
              key={experience.id}
              startAt={experience.startAt}
              endsAt={experience.endsAt}
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
  return (
    <>
      <SectionDetailsWrapper title="EDUCATION">
        {educations.map((education) => {
          return (
            <SectionDetails
              key={education.id}
              startAt={education.startAt}
              endsAt={education.endsAt}
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
  return (
    <>
      <SectionDetailsWrapper title="COURSES">
        <View style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {professionalTraining.map((training) => {
            return (
              <SectionDetails
                key={training.id}
                startAt={training.startAt}
                endsAt={training.endsAt}
                title={`${training.courseName}, ${training.institution}`}
              />
            );
          })}
        </View>
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
  return (
    <>
      <SectionDetailsWrapper title="LICENSES">
        <View style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
          {licensesCertifications.map((license) => {
            return (
              <SectionDetails
                key={license.id}
                startAt={license.startAt}
                endsAt={license.endsAt}
                title={`${license.name}, ${license.issuer}`}
              />
            );
          })}
        </View>
      </SectionDetailsWrapper>
      <Divider />
    </>
  );
};

export default AtsDocument;
