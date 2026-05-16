import { useNavigate } from "react-router";
import Header from "../../shared/components/Header";

interface CV {
  id: string;
  title: string;
  template: string;
  lastModified: string;
}

const CVList = () => {
  const navigate = useNavigate();

  // Dummy data for created CVs
  const createdCVs: CV[] = [
    {
      id: "1",
      title: "Software Engineer Resume",
      template: "Classic ATS",
      lastModified: "May 15, 2026",
    },
    {
      id: "2",
      title: "Product Manager CV",
      template: "Professional",
      lastModified: "May 10, 2026",
    },
    {
      id: "3",
      title: "Data Scientist Resume",
      template: "Classic ATS",
      lastModified: "May 8, 2026",
    },
  ];

  const handleCreateNew = () => {
    navigate("/creation/template-selection");
  };

  const handleEditCV = (cvId: string) => {
    navigate(`/creation/edit/${cvId}`);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Resumes</h1>
          <p className="mt-2 text-slate-600">
            Create and manage your professional resumes
          </p>
        </div>

        {/* Create New CV Button */}
        <div className="mb-8">
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2951A3] px-6 py-3 font-semibold text-white transition hover:bg-[#274a9f]"
          >
            <span className="text-xl">+</span>
            Create New Resume
          </button>
        </div>

        {/* Created CVs Grid */}
        {createdCVs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {createdCVs.map((cv) => (
              <div
                key={cv.id}
                className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex-1">
                  <h3 className="font-semibold text-slate-900">{cv.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Template: {cv.template}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Last modified: {cv.lastModified}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCV(cv.id)}
                    className="flex-1 rounded-md bg-[#2951A3] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#274a9f]"
                  >
                    Edit
                  </button>
                  <button className="flex-1 rounded-md border border-[#2951A3] px-4 py-2 text-sm font-semibold text-[#2951A3] transition hover:bg-[#eef3ff]">
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <p className="text-slate-600">
              No resumes created yet. Click "Create New Resume" to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVList;
