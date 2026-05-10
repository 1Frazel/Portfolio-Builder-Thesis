import { Text, View } from "@react-pdf/renderer";
import atsStyles from "./atsStyles";

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
        style={[atsStyles.fontParagraph, { width: "20%" }]}
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
          <Text style={atsStyles.fontParagraph}>{title}</Text>
          {address && <Text style={atsStyles.fontParagraph}>{address}</Text>}
        </View>
        {description && (
          <Text
            style={[atsStyles.fontDescriptionParagraph, { marginTop: "8px" }]}
          >
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
    <View style={[atsStyles.sectionMargin, { width: "100%" }]}>
      <Text style={[atsStyles.fontSectionHeader, { marginBottom: "8px" }]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

export { SectionDetails, SectionDetailsWrapper };
