"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { FadeIn } from "@/components/shared/FadeIn";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Search, Tag, User } from "lucide-react";
import { getBlogs } from "@/services/blogService";
import { addSubscriber } from "@/services/subscriberService";
import { BlogPost } from "@/types";
import Image from "next/image";

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="w-full bg-white rounded-[24px] overflow-hidden border border-slate-200 animate-pulse">
      <div className="w-full aspect-[16/10] bg-slate-200" />
      <div className="p-6 space-y-3">
        <div className="flex gap-3">
          <div className="h-3 w-20 bg-slate-200 rounded-full" />
          <div className="h-3 w-16 bg-slate-200 rounded-full" />
        </div>
        <div className="h-5 w-3/4 bg-slate-200 rounded-full" />
        <div className="h-4 w-full bg-slate-100 rounded-full" />
        <div className="h-4 w-5/6 bg-slate-100 rounded-full" />
      </div>
    </div>
  );
}

// ─── Blog card ────────────────────────────────────────────────────────────────
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <FadeIn key={post.id} direction="up" delay={index * 0.07}>
      <Link
        href={`/blog/${post.slug}`}
        className="block group w-full bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
      >
        {/* Thumbnail — 16:9 matches landscape photos exactly */}
        <div className="w-full aspect-[16/9] relative bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1A3D7C]/10 to-slate-200">
              <span className="text-4xl font-black text-[#1A3D7C]/20 font-['Plus_Jakarta_Sans'] text-center px-4 leading-tight">
                {post.title}
              </span>
            </div>
          )}
          {/* Category badge always visible */}
          <span className="absolute bottom-3 left-3 px-3 py-1 bg-[#1A3D7C]/90 backdrop-blur-sm rounded-full text-white text-xs font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans']">
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-4 text-xs text-slate-500 font-['Plus_Jakarta_Sans']">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
          <h3 className="text-slate-900 text-xl font-bold font-['Plus_Jakarta_Sans'] leading-tight group-hover:text-[#1A3D7C] transition-colors">
            {post.title}
          </h3>
          <p className="text-slate-600 text-sm font-normal font-['Plus_Jakarta_Sans'] leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-['Plus_Jakarta_Sans']">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5 text-[#1A3D7C] text-xs font-bold font-['Plus_Jakarta_Sans'] group-hover:gap-2.5 transition-all">
              Read More
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const { data: blogs = [], isLoading } = useSWR("blogs_published", () =>
    getBlogs(true)
  );
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(blogs.map((b) => b.category));
    return ["All Posts", ...Array.from(cats)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    let list = blogs;
    if (activeCategory !== "All Posts")
      list = list.filter((b) => b.category === activeCategory);
    if (searchQuery.trim())
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return list;
  }, [blogs, activeCategory, searchQuery]);

  const featuredPost =
    filteredBlogs.find((p) => p.featured) || filteredBlogs[0];
  const regularPosts = featuredPost
    ? filteredBlogs.filter((p) => p.id !== featuredPost.id)
    : filteredBlogs;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribing(true);
    try {
      await addSubscriber(email.trim());
      setSubscribed(true);
      setEmail("");
    } catch (err) {
      console.error("Subscribe error:", err);
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="w-full pt-24 pb-14 bg-white border-b border-slate-200">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A3D7C]/10 text-[#1A3D7C] text-xs font-bold uppercase tracking-wider mb-4 font-['Plus_Jakarta_Sans']">
              <Tag className="w-3 h-3" />
              Blog & Insights
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Plus_Jakarta_Sans'] leading-[1.05] text-slate-900">
              Real Estate{" "}
              <span className="text-[#1A3D7C]">Insights</span>
            </h1>
            <p className="mt-4 max-w-3xl text-slate-600 text-lg sm:text-xl font-normal font-['Plus_Jakarta_Sans'] leading-relaxed">
              Stay updated with the latest trends in construction, smart home
              technology, and sustainable real estate development in Africa.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Filter / Search bar ──────────────────────────────────────── */}
      <section className="w-full bg-white border-b border-slate-200 py-5 sticky top-0 z-10 shadow-sm">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 justify-between">
          <div className="flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold font-['Plus_Jakarta_Sans'] transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#1A3D7C] text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex w-full lg:w-[280px] items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 focus-within:border-[#1A3D7C]/40 focus-within:bg-white focus-within:shadow-sm transition-all">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search insights…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 font-['Plus_Jakarta_Sans']"
              aria-label="Search insights"
            />
          </div>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────────────── */}
      {isLoading ? (
        <section className="w-full py-16">
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </section>
      ) : filteredBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-32 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
            <Search className="w-7 h-7" />
          </div>
          <p className="text-slate-600 text-lg font-semibold font-['Plus_Jakarta_Sans']">
            {searchQuery
              ? `No results for "${searchQuery}"`
              : `No posts in "${activeCategory}" yet`}
          </p>
          <p className="text-slate-400 text-sm font-['Plus_Jakarta_Sans']">
            Try a different category or search term.
          </p>
        </div>
      ) : (
        <>
          {/* Featured post */}
          {featuredPost && !searchQuery && (
            <section className="w-full py-14">
              <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn direction="up">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="block group w-full overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] border border-slate-100 hover:shadow-[0_24px_80px_rgba(15,23,42,0.14)] hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* ── Full-width 16:9 image — never crops sides ── */}
                    <div className="w-full aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-[#1A3D7C]/10 to-slate-200">
                      {featuredPost.coverImage ? (
                        <Image
                          src={featuredPost.coverImage}
                          alt={featuredPost.title}
                          fill
                          sizes="(max-width: 1280px) 100vw, 1280px"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          priority
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-10">
                          <span className="text-5xl font-black text-[#1A3D7C]/15 font-['Plus_Jakarta_Sans'] text-center leading-tight">
                            {featuredPost.title}
                          </span>
                        </div>
                      )}
                      {/* Dark gradient at bottom for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      {/* Badges — top left */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-white text-[#1A3D7C] rounded-full text-xs font-black uppercase tracking-wider shadow-md font-['Plus_Jakarta_Sans']">
                          ★ Featured
                        </span>
                        <span className="px-3 py-1 bg-[#1A3D7C] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md font-['Plus_Jakarta_Sans']">
                          {featuredPost.category}
                        </span>
                      </div>
                      {/* Meta info — bottom left over gradient */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white/80 text-xs font-['Plus_Jakarta_Sans']">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {featuredPost.date}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/50" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                    </div>

                    {/* ── Content below image ── */}
                    <div className="p-7 sm:p-8 lg:p-10 flex flex-col sm:flex-row sm:items-start gap-6">
                      <div className="flex-1 space-y-3">
                        <h2 className="text-slate-900 text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans'] leading-snug group-hover:text-[#1A3D7C] transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-slate-500 text-sm sm:text-base font-['Plus_Jakarta_Sans'] leading-relaxed line-clamp-2">
                          {featuredPost.excerpt}
                        </p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 shrink-0">
                        <span className="flex items-center gap-2 text-sm text-slate-500 font-['Plus_Jakarta_Sans']">
                          <div className="w-7 h-7 rounded-full bg-[#1A3D7C]/10 flex items-center justify-center text-[#1A3D7C] font-bold text-xs shrink-0">
                            {featuredPost.author.split(" ").map((n) => n[0]).join("")}
                          </div>
                          {featuredPost.author}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[#1A3D7C] text-sm font-bold font-['Plus_Jakarta_Sans'] group-hover:gap-2.5 transition-all whitespace-nowrap">
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              </div>
            </section>
          )}


          {/* Posts grid */}
          {regularPosts.length > 0 && (
            <section className="w-full pb-24">
              <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                {!searchQuery && regularPosts.length > 0 && (
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-['Plus_Jakarta_Sans'] mb-6">
                    More Articles
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {regularPosts.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ── Newsletter CTA ───────────────────────────────────────────── */}
      <section className="w-full bg-[#1A3D7C] py-20">
        <div className="w-full max-w-screen-xl mx-auto px-8 flex flex-col items-center gap-6 text-center">
          <h2 className="text-white text-3xl sm:text-4xl font-bold font-['Plus_Jakarta_Sans'] leading-tight">
            Never Miss an Update
          </h2>
          <p className="text-white/75 text-lg font-normal font-['Plus_Jakarta_Sans'] max-w-xl">
            Subscribe to our newsletter and get the latest articles, market
            insights, and company news delivered straight to your inbox.
          </p>
          {subscribed ? (
            <div className="flex items-center gap-2 bg-white/15 rounded-full px-6 py-3 text-white font-semibold font-['Plus_Jakarta_Sans']">
              ✓ You&apos;re subscribed — thank you!
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full max-w-md"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 w-full h-12 px-5 bg-white/10 border border-white/25 rounded-lg text-white placeholder:text-white/50 font-['Plus_Jakarta_Sans'] outline-none focus:border-white/60 transition-colors"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="w-full sm:w-auto h-12 px-8 bg-white text-[#1A3D7C] font-bold font-['Plus_Jakarta_Sans'] rounded-lg hover:bg-slate-50 transition-colors shadow-lg disabled:opacity-60"
              >
                {subscribing ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
