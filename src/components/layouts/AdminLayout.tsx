"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, onIdTokenChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Users,
  MessageSquare,
  LogOut,
  Settings,
  Mail,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Projects", href: "/admin/projects", icon: ImageIcon },
  { name: "Team", href: "/admin/team", icon: Users },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Subscribers", href: "/admin/subscribers", icon: Mail },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        document.cookie = `admin_token=${token}; path=/; max-age=3600; SameSite=Strict; Secure`;
      } else {
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      }
    });

    return () => unsubscribe();
  }, []);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans']">
      <aside className="hidden h-screen w-64 shrink-0 flex-col overflow-hidden bg-slate-900 text-white md:sticky md:top-0 md:flex md:self-start">
        <div className="flex h-20 shrink-0 items-center border-b border-slate-800 px-6">
          <Image src="/img/2.png" alt="Winbarg Homes" width={40} height={40} className="h-10 w-auto" />
          <span className="ml-3 text-lg font-bold tracking-wide">Admin Portal</span>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 py-6">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-primary text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-slate-800 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-slate-800"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="rounded-md p-2 text-slate-900 transition-colors hover:bg-slate-100">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open admin navigation</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[84vw] max-w-xs bg-slate-900 p-0 text-white">
              <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 px-5">
                  <div className="flex items-center gap-3">
                    <Image src="/img/2.png" alt="Winbarg Homes" width={34} height={34} className="h-8 w-auto" />
                    <span className="text-base font-bold tracking-wide">Admin Portal</span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="rounded-md p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-5">
                  <div className="flex flex-col gap-2">
                    {sidebarLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-brand-primary text-white"
                              : "text-slate-400 hover:bg-slate-800 hover:text-white"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                </nav>
                <div className="border-t border-slate-800 p-4">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-slate-800"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <span className="font-bold text-slate-900">Admin Portal</span>
          <button onClick={handleLogout} className="text-sm font-medium text-red-600">
            Sign Out
          </button>
        </header>

        <main className="min-w-0 flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
