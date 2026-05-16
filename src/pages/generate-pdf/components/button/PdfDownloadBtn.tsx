import { PDFDownloadLink } from "@react-pdf/renderer";
import type { JSX } from "react";

const PdfDownloadBtn = ({
  filename,
  docs,
  className = "",
}: {
  filename: string;
  docs: JSX.Element;
  className?: string;
}) => {
  return (
    <PDFDownloadLink document={docs} fileName={filename}>
      {({ loading }) => (
        <span
          className={`inline-flex min-h-10 w-full items-center justify-center rounded-md bg-[#3057b5] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#274a9f] focus:outline-none focus:ring-2 focus:ring-[#3057b5]/30 sm:w-auto sm:min-w-[196px] ${className}`}
        >
          {loading ? "Preparing PDF..." : "Finish Your Resume"}
        </span>
      )}
    </PDFDownloadLink>
  );
};

export default PdfDownloadBtn;
