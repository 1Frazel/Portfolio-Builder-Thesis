import { pdf } from "@react-pdf/renderer";
import { useState, type JSX } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import type { DocumentCallback } from "react-pdf/src/shared/types.js";
import { useAsync } from "react-use";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Preview = ({ docs }: { docs: JSX.Element }) => {
  const [previousRenderValue, setPreviousRenderValue] = useState("");

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

  const isFirstRendering = !previousRenderValue;

  const isLatestValueRendered = previousRenderValue === render.value;
  const isBusy = render.loading || !isLatestValueRendered;

  const shouldShowPreviousDocument = !isFirstRendering && isBusy;

  return (
    <div className="flex justify-center items-center">
      {shouldShowPreviousDocument && previousRenderValue && (
        <Document
          key={`previous-${previousRenderValue}`}
          file={previousRenderValue}
          loading={null}
          className="opacity-50 shadow-md"
        >
          <Page key={currentPage} pageNumber={currentPage} />
        </Document>
      )}

      <Document
        key={render.value}
        file={render.value}
        loading={null}
        onLoadSuccess={onDocumentLoad}
        className={`${shouldShowPreviousDocument ? "absolute opacity-0" : "shadow-md"}`}
      >
        <Page
          key={currentPage}
          pageNumber={currentPage}
          onRenderSuccess={() => setPreviousRenderValue(render.value ?? "")}
        />
      </Document>
    </div>
  );
};

export default Preview;
