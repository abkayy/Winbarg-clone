"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTeamMembers } from "@/services/teamService";
import { getSiteStats } from "@/services/settingsService";
import type { TeamMember, SiteStats } from "@/types/index";

import { LogoLoader } from "@/components/shared/LogoLoader";

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [siteStats, setSiteStats] = useState<SiteStats>({
    projectsCompleted: "50+",
    happyFamilies: "200+",
    awardsWon: "15+",
    yearFounded: "2022",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [members, stats] = await Promise.all([
          getTeamMembers(),
          getSiteStats()
        ]);
        setTeamMembers(members);
        setSiteStats(stats);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
        <LogoLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-slate-50 relative overflow-hidden">
      {/* Hero Section */}
      <header className="relative flex flex-col w-full items-start justify-center py-24 min-h-[80vh] overflow-hidden sm:py-32 lg:py-40 lg:min-h-screen">
        {/* Blurred background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/img/about.png)`,
            // filter: "blur(8px)",
          }}
        />
        {/* Dark overlay for text visibility */}
        <div className="absolute inset-0 bg-black/10" />

        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col max-w-screen-md items-start gap-6 w-full">
            <div className="inline-flex px-3 py-1 bg-[#1a3a8a1a] rounded-full items-start relative flex-[0_0_auto]">
              <div className="relative flex items-center mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-[#1a3a8a] text-xs tracking-[1.20px] leading-4">
                ABOUT WINBARG HOMES
              </div>
            </div>
            <div className="items-start relative self-stretch w-full flex-[0_0_auto] flex flex-col">
              <p className="relative self-stretch mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-ExtraBold',Helvetica] font-extrabold text-transparent text-4xl sm:text-5xl md:text-6xl tracking-[0] leading-tight md:leading-[60px]">
                <span className="text-slate-900">
                  Building the Future,
                </span>
                <br />
                <span className="text-[#1a3a8a]">
                  One Home at a Time.
                </span>
              </p>
            </div>
            <div className="flex flex-col max-w-xl items-start pt-2 pb-0 px-0 relative flex-[0_0_auto]">
              <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-600 text-lg tracking-[0] leading-[29.2px]">
                Winbarg Homes Limited is a dynamic construction company delivering
                high-quality residential and commercial real estate development solutions that
                meet modern standards of excellence.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex flex-col items-center px-8 py-4 relative flex-[0_0_auto] bg-[#1a3a8a] rounded-2xl cursor-pointer hover:bg-[#1a3a8a]/90">
                <div className="relative flex items-center h-6 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-base tracking-[0] leading-6">
                  Our Journey
                </div>
              </div>
              <div className="inline-flex flex-col items-center px-8 py-4 relative flex-[0_0_auto] bg-white rounded-2xl border border-solid border-slate-200 cursor-pointer hover:bg-slate-50">
                <div className="relative flex items-center h-6 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-base tracking-[0] leading-6">
                  Mission &amp; Vision
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <div className="relative flex flex-col w-full items-center px-4 py-12 bg-white border-t border-b border-slate-100 z-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-center gap-8 relative max-w-screen-xl w-full flex-[0_0_auto]">
          <div className="flex flex-col items-start gap-2 relative flex-1 self-stretch grow min-w-[150px]">
            <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex items-center justify-center h-10 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-ExtraBold',Helvetica] font-extrabold text-[#1a3a8a] text-4xl text-center tracking-[0] leading-10 whitespace-nowrap">
                {siteStats.projectsCompleted}
              </div>
            </div>
            <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex items-center justify-center h-5 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-500 text-sm text-center tracking-[0.70px] leading-5 whitespace-nowrap">
                PROJECTS COMPLETED
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 relative flex-1 self-stretch grow min-w-[150px]">
            <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex items-center justify-center h-10 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-ExtraBold',Helvetica] font-extrabold text-[#1a3a8a] text-4xl text-center tracking-[0] leading-10 whitespace-nowrap">
                {siteStats.happyFamilies}
              </div>
            </div>
            <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex items-center justify-center h-5 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-500 text-sm text-center tracking-[0.70px] leading-5 whitespace-nowrap">
                HAPPY FAMILIES
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 relative flex-1 self-stretch grow min-w-[150px]">
            <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex items-center justify-center h-10 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-ExtraBold',Helvetica] font-extrabold text-[#1a3a8a] text-4xl text-center tracking-[0] leading-10 whitespace-nowrap">
                {siteStats.awardsWon}
              </div>
            </div>
            <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex items-center justify-center h-5 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-500 text-sm text-center tracking-[0.70px] leading-5 whitespace-nowrap">
                AWARDS WON
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 relative flex-1 self-stretch grow min-w-[150px]">
            <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex items-center justify-center h-10 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-ExtraBold',Helvetica] font-extrabold text-[#1a3a8a] text-4xl text-center tracking-[0] leading-10 whitespace-nowrap">
                {siteStats.yearFounded}
              </div>
            </div>
            <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex items-center justify-center h-5 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-500 text-sm text-center tracking-[0.70px] leading-5 whitespace-nowrap">
                YEAR FOUNDED
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-24 bg-slate-50 flex flex-col items-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 relative w-full max-w-screen-xl flex-[0_0_auto]">
          <div className="flex flex-col items-start gap-12 relative flex-1 grow w-full">
            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <div className="absolute w-[calc(100%_+_8px)] h-[calc(100%_+_8px)] -top-1 -left-1 rounded-3xl blur-sm bg-[linear-gradient(90deg,rgba(26,58,138,1)_0%,rgba(96,165,250,1)_100%)] opacity-25" />
              <div className="relative self-stretch w-full min-h-[296px] bg-white rounded-3xl shadow-[0px_1px_2px_#0000000d] overflow-hidden">
                <div className="flex w-14 h-14 items-center justify-center absolute top-8 left-8 bg-[#1a3a8a1a] rounded-2xl">
                  <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                    <div className="w-6 h-6 bg-[#1a3a8a] rounded-full opacity-20" />
                  </div>
                </div>
                <div className="absolute left-8 right-8 top-28 flex flex-col items-start">
                  <div className="relative flex items-center h-8 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-2xl tracking-[0] leading-8 sm:whitespace-nowrap">
                    Our Mission
                  </div>
                </div>
                <div className="absolute left-8 right-8 top-40 flex flex-col items-start">
                  <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-600 text-base tracking-[0] leading-[26px] break-words">
                    To deliver high-quality construction services within the
                    timeframe in accordance with project specifications, and to
                    foster long-term relationships through integrity, professionalism,
                    and customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <div className="absolute w-[calc(100%_+_8px)] h-[calc(100%_+_8px)] -top-1 -left-1 rounded-3xl blur-sm bg-[linear-gradient(90deg,rgba(96,165,250,1)_0%,rgba(26,58,138,1)_100%)] opacity-25" />
              <div className="relative self-stretch w-full min-h-[296px] bg-white rounded-3xl shadow-[0px_1px_2px_#0000000d] overflow-hidden">
                <div className="flex w-14 h-14 items-center justify-center absolute top-8 left-8 bg-[#1a3a8a1a] rounded-2xl">
                  <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                    <div className="w-6 h-6 bg-[#1a3a8a] rounded-sm opacity-20" />
                  </div>
                </div>
                <div className="absolute left-8 right-8 top-28 flex flex-col items-start">
                  <div className="relative flex items-center h-8 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-2xl tracking-[0] leading-8 sm:whitespace-nowrap">
                    Our Vision
                  </div>
                </div>
                <div className="absolute left-8 right-8 top-40 flex flex-col items-start">
                  <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-600 text-base tracking-[0] leading-[26px] break-words">
                    To be the leading construction company recognized for
                    innovation, sustainability, and excellence in the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start relative flex-1 grow w-full">
            <div className="flex flex-col justify-center self-stretch w-full bg-[#ffffff01] rounded-3xl overflow-hidden shadow-[0px_25px_50px_-12px_#00000040] aspect-[1] items-start relative flex-[0_0_auto]">
              <div className="relative self-stretch w-full h-[584px] bg-[url(/img/Architectural%20Plan.png)] bg-slate-300 bg-cover bg-[50%_50%]" />
            </div>
            <div className="inline-flex flex-col items-start p-6 sm:p-8 absolute left-4 right-4 -bottom-6 bg-[#1a3a8a] rounded-3xl max-w-none lg:-left-6 lg:right-auto lg:max-w-[90%]">
              <div className="absolute w-full h-full top-0 left-0 bg-[#ffffff01] rounded-3xl shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a]" />
              <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-lg sm:text-xl tracking-[0] leading-[25px]">
                &#34;Integrity is the foundation
                <br />
                of every structure we build.&#34;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our History */}
      <div className="relative w-full px-4 lg:px-0 py-24 bg-white flex flex-col items-center">
        <div className="relative max-w-screen-xl w-full">
          <div className="flex flex-col w-full lg:w-[calc(100%_-_64px)] items-center gap-4 relative">
            <div className="items-center relative self-stretch w-full flex-[0_0_auto] flex flex-col">
              <div className="relative flex items-center justify-center h-10 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-4xl text-center tracking-[0] leading-10 whitespace-nowrap">
                Our History
              </div>
            </div>
            <div className="relative w-20 h-1.5 bg-[#1a3a8a] rounded-full" />
            <div className="flex flex-col max-w-2xl w-full items-center pt-2 pb-0 px-0 relative flex-[0_0_auto]">
              <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-600 text-lg text-center tracking-[0] leading-7">
                A journey of innovation, dedication, and professional growth,
                building trust and lasting impact through exceptional quality.
              </p>
            </div>
          </div>
          <div className="relative w-full max-w-4xl mx-auto mt-16">
            {/* Center vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-slate-300" />

            <div className="flex flex-col gap-12">
              {/* 2022 - Left */}
              <div className="flex items-start gap-8 relative">
                <div className="flex-1 flex justify-end text-right">
                  <div className="flex flex-col items-end gap-2 p-6 bg-slate-50 rounded-2xl shadow-sm max-w-xs">
                    <div className="text-[#1a3a8a] font-bold text-lg">2022</div>
                    <div className="text-slate-900 font-bold text-lg">
                      The Genesis
                    </div>
                    <p className="text-slate-600 text-sm leading-5">
                      Winbarg Homes Limited was incorporated by the CAC of Nigeria,
                      dedicated to delivering high-quality residential and commercial real estate
                      solutions meeting modern standards of excellence.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[#1a3a8a] rounded-full border-4 border-white z-10 top-6" />
                <div className="flex-1" />
              </div>

              {/* 2023 - Right */}
              <div className="flex items-start gap-8 relative">
                <div className="flex-1" />
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[#1a3a8a] rounded-full border-4 border-white z-10 top-6" />
                <div className="flex-1 flex justify-start">
                  <div className="flex flex-col items-start gap-2 p-6 bg-slate-50 rounded-2xl shadow-sm max-w-xs">
                    <div className="text-[#1a3a8a] font-bold text-lg">2023</div>
                    <div className="text-slate-900 font-bold text-lg">
                      Rapid Expansion
                    </div>
                    <p className="text-slate-600 text-sm leading-5">
                      Assembled a team of experienced professionals to combine
                      technical expertise with a commitment to quality, ensuring
                      projects are completed on time and to the highest standards.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2024 - Left */}
              <div className="flex items-start gap-8 relative">
                <div className="flex-1 flex justify-end text-right">
                  <div className="flex flex-col items-end gap-2 p-6 bg-slate-50 rounded-2xl shadow-sm max-w-xs">
                    <div className="text-[#1a3a8a] font-bold text-lg">2024</div>
                    <div className="text-slate-900 font-bold text-lg">
                      Innovation Era
                    </div>
                    <p className="text-slate-600 text-sm leading-5">
                      Redefining construction through sustainable practices,
                      superior craftsmanship, and a customer-centered approach—
                      building not just structures, but lasting value and trust.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[#1a3a8a] rounded-full border-4 border-white z-10 top-6" />
                <div className="flex-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative w-full px-8 py-24 bg-slate-50 flex flex-col items-center">
        <div className="flex flex-col max-w-screen-xl items-start gap-16 relative w-full flex-[0_0_auto]">
          <div className="flex flex-col sm:flex-row items-end justify-between relative self-stretch w-full gap-6">
            <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
              <div className="items-start flex flex-col relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative flex items-center h-10 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-4xl tracking-[0] leading-10 whitespace-nowrap">
                  Meet the Experts
                </div>
              </div>
              <div className="flex flex-col max-w-xl items-start relative w-full flex-[0_0_auto]">
                <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-600 text-lg tracking-[0] leading-7">
                  The visionary team behind our award-winning designs and
                  structures.
                </p>
              </div>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center relative flex-[0_0_auto] hover:opacity-80"
            >
              <div className="relative flex items-center h-6 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-[#1a3a8a] text-base tracking-[0] leading-6 whitespace-nowrap">
                View Entire Team
              </div>
              <div className="inline-flex flex-col items-start pl-2 pr-0 py-0 relative flex-[0_0_auto] ml-[-8.53e-14px]">
                {/* Arrow right icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33331 8H12.6666"
                    stroke="#1A3A8A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 3.33334L12.6667 8.00001L8 12.6667"
                    stroke="#1A3A8A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative self-stretch w-full flex-[0_0_auto]">
            {teamMembers.slice(0, 3).map((member) => (
              <div key={member.id} className="relative self-stretch w-full">
                <div className="relative w-full h-96 bg-slate-200 rounded-2xl overflow-hidden mb-6">
                  {member.imageUrl && (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="w-full items-start flex flex-col">
                  <div className="relative flex items-center h-8 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-xl md:text-2xl tracking-[0] leading-8">
                    {member.name}
                  </div>
                </div>
                <div className="flex flex-col w-full items-start mt-2">
                  <p className="relative flex items-center mt-[-1.00px] [font-family:'Actor-Regular',Helvetica] font-normal text-[#1a3a8a] text-sm tracking-[0.70px] leading-5">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative w-full max-w-screen-xl mx-auto px-8 my-24 flex flex-col items-center">
        <div
          className="w-full p-12 rounded-[48px] overflow-hidden flex flex-col items-center relative"
          style={{
            backgroundImage: `url(/img/office.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#1A3A8A]/85" />
          <div className="flex flex-col items-center gap-6 relative z-10 w-full">
            <p className="relative flex items-center justify-center mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-ExtraBold',Helvetica] font-extrabold text-white text-4xl md:text-5xl text-center tracking-[0] leading-tight md:leading-[48px]">
              Ready to Build Your Dream?
            </p>
            <div className="flex flex-col max-w-2xl w-full items-center relative">
              <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-blue-100 text-lg text-center tracking-[0] leading-7">
                Let&#39;s discuss your next project. Our team of experts is
                ready to bring your vision to life with precision and care.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative w-full">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-white rounded-2xl hover:bg-blue-800 transition-colors"
              >
                <div className="relative flex items-center justify-center h-7 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-[#1A3A8A] text-lg text-center tracking-[0] leading-7 whitespace-nowrap">
                  Contact Us Today
                </div>
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center justify-center px-10 py-4 rounded-2xl border border-solid border-[#ffffff] hover:bg-white/10 transition-colors"
              >
                <div className="relative flex items-center justify-center h-7 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-lg text-center tracking-[0] leading-7 whitespace-nowrap">
                  Browse Properties
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
