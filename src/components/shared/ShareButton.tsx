"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareButtonProps {
  title: string;
  url?: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");

    // Use native share sheet if supported
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch {
        // User cancelled or API unavailable — fall through to clipboard
      }
    }

    // Fallback: copy link to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.warn("Clipboard write failed");
    }
  };

  return (
    <button
      onClick={handleShare}
      title={copied ? "Link copied!" : "Share this article"}
      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-semibold font-['Plus_Jakarta_Sans'] transition-all duration-200 ${
        copied
          ? "bg-green-50 border-green-300 text-green-700"
          : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-[#1A3D7C] hover:border-[#1A3D7C] hover:text-white"
      }`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Link copied!
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          Share
        </>
      )}
    </button>
  );
}
