import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties & Projects",
  description:
    "Explore our portfolio of premium residential, commercial, and luxury construction projects across Nigeria.",
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
