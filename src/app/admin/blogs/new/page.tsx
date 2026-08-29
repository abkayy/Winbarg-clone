"use client";

import { useRouter } from "next/navigation";
import { createBlog } from "@/services/blogService";
import { BlogForm, type BlogFormData } from "@/components/shared/BlogForm";

export default function NewBlogPage() {
  const router = useRouter();

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const handleCreate = async (data: BlogFormData) => {
    const slug = generateSlug(data.title);
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    await createBlog({ ...data, slug, date });
    router.push("/admin/blogs");
    router.refresh();
  };

  return <BlogForm mode="create" onSubmit={handleCreate} />;
}
