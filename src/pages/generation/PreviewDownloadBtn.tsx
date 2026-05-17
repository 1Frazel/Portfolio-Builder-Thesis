import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { useToast } from "../../shared/hooks/useToast";
import type { CVDocument } from "../../shared/utils/cvService";
import { buildTemplateDocument } from "../../shared/utils/templateDocument";

const PreviewDownloadBtn = ({ cv }: { cv: CVDocument }) => {
  const { showToast } = useToast();
  const [isPreparing, setIsPreparing] = useState(false);

  const handleClick = async () => {
    if (isPreparing) return;
    setIsPreparing(true);

    try {
      const doc = buildTemplateDocument(cv.template, cv.data);

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);

      // Open in new tab
      window.open(url, "_blank");

      // Trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(cv.title || "resume").replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Revoke URL after a while
      setTimeout(() => URL.revokeObjectURL(url), 20000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to prepare preview";
      showToast(message, "error");
    } finally {
      setIsPreparing(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex-1 rounded-md border border-[#2951A3] px-4 py-2 text-sm font-semibold text-[#2951A3] transition hover:bg-[#eef3ff]"
      disabled={isPreparing}
    >
      {isPreparing ? "Preparing..." : "Preview"}
    </button>
  );
};

export default PreviewDownloadBtn;
