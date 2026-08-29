import { getTeamMemberById } from "@/services/teamService";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/shared/FadeIn";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const member = await getTeamMemberById(resolvedParams.id);

  if (!member) {
    return {
      title: "Member Not Found",
    };
  }

  return {
    title: `${member.name} - ${member.role} | Winbarg Homes`,
    description: member.bio,
    openGraph: {
      title: member.name,
      description: member.bio,
      images: member.imageUrl ? [member.imageUrl] : [],
    },
  };
}

export default async function TeamDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const member = await getTeamMemberById(resolvedParams.id);

  if (!member) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50 pb-24">
      <section className="w-full pt-24 pb-8 bg-white border-b border-slate-200">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <Link href="/team" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-primary font-medium font-['Plus_Jakarta_Sans'] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Team
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[420px_minmax(0,1fr)] items-start">
          <FadeIn direction="up" delay={0.05}>
            <div className="rounded-[28px] bg-[#e6edf8] p-4 sm:p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-slate-200">
                {member.imageUrl ? (
                  <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-slate-300 flex items-center justify-center">
                    <div className="w-36 h-36 rounded-full bg-white/70 flex items-center justify-center shadow-inner">
                      <span className="text-5xl font-bold text-brand-primary font-['Plus_Jakarta_Sans']">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-center gap-3">
                <a
                  href="mailto:info@winbarghomes.com"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm border border-slate-200 hover:text-brand-primary transition-colors"
                  aria-label="Email Winbarg Homes"
                >
                  <Mail className="w-4 h-4" />
                </a>
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary text-white shadow-sm hover:bg-brand-primary/90 transition-colors"
                    aria-label="LinkedIn profile"
                  >
                    in
                  </a>
                )}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-flex rounded-full bg-brand-primary/10 px-4 py-1.5 text-brand-primary text-xs font-bold uppercase tracking-[0.18em]">
                  {member.role}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans'] leading-[1.05]">
                  {member.name}
                </h1>
                <p className="text-2xl text-brand-primary font-semibold font-['Plus_Jakarta_Sans']">
                  {member.status || member.role}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Experience", value: member.experience || "Not listed" },
                  { label: "Projects", value: member.projects || "Not listed" },
                  { label: "Status", value: member.status || "Not listed" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.18em]">{item.label}</p>
                    <p className="mt-1 text-slate-900 font-semibold font-['Plus_Jakarta_Sans']">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Professional Biography</h2>
                <p className="text-slate-600 text-lg leading-relaxed font-['Plus_Jakarta_Sans']">
                  {member.professionalBiography || member.bio}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Core Expertise</h2>
                <div className="flex flex-wrap gap-3">
                  {(member.coreExpertise || []).length > 0 ? (
                    member.coreExpertise!.map((item) => (
                      <span key={item} className="rounded-full bg-slate-100 px-4 py-2 text-slate-700 font-semibold font-['Plus_Jakarta_Sans']">
                        {item}
                      </span>
                    ))
                  ) : (
                    <p className="text-slate-500 font-['Plus_Jakarta_Sans']">No expertise listed.</p>
                  )}
                </div>
              </div>

              <div className="rounded-[24px] bg-slate-950 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
                <div className="max-w-md">
                  <h3 className="text-2xl font-bold font-['Plus_Jakarta_Sans']">Ready to discuss your project?</h3>
                  <p className="mt-2 text-white/70 font-['Plus_Jakarta_Sans']">Consult directly with our engineering and planning team.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl bg-brand-primary px-6 py-3.5 font-bold font-['Plus_Jakarta_Sans']">
                    Contact Directly
                  </Link>
                  <Link href="/properties" className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-bold font-['Plus_Jakarta_Sans']">
                    View Portfolio
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
