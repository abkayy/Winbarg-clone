import { getProjectById } from "@/services/projectService";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/shared/FadeIn";
import Link from "next/link";
import { ArrowLeft, MapPin, Building2, Calendar, User } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Winbarg Homes Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.featuredImage ? [project.featuredImage] : (project.images?.length ? [project.images[0]] : []),
    },
  };
}

export default async function PropertyDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  const coverImage = project.featuredImage || (project.images?.length ? project.images[0] : null);
  const gallery = project.images || [];
  const keyChallenges = Array.isArray(project.keyChallenges) ? project.keyChallenges : [];
  const sustainableFeatures = Array.isArray(project.sustainableFeatures) ? project.sustainableFeatures : [];

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50 pb-24">
      <section className="w-full pt-24 pb-8 border-b border-slate-200 bg-white">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <Link href="/properties" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-primary font-medium font-['Plus_Jakarta_Sans'] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
          </FadeIn>
        </div>
      </section>

      {coverImage && (
        <section className="w-full px-4 sm:px-6 lg:px-8 pt-8">
          <div className="mx-auto max-w-screen-xl">
            <FadeIn direction="up" delay={0.05}>
              <div className="relative overflow-hidden rounded-[28px] shadow-[0_24px_80px_rgba(15,23,42,0.18)] bg-slate-200 aspect-[16/9]">
                <Image src={coverImage} alt={project.title} fill className="object-cover" priority />
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      <section className="w-full bg-white">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
            <FadeIn direction="up" className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 rounded-full bg-brand-primary text-white text-xs font-bold uppercase tracking-wider">
                  Featured Project
                </span>
                <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-4 py-1.5 rounded-full bg-amber-500 text-white text-xs font-bold uppercase tracking-wider">
                    Spotlight
                  </span>
                )}
              </div>

              <div className="space-y-4 max-w-3xl">
                <h1 className="text-slate-900 text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Plus_Jakarta_Sans'] leading-[1.05]">
                  {project.title}
                </h1>
                <p className="text-slate-600 text-lg sm:text-xl font-normal font-['Plus_Jakarta_Sans'] leading-relaxed max-w-2xl">
                  {project.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 max-w-4xl pt-2">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="w-11 h-11 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.18em]">Location</p>
                    <p className="text-slate-900 font-semibold font-['Plus_Jakarta_Sans']">{project.location}</p>
                  </div>
                </div>

                {project.client && (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="w-11 h-11 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.18em]">Client</p>
                      <p className="text-slate-900 font-semibold font-['Plus_Jakarta_Sans']">{project.client}</p>
                    </div>
                  </div>
                )}

                {project.completionDate && (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="w-11 h-11 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.18em]">Completion Date</p>
                      <p className="text-slate-900 font-semibold font-['Plus_Jakarta_Sans']">{project.completionDate}</p>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                <h2 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Project Snapshot</h2>
                <div className="mt-6 space-y-4">
                  {[
                    { label: "Location", value: project.location },
                    { label: "Project Type", value: project.category },
                    { label: "Completion Date", value: project.completionDate || "In progress" },
                    { label: "Client", value: project.client || "Private Commission" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                      <div className="mt-0.5 h-10 w-10 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.18em]">{item.label}</p>
                        <p className="text-slate-900 font-semibold font-['Plus_Jakarta_Sans'] leading-snug">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-4 text-white font-bold font-['Plus_Jakarta_Sans'] transition-colors hover:bg-slate-800"
                >
                  Inquire About Similar Projects
                </Link>
              </aside>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="w-full py-14 lg:py-20">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)] items-start">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Project Overview</h2>
                  <div className="mt-3 h-1 w-12 rounded-full bg-brand-primary" />
                </div>
                <p className="text-slate-600 text-lg leading-relaxed font-['Plus_Jakarta_Sans'] whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { title: "Key Challenges", items: keyChallenges },
                  { title: "Sustainable Features", items: sustainableFeatures },
                ].map((group) => (
                  <div key={group.title} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">{group.title}</h3>
                    {group.items.length > 0 && (
                      <ul className="mt-4 space-y-3 text-slate-600 font-['Plus_Jakarta_Sans']">
                        {group.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 rounded-full bg-brand-primary shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="w-full py-16 bg-slate-100/70">
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn direction="up">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Process Gallery</h2>
                <p className="mt-3 text-slate-500 font-['Plus_Jakarta_Sans']">
                  Witness the transformation from initial concept renders to the final structural masterpiece.
                </p>
              </div>
            </FadeIn>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {gallery.map((img, i) => (
                <FadeIn key={i} direction="up" delay={i * 0.08}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm bg-slate-200">
                    <Image src={img} alt={`${project.title} gallery image ${i + 1}`} fill className="object-cover" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="w-full py-16">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="rounded-[28px] bg-gradient-to-r from-slate-950 to-[#1c2d5c] p-8 sm:p-10 lg:p-12 shadow-[0_22px_70px_rgba(15,23,42,0.18)]">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="max-w-xl text-white">
                  <h3 className="text-3xl font-bold font-['Plus_Jakarta_Sans']">Ready to discuss your project?</h3>
                  <p className="mt-3 text-white/75 text-lg font-['Plus_Jakarta_Sans']">
                    Consult directly with our team to plan your next residential, luxury, or commercial build.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl bg-brand-primary px-6 py-4 text-white font-bold font-['Plus_Jakarta_Sans'] transition-colors hover:bg-brand-primary/90"
                  >
                    Contact Directly
                  </Link>
                  <Link
                    href="/properties"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-white font-bold font-['Plus_Jakarta_Sans'] transition-colors hover:bg-white/10"
                  >
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
