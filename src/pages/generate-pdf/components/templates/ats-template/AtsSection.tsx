import { Text, View } from "@react-pdf/renderer";
import atsStyles from "./atsStyles";
import React from "react";

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
          alignItems: "flex-start",
        },
      ]}
    >
      <Text
        style={[
          atsStyles.fontSectionHeader,
          { width: "22%", paddingRight: "8px" },
        ]}
      >
        {title}
      </Text>
      {children}
    </View>
  );
};

const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  /* react-pdf doesn't support grid: https://github.com/diegomura/react-pdf/issues/1207 */
  const items = React.Children.toArray(children);
  const rows: React.ReactNode[][] = [];

  for (let index = 0; index < items.length; index += 2) {
    rows.push(items.slice(index, index + 2));
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "78%",
      }}
    >
      {rows.map((row, rowIndex) => (
        <View
          key={`section-row-${rowIndex}`}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: "6px",
          }}
        >
          {row.map((item, itemIndex) => (
            <View
              key={`section-item-${rowIndex}-${itemIndex}`}
              style={{
                width: "50%",
                paddingRight: itemIndex === 0 ? "12px" : "0px",
              }}
            >
              {item}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const Section = ({ name, level }: { name: string; level: string }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={atsStyles.fontParagraph}>{name}</Text>
      <Text style={atsStyles.fontParagraph}>{level}</Text>
    </View>
  );
};

export { SectionWrapper, SectionContainer, Section };
