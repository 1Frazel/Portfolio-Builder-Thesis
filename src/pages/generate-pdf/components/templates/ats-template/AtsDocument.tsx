import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { IPersonalDetail } from "../../../interface/generatePdfInterface";
import { mocks } from "../../../const/generatePdfConst";
import Divider from "../Divider";

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
        </View>
      </Page>
    </Document>
  );
};

const PersonalDetail = () => {
  const {
    jobTarget,
    photo,
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    postalCode,
    cityState,
    country,
    address,
  } = mocks.DEFAULT_PERSONAL_DETAIL;

  console.log({
    jobTarget,
    photo,
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    postalCode,
    cityState,
    country,
    address,
  });

  return (
    <>
      <View style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Text
          style={[styles.fontHeader, { fontWeight: "bold" }]}
        >{`${firstName} ${lastName}, ${jobTarget}`}</Text>
      </View>
      <View
        style={{
          marginTop: "8px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: "16px",
        }}
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
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "64px",
          marginTop: "8px",
          marginBottom: "16px",
        }}
      >
        <Text style={styles.fontSectionHeader}>PROFILE</Text>
        <Text style={styles.fontParagraph}>{profileSummary}</Text>
      </View>
      <Divider />
    </>
  );
};

export default AtsDocument;
