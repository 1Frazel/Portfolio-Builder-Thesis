import { createContext, useContext } from "react";

export type Toast = {
  id: string;
  message: string;
  type?: "info" | "error" | "success" | "warning";
};

type ToastContextType = {
  showToast: (message: string, type?: Toast["type"]) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
