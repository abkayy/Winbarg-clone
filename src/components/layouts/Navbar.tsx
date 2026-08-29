"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Properties", href: "/properties" },
  { name: "Team", href: "/team" },
  { name: "Blog", href: "/blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/img/1.png"
              alt="Winbarg Homes"
              width={160}
              height={56}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-['Inter'] transition-colors hover:text-brand-primary whitespace-nowrap ${
                    isActive 
                      ? "text-brand-primary font-semibold border-b-2 border-brand-primary pb-0.5" 
                      : "text-slate-600 font-medium"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            className="flex items-center justify-center px-6 py-2.5 bg-brand-primary rounded-md shadow-md text-white text-base font-medium font-['Inter'] hover:bg-brand-primary/90 transition-colors whitespace-nowrap"
          >
            Contact Us
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="p-2 text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm p-4 sm:p-6">
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <div className="flex flex-col gap-6 pt-4 pb-2">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <Image
                    src="/img/1.png"
                    alt="Winbarg Homes"
                    width={140}
                    height={48}
                    className="h-12 w-auto object-contain"
                  />
                </Link>
                <nav className="flex flex-col gap-4 px-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-['Inter'] transition-colors hover:text-brand-primary ${
                          isActive ? "text-brand-primary font-semibold" : "text-slate-600 font-medium"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 flex w-full flex-col items-center justify-center rounded-md bg-brand-primary px-6 py-3 text-lg font-medium font-['Inter'] text-white shadow-md transition-colors hover:bg-brand-primary/90"
                  >
                    Contact Us
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
