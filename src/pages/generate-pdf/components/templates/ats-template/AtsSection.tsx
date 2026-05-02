import { Text, View } from "@react-pdf/renderer";
import atsStyles from "./atsStyles";

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
        atsStyles.sectionMargin,
        {
          display: "flex",
          flexDirection: "row",
          width: "100%",
        },
      ]}
    >
      <Text style={[atsStyles.fontSectionHeader, { width: "20%" }]}>
        {title}
      </Text>
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
      <Text style={atsStyles.fontParagraph}>{name}</Text>
      <Text style={atsStyles.fontParagraph}>{level}</Text>
    </View>
  );
};

export { SectionWrapper, SectionContainer, Section };
