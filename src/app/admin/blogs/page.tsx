"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { getBlogs, deleteBlog } from "@/services/blogService";
import { BlogPost } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogoLoader } from "@/components/shared/LogoLoader";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function AdminBlogsPage() {
  const { data: blogs = [], isLoading, mutate } = useSWR("blogs_all", () => getBlogs(false));
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    toast({
      title: "Delete blog post?",
      description: "This action cannot be undone.",
      type: "info",
      cancelLabel: "Cancel",
      actionLabel: "Delete",
      onAction: async () => {
        try {
          await deleteBlog(id);
          mutate();
          toast({ title: "Blog deleted", type: "success" });
        } catch (error) {
          console.error("Error deleting blog:", error);
          toast({ title: "Delete failed", description: "Please try again.", type: "error" });
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Manage Blogs</h1>
        <Link href="/admin/blogs/new">
          <Button className="bg-[#1A3D7C] hover:bg-[#15305F] text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><LogoLoader /></div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No blogs found. Create your first post!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500">
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{blog.title}</td>
                    <td className="p-4 text-slate-600">{blog.category}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        blog.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{blog.date}</td>
                    <td className="p-4 text-right flex items-center justify-end gap-2">
                      <Link href={`/admin/blogs/${blog.id}`} className={buttonVariants({ variant: "outline", size: "sm", className: "text-slate-600" })}>
                        <Edit className="w-4 h-4" />
                      </Link>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(blog.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
