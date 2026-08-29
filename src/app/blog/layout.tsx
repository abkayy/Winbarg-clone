import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & News",
  description:
    "Stay up to date with the latest news, insights, and updates from Winbarg Homes on construction, real estate, and industry trends.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
