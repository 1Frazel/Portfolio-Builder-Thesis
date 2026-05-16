import { useState, type ReactNode } from "react";
import { ToastContext, type Toast } from "./useToast";

const typeConfig: Record<
  NonNullable<Toast["type"]>,
  { color: string; title: string }
> = {
  success: { color: "#10B981", title: "Success" },
  error: { color: "#EF4444", title: "Error" },
  info: { color: "#3B82F6", title: "Info" },
  warning: { color: "#F59E0B", title: "Warning" },
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: string) => {
    setToasts((s) => s.filter((t) => t.id !== id));
  };

  const showToast = (message: string, type: Toast["type"] = "info") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const t: Toast = { id, message, type };
    setToasts((s) => [...s, t]);
    // auto-dismiss
    setTimeout(() => removeToast(id), 5000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
        {toasts.map((t) => {
          const cfg = typeConfig[t.type ?? "info"];
          return (
            <div
              key={t.id}
              className="flex items-start bg-white rounded-lg shadow-md overflow-hidden max-w-[360px] w-full"
              role="status"
              aria-live="polite"
            >
              <div style={{ backgroundColor: cfg.color }} className="w-2" />
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-full"
                      style={{ backgroundColor: `${cfg.color}20` }}
                    >
                      {t.type === "success" && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke={cfg.color}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {t.type === "error" && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 6L6 18M6 6l12 12"
                            stroke={cfg.color}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {t.type === "info" && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke={cfg.color}
                            strokeWidth="2"
                          />
                          <path
                            d="M12 8h.01M11 12h1v4h1"
                            stroke={cfg.color}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {t.type === "warning" && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                            stroke={cfg.color}
                            strokeWidth="0"
                            fill={cfg.color}
                          />
                          <path
                            d="M12 9v4"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 17h.01"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">
                        {cfg.title}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {t.message}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeToast(t.id)}
                    className="text-gray-400 hover:text-gray-600 ml-2"
                    aria-label="Close"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="#6B7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContext;
