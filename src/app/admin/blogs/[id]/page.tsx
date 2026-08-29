"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBlogById, updateBlog } from "@/services/blogService";
import { LogoLoader } from "@/components/shared/LogoLoader";
import { BlogForm, type BlogFormData } from "@/components/shared/BlogForm";

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ id: routeId }) => setId(routeId));
  }, [params]);

  const { data: blog, isLoading } = useSWR(
    id ? ["blog", id] : null,
    () => getBlogById(id as string)
  );

  const handleUpdate = async (data: BlogFormData) => {
    if (!id) return;
    await updateBlog(id, {
      ...data,
      slug: generateSlug(data.title),
    });
    router.push("/admin/blogs");
    router.refresh();
  };

  // ── Loading / not-found states ──────────────────────────────────────────

  if (isLoading && !blog) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <LogoLoader />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-20 px-4 sm:px-0">
        <div className="flex items-center gap-4 bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
          <Link
            href="/admin/blogs"
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
            Blog post not found
          </h1>
        </div>
      </div>
    );
  }

  return <BlogForm mode="edit" defaultValues={blog} onSubmit={handleUpdate} />;
}
