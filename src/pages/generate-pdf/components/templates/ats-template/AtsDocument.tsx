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
      <View
        style={[
          styles.sectionMargin,
          {
            display: "flex",
            flexDirection: "row",
            gap: "64px",
          },
        ]}
      >
        <Text style={styles.fontSectionHeader}>PROFILE</Text>
        <Text style={styles.fontParagraph}>{profileSummary}</Text>
      </View>
      <Divider />
    </>
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
  address: string;
  description: string;
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "64px",
        width: "100%",
      }}
    >
      <Text style={styles.fontParagraph}>{`${startAt} - ${endsAt}`}</Text>
      <View style={{ width: "100%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.fontParagraph}>{title}</Text>
          <Text style={styles.fontParagraph}>{address}</Text>
        </View>
        <Text style={[styles.fontParagraph, { marginTop: "8px" }]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const SectionContainer = ({
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

const WorkExperience = () => {
  const workExperiences = mocks.DEFAULT_WORK_EXPERIENCES;

  return (
    <>
      <SectionContainer title="EMPLOYMENT HISTORY">
        {workExperiences.map((experience) => {
          return (
            <SectionDetails
              key={experience.id}
              startAt={experience.startAt}
              endsAt={experience.endsAt}
              title={experience.jobTitle}
              address={experience.address}
              description={experience.description}
            />
          );
        })}
      </SectionContainer>
      <Divider />
    </>
  );
};

const Education = () => {
  const educations = mocks.DEFAULT_EDUCATION;

  return (
    <>
      <SectionContainer title="EDUCATION">
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
      </SectionContainer>
      <Divider />
    </>
  );
};

export default AtsDocument;
