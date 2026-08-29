import { AdminLayout } from "@/components/layouts/AdminLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Winbarg Homes",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
