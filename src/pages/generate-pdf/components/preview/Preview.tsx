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
}: {
  docs: JSX.Element;

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

  const previewClass = `shadow-lg flex 
  justify-center items-center rounded-[16px]
  h-fit w-fit`;

  return (
    <div className="h-full flex flex-col gap-[16px] basis-1/2 py-[16px] overflow-auto">
      <div className="flex justify-center items-center grow">
        <div className={previewClass}>
          <Document
            key={render.value}
            file={render.value}
            onLoadSuccess={onDocumentLoad}
          >
            <Page key={currentPage} pageNumber={currentPage} scale={1.25} />
          </Document>
        </div>
      </div>

      <PreviewNavigator
        currentPage={currentPage}
        pageAmount={pageAmount}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Preview;
