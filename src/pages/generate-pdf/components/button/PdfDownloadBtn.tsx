import { PDFDownloadLink } from "@react-pdf/renderer";
import type { JSX } from "react";

const PdfDownloadBtn = ({
  filename,
  docs,
}: {
  filename: string;
  docs: JSX.Element;
}) => {
  return (
    <button className="border px-[8px] py-[4px] rounded-[4px]">
      <PDFDownloadLink document={docs} fileName={filename}>
        {({ loading }) => (loading ? "Loading Document" : "Download CV")}
      </PDFDownloadLink>
    </button>
  );
};

export default PdfDownloadBtn;
