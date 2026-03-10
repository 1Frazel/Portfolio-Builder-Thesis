import { usePDF } from "@react-pdf/renderer";
import { type JSX } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Preview = ({ documentElement }: { documentElement: JSX.Element }) => {
  const [instance] = usePDF({ document: documentElement });

  return (
    <Document file={instance.url}>
      <Page pageNumber={1} />
    </Document>
  );
};

export default Preview;
