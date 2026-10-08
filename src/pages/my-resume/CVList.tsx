import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../shared/components/Header";
import { useToast } from "../../shared/hooks/useToast";
import { deleteCV, getUserCVs, saveCV } from "../../shared/utils/cvService";
import type { CVDocument } from "../../shared/utils/cvService";
import PreviewDownloadBtn from "./PreviewDownloadBtn";
import { useTranslation } from "react-i18next";

const CVList = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [createdCVs, setCreatedCVs] = useState<CVDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);
  const [duplicateTargetId, setDuplicateTargetId] = useState<string | null>(
    null,
  );
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

  const isDuplicating = duplicatingId !== null;
  const duplicateTarget =
    createdCVs.find((cv) => cv.resumeId === duplicateTargetId) ?? null;

  const closeDuplicateModal = () => {
    if (isDuplicating) return; // don't dismiss while the request is in flight
    setDuplicateTargetId(null);
  };

  useEffect(() => {
    if (!duplicateTargetId) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isDuplicating) setDuplicateTargetId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [duplicateTargetId, isDuplicating]);

  const handleDuplicateCV = async (cvId: string) => {
    if (isDuplicating) return;

    const cv = createdCVs.find((item) => item.resumeId === cvId);
    if (!cv) return;

    try {
      setDuplicatingId(cvId);
      const newTitle = `${cv.title}${t("main.cvList.copySuffix")}`;
      await saveCV(newTitle, cv.template, cv.data);

      // Re-fetch so the new doc has real server timestamps and sorts to the top
      const cvs = await getUserCVs();
      setCreatedCVs(cvs);
      showToast(t("main.cvList.resumeDuplicated"), "success");
    } catch (err) {
      console.error(err);
      showToast(t("main.cvList.failedToDuplicate"), "error");
    } finally {
      setDuplicatingId(null);
      setDuplicateTargetId(null);
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
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-slate-900">{cv.title}</h3>
                    <button
                      type="button"
                      onClick={() => setDuplicateTargetId(cv.resumeId)}
                      disabled={isDuplicating}
                      title={t("main.cvList.duplicateButton")}
                      aria-label={t("main.cvList.duplicateButton")}
                      className={`-mr-2 -mt-1 shrink-0 rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-[#2951A3] disabled:cursor-not-allowed disabled:opacity-50 ${
                        duplicatingId === cv.resumeId ? "animate-pulse" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </button>
                  </div>
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
                  className="mt-3 w-full rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
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

      {/* Duplicate confirmation modal */}
      {duplicateTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeDuplicateModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="duplicate-modal-title"
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="duplicate-modal-title"
              className="text-lg font-semibold text-slate-900"
            >
              {t("main.cvList.confirmDuplicateTitle")}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {t("main.cvList.confirmDuplicate", {
                title: duplicateTarget.title,
                interpolation: { escapeValue: false },
              })}
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeDuplicateModal}
                disabled={isDuplicating}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("main.cvList.cancelButton")}
              </button>
              <button
                type="button"
                onClick={() => handleDuplicateCV(duplicateTarget.resumeId)}
                disabled={isDuplicating}
                className="rounded-md bg-[#2951A3] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#274a9f] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDuplicating
                  ? t("main.cvList.duplicating")
                  : t("main.cvList.duplicateButton")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVList;
