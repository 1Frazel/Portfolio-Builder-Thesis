import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../shared/components/Header";
import { useToast } from "../../shared/hooks/useToast";
import { deleteCV, getUserCVs } from "../../shared/utils/cvService";
import type { CVDocument } from "../../shared/utils/cvService";
import PreviewDownloadBtn from "./PreviewDownloadBtn";
import { useTranslation } from "react-i18next";

const CVList = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [createdCVs, setCreatedCVs] = useState<CVDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation("creationPage");

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        setIsLoading(true);
        const cvs = await getUserCVs();
        setCreatedCVs(cvs);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : t("main.cvList.failedToLoad");
        showToast(message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCVs();
  }, [showToast]);

  const handleCreateNew = () => {
    navigate("/creation/template-selection");
  };

  const handleEditCV = (cvId: string) => {
    navigate(`/creation/edit/${cvId}`);
  };

  const handleDeleteCV = async (cvId: string) => {
    const shouldDelete = window.confirm(t("main.cvList.confirmDelete"));
    if (!shouldDelete) return;

    try {
      await deleteCV(cvId);
      setCreatedCVs((prev) => prev.filter((cv) => cv.resumeId !== cvId));
      showToast(t("main.cvList.resumeDeleted"), "success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t("main.cvList.failedToDelete");
      showToast(message, "error");
    }
  };

  const formatDate = (timestamp: CVDocument["updatedAt"]) =>
    new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(timestamp.toDate());

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">{t("main.title")}</h1>
          <p className="mt-2 text-slate-600">
            {t("main.description")}
          </p>
        </div>

        {/* Create New CV Button */}
        <div className="mb-8">
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2951A3] px-6 py-3 font-semibold text-white transition hover:bg-[#274a9f]"
          >
            <span className="text-xl">+</span>
            {t("main.createButton")}
          </button>
        </div>

        {isLoading ? (
          <div className="rounded-lg border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-slate-600">{t("main.loading")}</p>
          </div>
        ) : createdCVs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {createdCVs.map((cv) => (
              <div
                key={cv.resumeId}
                className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex-1">
                  <h3 className="font-semibold text-slate-900">{cv.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Template: {cv.template}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    {t("main.cvList.lastModified")} : {formatDate(cv.updatedAt)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCV(cv.resumeId)}
                    className="flex-1 rounded-md bg-[#2951A3] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#274a9f]"
                  >
                    {t("main.cvList.editButton")}
                  </button>
                  <PreviewDownloadBtn cv={cv} />
                </div>
                <button
                  onClick={() => handleDeleteCV(cv.resumeId)}
                  className="mt-3 rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  {t("main.cvList.deleteButton")}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <p className="text-slate-600">
              {t("main.empty")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVList;
