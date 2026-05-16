import { useNavigate } from "react-router";
import Header from "../../shared/components/Header";

interface Template {
  id: string;
  title: string;
  image: string;
}

const TemplateSelection = () => {
  const navigate = useNavigate();

  const templates: Template[] = [
    {
      id: "ats",
      title: "Classic ATS",
      image: "📄",
    },
    {
      id: "professional",
      title: "Professional",
      image: "💼",
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
            <button
              key={template.id}
              onClick={() => handleSelectTemplate(template.id)}
              className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              {/* Template Preview Area */}
              <div className="flex h-80 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50 text-6xl">
                {template.image}
              </div>

              {/* Template Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#2951A3]">
                  {template.title}
                </h3>
              </div>
            </button>
          ))}
        </div>

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
