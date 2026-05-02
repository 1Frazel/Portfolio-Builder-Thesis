import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { IPersonalDetail } from "../../../interface/generatePdfInterface";
import { mocks } from "../../../const/generatePdfConst";
import Divider from "../Divider";
import { Section, SectionContainer, SectionWrapper } from "./AtsSection";
import { SectionDetails, SectionDetailsWrapper } from "./AtsSectionDetails";
import atsStyles from "./atsStyles";

const AtsDocument = ({
  personalDetail,
}: {
  personalDetail: IPersonalDetail;
}) => {
  return (
    <Document>
      <Page size="A4" style={atsStyles.page}>
        <View style={atsStyles.section}>
          <PersonalDetail />
          <ProfileSummary />
          <WorkExperience />
          <Education />
          <Skill />
          <Language />
          <ProfessionalTraining />
        </View>
      </Page>
    </Document>
  );
};

const PersonalDetail = () => {
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
  } = mocks.DEFAULT_PERSONAL_DETAIL;

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

const ProfileSummary = () => {
  const profileSummary = mocks.DEFAULT_PROFILE_SUMMARY;

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

const WorkExperience = () => {
  const workExperiences = mocks.DEFAULT_WORK_EXPERIENCES;

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

const Education = () => {
  const educations = mocks.DEFAULT_EDUCATION;

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

const Skill = () => {
  const skills = mocks.DEFAULT_SKILLS;

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

const Language = () => {
  const languages = mocks.DEFAULT_LANGUAGES;

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

const ProfessionalTraining = () => {
  const professionalTraining = mocks.DEFAULT_PROFESSIONAL_TRAINING;

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

export default AtsDocument;
