import * as pdfjsLib from "pdfjs-dist";

// https://github.com/wojtekmaj/react-pdf/blob/main/packages/react-pdf/README.md#configure-pdfjs-worker
// https://stackoverflow.com/a/63486898/7699841
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const extractTextFromPdf = async (
  pdfDocument: pdfjsLib.PDFDocumentProxy,
): Promise<string> => {
  let fullText = "";

  for (let pageIndex = 1; pageIndex <= pdfDocument.numPages; pageIndex++) {
    try {
      const page = await pdfDocument.getPage(pageIndex);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ");
      fullText += `${pageText}\n`;
    } catch (error) {
      console.warn(`Unable to extract text from page ${pageIndex}:`, error);
    }
  }

  return fullText;
};

const checkCv = async (fileUrl: string) => {
  const pdfDocument = await pdfjsLib.getDocument(fileUrl).promise;
  const rawText = await extractTextFromPdf(pdfDocument);

  return {
    rawText,
  };
};

export default checkCv;
