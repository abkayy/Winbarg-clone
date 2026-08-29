import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SiteShell } from "@/components/layouts/SiteShell";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Winbarg Homes | Premium Construction & Real Estate",
    template: "%s | Winbarg Homes",
  },
  description:
    "RC 1940265. Providing premier real estate and construction solutions with integrity and excellence. Your trusted partner for residential, commercial, luxury, and civil engineering projects.",
  icons: {
    icon: "/img/2.png",
    shortcut: "/img/2.png",
    apple: "/img/2.png",
  },
  openGraph: {
    title: "Winbarg Homes | Premium Construction & Real Estate",
    description:
      "Providing premier real estate and construction solutions with integrity and excellence.",
    url: "https://winbarghomes.com",
    siteName: "Winbarg Homes",
    images: [
      {
        url: "/img/1.png",
        width: 1200,
        height: 630,
        alt: "Winbarg Homes Limited",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Winbarg Homes | Premium Construction & Real Estate",
    description:
      "Providing premier real estate and construction solutions with integrity and excellence.",
    images: ["/img/1.png"],
  },
  metadataBase: new URL("https://winbarghomes.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 font-sans">
        <ToastProvider>
          <SiteShell>{children}</SiteShell>
        </ToastProvider>
      </body>
    </html>
  );
}
