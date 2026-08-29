"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  actionLabel?: string;
  cancelLabel?: string;
  onAction?: () => void | Promise<void>;
  onCancel?: () => void;
};

type ToastContextValue = {
  toast: (toast: Omit<Toast, "id">) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  const api = useMemo(
    () => ({
      toast: (toast: Omit<Toast, "id">) => {
        const id = crypto.randomUUID();
        setToasts((prev) => [...prev, { id, ...toast }]);
        window.setTimeout(() => {
          dismiss(id);
        }, 3500);
        return id;
      },
      dismiss,
    }),
    []
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed right-4 top-4 z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "rounded-2xl border bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.16)]",
              toast.type === "success" && "border-emerald-200",
              toast.type === "error" && "border-red-200",
              (!toast.type || toast.type === "info") && "border-slate-200"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">{toast.title}</p>
                {toast.description && (
                  <p className="mt-1 text-sm text-slate-600">{toast.description}</p>
                )}
              </div>
              <button onClick={() => dismiss(toast.id)} className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700" aria-label="Dismiss toast">
                <X className="h-4 w-4" />
              </button>
            </div>
            {(toast.actionLabel || toast.cancelLabel) && (
              <div className="mt-4 flex justify-end gap-2">
                {toast.cancelLabel && (
                  <button
                    onClick={() => {
                      toast.onCancel?.();
                      dismiss(toast.id);
                    }}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    {toast.cancelLabel}
                  </button>
                )}
                {toast.actionLabel && (
                  <button
                    onClick={async () => {
                      await toast.onAction?.();
                      dismiss(toast.id);
                    }}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors",
                      toast.type === "error" ? "bg-red-600 hover:bg-red-700" : "bg-brand-primary hover:bg-brand-primary/90"
                    )}
                  >
                    {toast.actionLabel}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
