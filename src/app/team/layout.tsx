import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the experts behind Winbarg Homes — a diverse team of architects, engineers, and visionaries dedicated to building the future.",
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
