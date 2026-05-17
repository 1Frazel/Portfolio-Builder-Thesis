import { StyleSheet } from "@react-pdf/renderer";

const atsStyles = StyleSheet.create({
  fontHeader: {
    fontSize: "13.5px",
    lineHeight: 1.2,
  },
  fontSectionHeader: {
    fontSize: "10px",
    letterSpacing: "1.3px",
    lineHeight: 1.1,
  },
  fontParagraph: {
    fontSize: "8.5px",
    lineHeight: 1.35,
  },
  fontDescriptionParagraph: {
    fontSize: "7.5px",
    lineHeight: 1.35,
  },
  sectionMargin: {
    marginTop: "10px",
    marginBottom: "12px",
  },
  page: {
    backgroundColor: "#ffffff",
    margin: 0,
    paddingTop: "30px",
    paddingHorizontal: "34px",
    paddingBottom: "28px",
  },
  section: {
    margin: 0,
    padding: 0,
  },
});

export default atsStyles;
