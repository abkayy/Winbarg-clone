"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { FadeIn } from "@/components/shared/FadeIn";
import { LogoLoader } from "@/components/shared/LogoLoader";
import { MapPin, ArrowRight, Building2, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/services/projectService";
import { Project } from "@/types";

export default function PropertiesPage() {
  const { data: projects = [], isLoading } = useSWR("projects", getProjects);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return ["All", ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="w-full pt-24 pb-16 bg-white border-b border-slate-200">
        <div className="w-full max-w-screen-xl mx-auto px-8 flex flex-col items-center gap-6">
          <FadeIn direction="up" className="flex flex-col items-center">
            <h4 className="text-center text-brand-primary text-sm font-bold font-['Plus_Jakarta_Sans'] uppercase leading-tight tracking-widest mb-2">
              Our Portfolio
            </h4>
            <h1 className="text-center text-slate-900 text-5xl sm:text-6xl font-extrabold font-['Plus_Jakarta_Sans'] leading-tight">
              Featured <span className="text-brand-primary">Projects</span>
            </h1>
          </FadeIn>
          <FadeIn direction="up" className="flex flex-col max-w-2xl items-center pt-2 pb-0 px-0 relative self-stretch w-full">
              <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-600 text-lg text-center tracking-[0] leading-[29.2px]">
                Explore our diverse portfolio of residential, commercial, and luxury
                construction projects across Nigeria.
              </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="w-full bg-slate-50 py-8 border-b border-slate-200 sticky top-16 z-20">
        <div className="w-full max-w-screen-xl mx-auto px-8 flex flex-wrap justify-center items-center gap-3">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold font-['Plus_Jakarta_Sans'] transition-all shadow-sm ${
                activeCategory === cat
                  ? "bg-brand-primary text-white shadow-md scale-105"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-brand-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full py-16 bg-slate-50 min-h-[500px]">
        <div className="w-full max-w-screen-xl mx-auto px-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LogoLoader />
            </div>
          ) : projects.length === 0 ? (
             <div className="text-center text-slate-500 py-24">
               No projects to display at the moment.
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, i) => (
                <FadeIn key={project.id} direction="up" delay={i * 0.1}>
                  <Link
                    href={`/properties/${project.id}`}
                    className="block group w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Image */}
                    <div className="w-full h-64 relative bg-slate-200 overflow-hidden">
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                      {project.featuredImage || project.images?.[0] ? (
                        <Image 
                          src={project.featuredImage || project.images[0]} 
                          alt={project.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">No image available</div>
                      )}
                      
                      {/* Tags */}
                      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-slate-900 text-xs font-bold uppercase tracking-wider shadow-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col gap-4 flex-1">
                      <h3 className="text-slate-900 text-2xl font-bold font-['Plus_Jakarta_Sans'] leading-tight group-hover:text-brand-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-slate-500 font-['Plus_Jakarta_Sans'] text-sm">
                        <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>

                      <p className="text-slate-600 text-base font-normal font-['Plus_Jakarta_Sans'] leading-relaxed line-clamp-2 mt-2">
                        {project.description}
                      </p>

                      <div className="mt-auto pt-6 flex items-center justify-between">
                        <span className="text-brand-primary text-sm font-bold font-['Plus_Jakarta_Sans'] group-hover:gap-2 transition-all flex items-center gap-1.5">
                          View Project Details
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-brand-primary py-24">
        <div className="w-full max-w-screen-xl mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 flex flex-col gap-6 max-w-2xl">
            <h2 className="text-white text-4xl sm:text-5xl font-extrabold font-['Plus_Jakarta_Sans'] leading-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-slate-300 text-lg font-normal font-['Plus_Jakarta_Sans'] leading-relaxed">
              Whether it&apos;s a luxury residential home, a corporate office, or a large-scale commercial development, Winbarg Homes has the expertise to bring your vision to life.
            </p>
          </div>
          <div className="shrink-0 flex gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white hover:bg-slate-50 rounded-lg text-brand-primary text-base font-bold font-['Plus_Jakarta_Sans'] transition-colors shadow-lg"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
