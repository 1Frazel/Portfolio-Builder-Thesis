import React from "react";
import { Text, View, Link } from "@react-pdf/renderer";
import atsStyles from "./atsStyles";
import { normalizeUrl } from "../../../../../shared/utils/urlUtils";

const SectionDetails = ({
  startAt,
  endsAt,
  title,
  address,
  description,
  url,
}: {
  startAt: string;
  endsAt: string;
  title: string;
  address?: string;
  description?: string;
  url?: string;
}) => {
  const hasAddress = Boolean(address?.trim());
  const hasDescription = Boolean(description?.trim());
  const hasUrl = Boolean(url?.trim());

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
            {hasUrl ? (
              <Link
                src={normalizeUrl(url)}
                href={normalizeUrl(url)}
                style={{ color: "#000000", textDecoration: "underline" }}
              >
                <Text hyphenationCallback={(word) => [word]}>{title}</Text>
              </Link>
            ) : (
              title
            )}
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
