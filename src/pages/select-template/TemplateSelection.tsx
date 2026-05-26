import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../shared/components/Header";
import atsPreviewImage from "../../assets/ats.png";
import professionalPreviewImage from "../../assets/professional.png";
import { useTranslation } from "react-i18next";

interface Template {
  id: string;
  title: string;
  previewImage: string;
  description: string;
  disclaimer: string;
  modalDesc: string;
}

const TemplateSelection = () => {
  const navigate = useNavigate();
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const { t } = useTranslation("creationPage");

  const templates: Template[] = [
    {
      id: "ats",
      title: "Classic ATS",
      previewImage: atsPreviewImage,
      description: t("templateSelection.template.ats.description"),
      disclaimer: t("templateSelection.template.ats.disclaimer"),
      modalDesc: t("templateSelection.template.ats.modalDesc"),
    },
    {
      id: "professional",
      title: "Professional",
      previewImage: professionalPreviewImage,
      description: t("templateSelection.template.professional.description"),
      disclaimer: t("templateSelection.template.professional.disclaimer"),
      modalDesc: t("templateSelection.template.professional.modalDesc"),
    },
  ];

  const handleSelectTemplate = (templateId: string) => {
    navigate(`/creation/edit?template=${templateId}`);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {t("templateSelection.title", "Choose Your Template")}
          </h1>
          <p className="mt-2 text-slate-600">
            {t("templateSelection.description", "Choose a template to start creating your resume")}
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              {/* Template Preview Area */}
              <div className="flex h-80 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50 p-4">
                <img
                  src={template.previewImage}
                  alt={`${template.title} template preview`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Template Info */}
              <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#2951A3]">
                  {template.title}
                </h3>
                <p className="text-sm text-slate-600">{template.description}</p>
                {template.id === "professional" && template.disclaimer && (
                  <div className="text-xs text-amber-600">
                    {template.disclaimer}
                  </div>
                )}

                <div className="mt-auto flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(template)}
                    className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#2951A3] hover:text-[#2951A3]"
                  >
                    {t("templateSelection.previewButton", "Preview")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectTemplate(template.id)}
                    className="flex-1 rounded-md bg-[#2951A3] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f3f82]"
                  >
                    {t("templateSelection.selectButton", "Select Template")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {previewTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {previewTemplate.title} {t("templateSelection.preview", "Preview")}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {previewTemplate.modalDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="rounded-full px-3 py-1 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {t("templateSelection.close", "Close")}
                </button>
              </div>

              <div className="max-h-[80vh] overflow-auto bg-slate-100 p-4">
                <img
                  src={previewTemplate.previewImage}
                  alt={`${previewTemplate.title} preview`}
                  className="mx-auto h-auto w-full max-w-4xl rounded-lg bg-white shadow-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/creation")}
            className="text-slate-600 transition hover:text-[#2951A3]"
          >
            {t("templateSelection.backButton", "← Back to My Resumes")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
