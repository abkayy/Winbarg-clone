"use client";

import { useState } from "react";
import useSWR from "swr";
import { getContactMessages, markMessageAsRead, deleteMessage } from "@/services/contactService";
import { ContactMessage } from "@/types";
import { Button } from "@/components/ui/button";
import { LogoLoader } from "@/components/shared/LogoLoader";
import { Trash2, CheckCircle, Mail } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function AdminMessagesPage() {
  const { data: messages = [], isLoading, mutate } = useSWR("messages", getContactMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const { toast } = useToast();

  const handleMarkAsRead = async (id: string) => {
    try {
      await markMessageAsRead(id);
      const nextMessages = messages.map((m) => (m.id === id ? { ...m, read: true } : m));
      mutate(nextMessages, false);
      setSelectedMessage((current) => (current?.id === id ? { ...current, read: true } : current));
      toast({
        title: "Message marked as read",
        description: "The inbox item was updated successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Error marking message as read:", error);
      toast({
        title: "Could not update message",
        description: "Please try again.",
        type: "error",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMessage(id);
      mutate(messages.filter(m => m.id !== id), false);
      if (selectedMessage?.id === id) setSelectedMessage(null);
      toast({
        title: "Message deleted",
        description: "The message was removed from the inbox.",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Could not delete message",
        description: "Please try again.",
        type: "error",
      });
    }
  };

  const formatDate = (timestamp: unknown) => {
    if (!timestamp) return "";
    const maybeTimestamp = timestamp as { toDate?: () => Date };
    const date = maybeTimestamp.toDate ? maybeTimestamp.toDate() : new Date(timestamp as string | number | Date);
    return new Intl.DateTimeFormat("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"
    }).format(date);
  };

  return (
    <div className="space-y-6 flex flex-col gap-6 md:flex-row md:h-[calc(100vh-120px)] md:overflow-hidden">
      
      {/* Messages List */}
      <div className="w-full md:w-1/3 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden shrink-0 min-h-0">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
          <h2 className="font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Inbox</h2>
          <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-1 rounded-full">
            {messages.length} Total
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 flex justify-center"><LogoLoader /></div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center text-slate-500 flex flex-col items-center gap-2">
              <Mail className="w-8 h-8 text-slate-300" />
              <p>No messages yet.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 text-left border-b border-slate-100 hover:bg-slate-50 transition-colors flex flex-col gap-1 ${
                    selectedMessage?.id === msg.id ? "bg-slate-50 border-l-4 border-l-brand-primary" : "border-l-4 border-l-transparent"
                  } ${!msg.read ? "bg-blue-50/50" : ""}`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className={`font-semibold font-['Plus_Jakarta_Sans'] truncate ${!msg.read ? "text-slate-900" : "text-slate-700"}`}>
                      {msg.fullName}
                    </span>
                    <span className="text-xs text-slate-500 whitespace-nowrap">{formatDate(msg.createdAt)}</span>
                  </div>
                  <span className="text-sm text-slate-600 truncate">{msg.projectType} • {msg.budget}</span>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1">{msg.messageDetails}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message Viewer */}
      <div className="w-full md:w-2/3 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-0">
        {selectedMessage ? (
          <>
            <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start shrink-0">
              <div className="flex flex-col gap-1 min-w-0">
                <h3 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">{selectedMessage.fullName}</h3>
                <a href={`mailto:${selectedMessage.email}`} className="text-brand-primary hover:underline text-sm">
                  {selectedMessage.email}
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {!selectedMessage.read && (
                  <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(selectedMessage.id)} className="text-slate-600">
                    <CheckCircle className="w-4 h-4 mr-2" /> Mark Read
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => handleDelete(selectedMessage.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
              </div>
            </div>
            <div className="p-6 flex-1 overflow-y-auto bg-slate-50">
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-wrap gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Type</span>
                    <span className="font-medium text-slate-900">{selectedMessage.projectType || "N/A"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimated Budget</span>
                    <span className="font-medium text-slate-900">{selectedMessage.budget || "N/A"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Received On</span>
                    <span className="font-medium text-slate-900">{formatDate(selectedMessage.createdAt)}</span>
                  </div>
                </div>
                
                <div className="border-t border-slate-100 pt-6">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Message</span>
                  <div className="text-slate-700 whitespace-pre-wrap leading-relaxed font-['Plus_Jakarta_Sans']">
                    {selectedMessage.messageDetails}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
            <Mail className="w-16 h-16 opacity-20" />
            <p className="font-medium">Select a message to view details</p>
          </div>
        )}
      </div>

    </div>
  );
}
