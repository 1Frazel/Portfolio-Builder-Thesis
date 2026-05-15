import { pdf } from "@react-pdf/renderer";
import { useState, useEffect, type JSX } from "react";
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
  const [viewportWidth, setViewportWidth] = useState(() => {
    if (typeof window === "undefined") return 1024;
    return window.innerWidth;
  });

  const calculateScale = (width: number): number => {
    if (width < 400) return 0.55;
    if (width < 600) return 0.4 + ((width - 400) / 200) * 0.15;
    if (width < 768) return 0.5 + ((width - 600) / 168) * 0.2;
    if (width < 1024) return 0.55 + ((width - 768) / 256) * 0.3;
    if (width < 1100) return 0.6 + ((width - 1024) / 76) * 0.04;
    if (width < 1180) return 0.7 + ((width - 1100) / 80) * 0.04;
    if (width < 1280) return 0.8 + ((width - 1180) / 100) * 0.04;
    if (width < 1360) return 0.85 + ((width - 1280) / 80) * 0.05; // 1.25 to 1.30
    if (width < 1480) return 0.9 + ((width - 1360) / 120) * 0.05; // 1.30 to 1.35
    return 1.25;
  };

  const scale = calculateScale(viewportWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  justify-center items-center
  h-fit w-fit`;

  return (
    <div className="h-full flex flex-col gap-[16px] py-[16px] overflow-auto w-full">
      <div className="flex justify-center items-center grow min-h-0">
        <div className={previewClass}>
          <Document
            key={render.value}
            file={render.value}
            onLoadSuccess={onDocumentLoad}
            loading={null}
          >
            <Page
              key={currentPage}
              pageNumber={currentPage}
              scale={scale}
              loading={null}
            />
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
