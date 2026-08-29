"use client";

import useSWR from "swr";
import { FadeIn } from "@/components/shared/FadeIn";
import { LogoLoader } from "@/components/shared/LogoLoader";
import Image from "next/image";
import Link from "next/link";
import { getTeamMembers } from "@/services/teamService";
import { TeamMember } from "@/types";

export default function TeamPage() {
  const { data: teamMembers = [], isLoading } = useSWR("team", getTeamMembers);

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="w-full pt-24 pb-16 bg-white border-b border-slate-200">
        <div className="w-full max-w-screen-xl mx-auto px-8 flex flex-col items-center gap-6">
          <FadeIn direction="up" className="flex flex-col items-center">
            <h4 className="text-center text-brand-primary text-sm font-bold font-['Plus_Jakarta_Sans'] uppercase leading-tight tracking-widest mb-2">
              Our People
            </h4>
            <h1 className="text-center text-slate-900 text-5xl sm:text-6xl font-extrabold font-['Plus_Jakarta_Sans'] leading-tight">
              Meet The <span className="text-brand-primary">Experts</span>
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.1} className="w-full max-w-2xl mt-2">
            <p className="text-center text-slate-600 text-lg font-normal font-['Plus_Jakarta_Sans'] leading-relaxed">
              At Winbarg Homes, our strength lies in our people. A diverse team
              of architects, engineers, and visionaries dedicated to building
              the future.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Team Grid */}
      <section className="w-full py-24 bg-slate-50 min-h-[400px]">
        <div className="w-full max-w-screen-xl mx-auto px-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <LogoLoader />
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center text-slate-500 py-12">
              No team members to display at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {teamMembers.map((member, i) => (
                <FadeIn key={member.id} direction="up" delay={i * 0.08}>
                  <Link
                    href={`/team/${member.id}`}
                    className="w-full group flex flex-col items-start gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 rounded-2xl"
                    aria-label={`View profile for ${member.name}`}
                  >
                    {/* Image Container */}
                    <div className="w-full h-[400px] relative rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      {member.imageUrl ? (
                        <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-slate-300 flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-white/60 flex items-center justify-center">
                            <span className="text-4xl font-bold text-brand-primary font-['Plus_Jakarta_Sans']">
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Overlay on Hover */}
                      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-end gap-4">
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold font-['Plus_Jakarta_Sans'] uppercase tracking-wider">
                          View Profile
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col items-start gap-2 px-1">
                      <h3 className="text-slate-900 text-2xl font-bold font-['Plus_Jakarta_Sans']">
                        {member.name}
                      </h3>
                      <p className="text-brand-primary text-sm font-semibold font-['Plus_Jakarta_Sans'] uppercase tracking-wider">
                        {member.role}
                      </p>
                      <p className="text-slate-600 text-base font-normal font-['Plus_Jakarta_Sans'] leading-relaxed mt-1 line-clamp-3">
                        {member.bio}
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join CTA */}
      <section className="w-full bg-slate-900 py-24">
        <div className="w-full max-w-screen-xl mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 flex flex-col gap-6 max-w-2xl">
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold font-['Plus_Jakarta_Sans'] leading-tight">
              Join Our Growing Team
            </h2>
            <p className="text-slate-300 text-lg font-normal font-['Plus_Jakarta_Sans'] leading-relaxed">
              We are always on the lookout for passionate, innovative, and
              driven individuals to join us in shaping the skyline and building
              premium homes across Nigeria.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/contact"
              className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 rounded-lg text-white text-base font-bold font-['Plus_Jakarta_Sans'] transition-colors shadow-lg"
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
