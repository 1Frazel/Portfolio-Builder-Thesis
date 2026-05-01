import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { IPersonalDetail } from "../../../interface/generatePdfInterface";
import { mocks } from "../../../const/generatePdfConst";
import Divider from "../Divider";
import type React from "react";

const styles = StyleSheet.create({
  fontHeader: {
    fontSize: "12px",
  },
  fontSectionHeader: {
    fontSize: "9px",
  },
  fontParagraph: {
    fontSize: "8px",
  },
  sectionMargin: {
    marginTop: "8px",
    marginBottom: "16px",
  },
  page: {
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
  },
});

const AtsDocument = ({
  personalDetail,
}: {
  personalDetail: IPersonalDetail;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
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

const SectionWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <View
      style={[
        styles.sectionMargin,
        {
          display: "flex",
          flexDirection: "row",
          width: "100%",
        },
      ]}
    >
      <Text style={[styles.fontSectionHeader, { width: "20%" }]}>{title}</Text>
      {children}
    </View>
  );
};

const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  /* react-pdf doesn't support grid: https://github.com/diegomura/react-pdf/issues/1207 */
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "80%",
        flexWrap: "wrap",
        rowGap: "8px",
        columnGap: "24px",
      }}
    >
      {children}
    </View>
  );
};

const Section = ({ name, level }: { name: string; level: string }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "47%",
        justifyContent: "space-between",
      }}
    >
      <Text style={styles.fontParagraph}>{name}</Text>
      <Text style={styles.fontParagraph}>{level}</Text>
    </View>
  );
};

const SectionDetails = ({
  startAt,
  endsAt,
  title,
  address,
  description,
}: {
  startAt: string;
  endsAt: string;
  title: string;
  address?: string;
  description?: string;
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Text
        style={[styles.fontParagraph, { width: "20%" }]}
      >{`${startAt} - ${endsAt}`}</Text>
      <View style={{ width: "80%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.fontParagraph}>{title}</Text>
          {address && <Text style={styles.fontParagraph}>{address}</Text>}
        </View>
        {description && (
          <Text style={[styles.fontParagraph, { marginTop: "8px" }]}>
            {description}
          </Text>
        )}
      </View>
    </View>
  );
};

const SectionDetailsWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <View style={[styles.sectionMargin, { width: "100%" }]}>
      <Text style={[styles.fontSectionHeader, { marginBottom: "8px" }]}>
        {title}
      </Text>
      {children}
    </View>
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
          style={[styles.fontHeader, { fontWeight: "bold" }]}
        >{`${firstName} ${lastName}, ${jobTarget}`}</Text>
      </View>
      <View
        style={[
          styles.sectionMargin,
          {
            display: "flex",
            alignItems: "center",
            width: "100%",
          },
        ]}
      >
        <Text
          style={styles.fontParagraph}
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
        <Text style={[styles.fontParagraph, { width: "80%" }]}>
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
