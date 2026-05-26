import { StyleSheet } from "@react-pdf/renderer";

const professionalStyles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    margin: 0,
    paddingTop: "46px",
    paddingRight: "42px",
    paddingBottom: "42px",
    paddingLeft: 0,
  },
  sidebar: {
    width: "31%",
    backgroundColor: "#0f5a4e",
    color: "#ffffff",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    paddingTop: "48px",
    paddingRight: "28px",
    paddingBottom: "48px",
    paddingLeft: "28px",
  },
  content: {
    marginLeft: "31%",
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: "34px",
  },
  name: {
    fontSize: "18px",
    lineHeight: 1.1,
    fontWeight: 700,
    textAlign: "center",
  },
  photoWrapper: {
    marginBottom: "14px",
  },
  photo: {
    width: "120px",
    height: "120px",
    borderRadius: "60px",
    objectFit: "cover",
    alignSelf: "center",
  },
  jobTarget: {
    fontSize: "6.5px",
    lineHeight: 1.35,
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginTop: "14px",
  },
  sidebarHeading: {
    fontSize: "13px",
    lineHeight: 1.2,
    fontWeight: 700,
    marginTop: "28px",
    marginBottom: "12px",
  },
  detailText: {
    fontSize: "8.5px",
    lineHeight: 1.45,
    marginBottom: "6px",
  },
  linkText: {
    fontSize: "8.5px",
    lineHeight: 1.45,
    marginBottom: "6px",
    textDecoration: "underline",
  },
  sectionTitle: {
    fontSize: "14px",
    lineHeight: 1.15,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  sectionBlock: {
    marginBottom: "24px",
  },
  dateText: {
    fontSize: "8px",
    lineHeight: 1.2,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#8f969c",
    marginTop: "4px",
    marginBottom: "7px",
  },
  roleText: {
    fontSize: "10.5px",
    lineHeight: 1.25,
    fontWeight: 600,
    marginBottom: "5px",
  },
  locationText: {
    fontSize: "8.5px",
    lineHeight: 1.25,
    color: "#111111",
  },
  paragraph: {
    fontSize: "8.5px",
    lineHeight: 1.45,
  },
  oneColumnList: {
    display: "flex",
    flexDirection: "column",
  },
  oneColumnItem: {
    width: "100%",
    marginBottom: "8px",
  },
  twoColumnList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  twoColumnItem: {
    width: "50%",
    marginBottom: "8px",
    paddingRight: "10px",
  },
  skillRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  skillName: {
    fontSize: "8.5px",
    lineHeight: 1.25,
    width: "66%",
  },
  skillLevel: {
    fontSize: "8.5px",
    lineHeight: 1.25,
    width: "34%",
    textAlign: "right",
  },
  sidebarDivider: {
    width: "100%",
    height: "1px",
    backgroundColor: "rgba(255,255,255,0.18)",
    marginTop: "10px",
    marginBottom: "10px",
  },
  contentDivider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#111111",
    marginTop: "10px",
    marginBottom: "14px",
  },
  sectionRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-start",
  },
  sectionDate: {
    width: "18%",
    paddingRight: "10px",
  },
  sectionBody: {
    width: "82%",
  },
  sectionHeaderRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
});

export default professionalStyles;
