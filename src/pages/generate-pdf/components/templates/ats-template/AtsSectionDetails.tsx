import React from "react";
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
  const hasAddress = Boolean(address?.trim());
  const hasDescription = Boolean(description?.trim());

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "flex-start",
      }}
    >
      <Text
        style={[atsStyles.fontParagraph, { width: "22%", paddingRight: "8px" }]}
      >
        {`${startAt} — ${endsAt}`}
      </Text>
      <View style={{ width: "78%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Text style={[atsStyles.fontParagraph, { width: "68%" }]}>
            {title}
          </Text>
          {hasAddress && (
            <Text
              style={[
                atsStyles.fontParagraph,
                { width: "30%", textAlign: "right" },
              ]}
            >
              {address}
            </Text>
          )}
        </View>
        {hasDescription && (
          <Text
            style={[atsStyles.fontDescriptionParagraph, { marginTop: "5px" }]}
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
      <Text style={[atsStyles.fontSectionHeader, { marginBottom: "6px" }]}>
        {title}
      </Text>
      <View style={{ display: "flex", flexDirection: "column" }}>
        {React.Children.map(children, (child) => (
          <View style={{ marginBottom: "10px", marginRight: "16px" }}>
            {child}
          </View>
        ))}
      </View>
    </View>
  );
};

export { SectionDetails, SectionDetailsWrapper };
