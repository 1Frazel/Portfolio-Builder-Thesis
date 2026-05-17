import { pdf } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import type { JSX } from "react";
import { useNavigate } from "react-router";
import { useToast } from "../../../../shared/hooks/useToast";
import { saveCV } from "../../../../shared/utils/cvService";
import type { FormData } from "../../../../shared/hooks/useFormData";

const PdfDownloadBtn = ({
  filename,
  docs,
  className = "",
  formData,
  template,
  resumeId,
  initialTitle = "",
}: {
  filename: string;
  docs: JSX.Element;
  className?: string;
  formData?: FormData;
  template: string;
  resumeId?: string;
  initialTitle?: string;
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const handleSaveAndDownload = async () => {
    if (!formData) {
      showToast("Form data unavailable", "error");
      return;
    }

    if (!title.trim()) {
      showToast("Please enter a CV title", "warning");
      return;
    }

    try {
      setIsSaving(true);
      await saveCV(title, template, formData, resumeId);

      // generate PDF blob and trigger download
      const blob = await pdf(docs).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      showToast("Resume saved successfully!", "success");
      setIsOpen(false);
      navigate("/creation");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save resume";
      showToast(message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex min-h-10 w-full items-center justify-center rounded-md bg-[#3057b5] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#274a9f] focus:outline-none focus:ring-2 focus:ring-[#3057b5]/30 sm:w-auto sm:min-w-[196px] ${className}`}
      >
        Finish Your Resume
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-[90vw]">
        <h2 className="text-lg font-bold mb-4">Save Your Resume</h2>

        <input
          type="text"
          placeholder="e.g., Software Engineer Resume"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          disabled={isSaving}
        />

        <div className="flex gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={isSaving}
          >
            Cancel
          </button>

          <button
            onClick={handleSaveAndDownload}
            className="flex-1 px-4 py-2 bg-[#3057b5] text-white rounded-md hover:bg-[#274a9f]"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfDownloadBtn;
