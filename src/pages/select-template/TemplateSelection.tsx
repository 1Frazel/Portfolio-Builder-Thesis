import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../shared/components/Header";
import atsPreviewImage from "../../assets/ats.png";
import professionalPreviewImage from "../../assets/professional.png";

interface Template {
  id: string;
  title: string;
  previewImage: string;
  description: string;
  modalDesc: string;
}

const TemplateSelection = () => {
  const navigate = useNavigate();
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const templates: Template[] = [
    {
      id: "ats",
      title: "Classic ATS",
      previewImage: atsPreviewImage,
      description:
        "A clean and straightforward resume layout designed for maximum ATS readability. This template uses a single-column structure, minimal styling, and clear section hierarchy to ensure all information is easily parsed by applicant tracking systems. Ideal for users who prioritize compatibility and simplicity.",
      modalDesc: "Clean, compact, and optimized for ATS parsing.",
    },
    {
      id: "professional",
      title: "Professional",
      previewImage: professionalPreviewImage,
      description:
        "A modern and visually structured resume with a customizable color accent to enhance readability and personal branding. While maintaining ATS compatibility, this template introduces a sidebar layout to organize key information such as skills and contact details more effectively. Suitable for users who want a balance between professionalism and visual appeal.",
      modalDesc: "A polished two-column layout with a sidebar profile.",
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
            Select a Resume Template
          </h1>
          <p className="mt-2 text-slate-600">
            Choose a template to start creating your resume
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

                <div className="mt-auto flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(template)}
                    className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#2951A3] hover:text-[#2951A3]"
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectTemplate(template.id)}
                    className="flex-1 rounded-md bg-[#2951A3] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f3f82]"
                  >
                    Select Template
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
                    {previewTemplate.title} Preview
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
                  Close
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
            ← Back to My Resumes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
