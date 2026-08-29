"use client";

import useSWR from "swr";
import { getSubscribers, deleteSubscriber, Subscriber } from "@/services/subscriberService";
import { LogoLoader } from "@/components/shared/LogoLoader";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, Download } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function AdminSubscribersPage() {
  const { data: subscribers = [], isLoading, mutate } = useSWR("subscribers", getSubscribers);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    toast({
      title: "Remove subscriber?",
      description: "This action cannot be undone.",
      type: "info",
      cancelLabel: "Cancel",
      actionLabel: "Delete",
      onAction: async () => {
        try {
          await deleteSubscriber(id);
          mutate(subscribers.filter((s) => s.id !== id), false);
          toast({ title: "Subscriber deleted", type: "success" });
        } catch (error) {
          console.error("Error deleting subscriber:", error);
          toast({ title: "Delete failed", description: "Please try again.", type: "error" });
        }
      },
    });
  };

  const formatDate = (timestamp: unknown) => {
    if (!timestamp) return "N/A";
    const maybeTimestamp = timestamp as { toDate?: () => Date };
    const date = maybeTimestamp.toDate
      ? maybeTimestamp.toDate()
      : new Date(timestamp as string | number | Date);

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handleExportCSV = () => {
    const header = "Email,Subscribed At\n";
    const rows = subscribers.map((s) => {
      const date = formatDate(s.createdAt);
      return `${s.email},${date}`;
    });
    const csv = header + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "winbarg-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Newsletter Subscribers</h1>
          <p className="text-slate-500 text-sm mt-1">{subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""} total</p>
        </div>
        <Button
          onClick={handleExportCSV}
          disabled={subscribers.length === 0}
          className="bg-[#1A3D7C] hover:bg-[#15305F] text-white flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><LogoLoader /></div>
        ) : subscribers.length === 0 ? (
          <div className="p-12 flex flex-col items-center gap-3 text-slate-400">
            <Mail className="w-12 h-12 opacity-20" />
            <p className="font-medium text-slate-500">No subscribers yet.</p>
            <p className="text-sm text-slate-400">People who sign up via the footer newsletter form will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500">
                  <th className="p-4">#</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Subscribed On</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber, i) => (
                  <tr key={subscriber.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-slate-400 text-sm font-medium">{i + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <a
                          href={`mailto:${subscriber.email}`}
                          className="font-medium text-slate-900 hover:text-brand-primary transition-colors"
                        >
                          {subscriber.email}
                        </a>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 text-sm">{formatDate(subscriber.createdAt)}</td>
                    <td className="p-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(subscriber.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
