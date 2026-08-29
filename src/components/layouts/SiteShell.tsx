"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    // Admin pages render WITHOUT Navbar/Footer — the AdminLayout provides its own chrome
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-w-0 flex-1">{children}</main>
      <Footer />
    </>
  );
}
