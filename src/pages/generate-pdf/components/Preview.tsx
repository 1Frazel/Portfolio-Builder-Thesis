import { pdf } from "@react-pdf/renderer";
import { useState, type JSX } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import type { DocumentCallback } from "react-pdf/src/shared/types.js";
import { useAsync } from "react-use";
import PreviewNavigator from "./PreviewNavigator";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Preview = ({
  docs,
  widthClass = "",
  heightClass = "",
}: {
  docs: JSX.Element;
  widthClass: string;
  heightClass: string;
  customClass?: string;
}) => {
  const [pageAmount, setPageAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const render = useAsync(async () => {
    const blob = await pdf(docs).toBlob();
    const url = URL.createObjectURL(blob);

    return url;
  }, [docs]);

  const onDocumentLoad = (document: DocumentCallback) => {
    setPageAmount(document.numPages);
    setCurrentPage((prev) => Math.min(prev, document.numPages));
  };

  const previewClass = `shadow-md flex 
  justify-center items-center rounded-md
  ${widthClass} ${heightClass}`;

  return (
    <>
      <div className="flex justify-center items-center">
        <div className={previewClass}>
          <Document
            key={render.value}
            file={render.value}
            onLoadSuccess={onDocumentLoad}
          >
            <Page key={currentPage} pageNumber={currentPage} />
          </Document>
        </div>
      </div>

      <PreviewNavigator
        currentPage={currentPage}
        pageAmount={pageAmount}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Preview;
