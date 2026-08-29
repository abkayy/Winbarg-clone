import { getBlogBySlug, getBlogs } from "@/services/blogService";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/shared/FadeIn";
import { ShareButton } from "@/components/shared/ShareButton";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | Winbarg Homes Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  };
}

// ─── Author avatar helper ─────────────────────────────────────────────────────
// Deterministic colour from name so the same author always gets the same hue.
function authorHue(name: string): number {
  let hash = 0;
  for (const ch of name) hash = ch.charCodeAt(0) + ((hash << 5) - hash);
  return Math.abs(hash) % 360;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) notFound();

  const allBlogs = await getBlogs(true);
  const relatedPosts = allBlogs
    .filter((p) => p.id !== blog.id && p.category === blog.category)
    .slice(0, 3);

  const finalRelated =
    relatedPosts.length > 0
      ? relatedPosts
      : allBlogs.filter((p) => p.id !== blog.id).slice(0, 3);

  const hue = authorHue(blog.author);
  const authorInitials = blog.author
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* ── Article header ─────────────────────────────────────────── */}
      <section className="w-full pt-24 pb-0 bg-slate-50 border-b border-slate-200">
        <div className="w-full max-w-screen-md mx-auto px-6 sm:px-8 flex flex-col items-start gap-6 pb-10">
          <FadeIn direction="up">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-[#1A3D7C] font-medium font-['Plus_Jakarta_Sans'] transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category + read time row */}
            <div className="flex items-center gap-3 mb-5">
              <span className="px-4 py-1.5 bg-[#1A3D7C]/10 text-[#1A3D7C] rounded-full text-xs font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans']">
                {blog.category}
              </span>
              <span className="text-slate-500 text-sm font-['Plus_Jakarta_Sans'] flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {blog.readTime}
              </span>
            </div>

            <h1 className="text-slate-900 text-4xl sm:text-5xl font-extrabold font-['Plus_Jakarta_Sans'] leading-[1.1] mb-6">
              {blog.title}
            </h1>

            {/* Author bar */}
            <div className="flex items-center justify-between w-full py-5 border-y border-slate-200">
              <div className="flex items-center gap-3">
                {/* Gradient avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
                  style={{
                    background: `linear-gradient(135deg, hsl(${hue},60%,45%), hsl(${(hue + 40) % 360},60%,55%))`,
                  }}
                >
                  {authorInitials}
                </div>
                <div>
                  <p className="text-slate-900 font-bold font-['Plus_Jakarta_Sans'] text-sm">
                    {blog.author}
                  </p>
                  <p className="text-slate-500 text-xs font-['Plus_Jakarta_Sans'] flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {blog.date}
                  </p>
                </div>
              </div>

              {/* Share button — client island */}
              <ShareButton title={blog.title} />
            </div>
          </FadeIn>
        </div>

        {/* ── Cover image — full-bleed inside header ──────────────── */}
        {blog.coverImage && (
          <FadeIn direction="up" delay={0.15}>
            <div className="w-full max-w-screen-lg mx-auto px-6 sm:px-8">
              <div className="w-full h-[360px] sm:h-[480px] rounded-t-2xl overflow-hidden relative bg-slate-200">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        )}
      </section>

      {/* ── Article body ────────────────────────────────────────────── */}
      <section className="w-full py-16">
        <div className="w-full max-w-screen-md mx-auto px-6 sm:px-8">
          <FadeIn direction="up" delay={0.2}>
            <div className="prose prose-lg prose-slate max-w-none font-['Plus_Jakarta_Sans']">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-3xl font-extrabold text-slate-900 mt-10 mb-4 font-['Plus_Jakarta_Sans']"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-2xl font-bold text-slate-900 mt-10 mb-4 font-['Plus_Jakarta_Sans'] border-b border-slate-100 pb-2"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-xl font-bold text-slate-900 mt-7 mb-3 font-['Plus_Jakarta_Sans']"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className="text-slate-600 leading-[1.85] mb-6 font-['Plus_Jakarta_Sans'] text-[17px]"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      className="list-disc pl-6 mb-6 text-slate-600 space-y-2"
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      className="list-decimal pl-6 mb-6 text-slate-600 space-y-2"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li
                      className="leading-relaxed font-['Plus_Jakarta_Sans']"
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-[#1A3D7C] hover:underline font-semibold"
                      {...props}
                    />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-[#1A3D7C] pl-5 italic text-slate-700 my-8 bg-[#1A3D7C]/05 p-4 rounded-r-xl"
                      {...props}
                    />
                  ),
                  img: ({ node, ...props }) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="rounded-2xl shadow-md w-full my-8 object-cover max-h-[520px]"
                      alt=""
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong
                      className="font-bold text-slate-900"
                      {...props}
                    />
                  ),
                  // ── Code blocks ──────────────────────────────────────────
                  code: ({ node, className, children, ...props }) => {
                    const isBlock = className?.startsWith("language-");
                    if (isBlock) {
                      return (
                        <code
                          className={`block bg-slate-900 text-slate-100 rounded-xl p-5 my-6 overflow-x-auto text-[14px] font-mono leading-relaxed ${className ?? ""}`}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code
                        className="bg-slate-100 text-[#1A3D7C] rounded px-1.5 py-0.5 text-[0.875em] font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  pre: ({ node, ...props }) => (
                    <pre
                      className="bg-slate-900 rounded-xl my-6 overflow-x-auto"
                      {...props}
                    />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr className="border-slate-200 my-10" {...props} />
                  ),
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Related posts ────────────────────────────────────────────── */}
      {finalRelated.length > 0 && (
        <section className="w-full bg-slate-50 py-20 border-t border-slate-200">
          <div className="w-full max-w-screen-xl mx-auto px-6 sm:px-8">
            <FadeIn direction="up">
              <h2 className="text-3xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans'] mb-3 text-center">
                Read Next
              </h2>
              <p className="text-slate-500 text-center font-['Plus_Jakarta_Sans'] mb-12">
                More articles you might enjoy
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {finalRelated.map((post, i) => (
                <FadeIn key={post.id} direction="up" delay={i * 0.1}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block group w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                  >
                    <div className="w-full h-48 relative bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1A3D7C]/10 to-slate-200">
                          <span className="text-2xl font-black text-[#1A3D7C]/15 font-['Plus_Jakarta_Sans'] text-center px-6 leading-tight">
                            {post.title}
                          </span>
                        </div>
                      )}
                      {/* Category badge */}
                      <span className="absolute bottom-2 left-2 px-2.5 py-1 bg-[#1A3D7C]/85 backdrop-blur-sm rounded-full text-white text-[10px] font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans']">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col gap-2.5 flex-1">
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-['Plus_Jakarta_Sans']">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-slate-900 text-base font-bold font-['Plus_Jakarta_Sans'] leading-snug group-hover:text-[#1A3D7C] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 text-xs font-['Plus_Jakarta_Sans'] leading-relaxed line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
