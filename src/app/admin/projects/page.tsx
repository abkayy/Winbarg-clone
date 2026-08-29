"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { getProjects, deleteProject } from "@/services/projectService";
import { Project } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogoLoader } from "@/components/shared/LogoLoader";
import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/toast";

export default function AdminProjectsPage() {
  const { data: projects = [], isLoading, mutate } = useSWR("projects", getProjects);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    toast({
      title: "Delete project?",
      description: "This action cannot be undone.",
      type: "info",
      cancelLabel: "Cancel",
      actionLabel: "Delete",
      onAction: async () => {
        try {
          await deleteProject(id);
          mutate();
          toast({ title: "Project deleted", type: "success" });
        } catch (error) {
          console.error("Error deleting project:", error);
          toast({ title: "Delete failed", description: "Please try again.", type: "error" });
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Manage Projects</h1>
        <Link href="/admin/projects/new">
          <Button className="bg-[#1A3D7C] hover:bg-[#15305F] text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><LogoLoader /></div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No projects found. Create your first project!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500">
                  <th className="p-4 w-20">Image</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Location</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-200 relative">
                        {project.featuredImage ? (
                          <Image src={project.featuredImage} alt={project.title} fill className="object-cover" />
                        ) : project.images?.[0] ? (
                          <Image src={project.images[0]} alt={project.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No img</div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-900">{project.title}</td>
                    <td className="p-4 text-slate-600">{project.category}</td>
                    <td className="p-4 text-slate-600">{project.location}</td>
                    <td className="p-4 text-right flex items-center justify-end gap-2 h-[80px]">
                      <Link href={`/admin/projects/${project.id}`} className={buttonVariants({ variant: "outline", size: "sm", className: "text-slate-600" })}>
                        <Edit className="w-4 h-4" />
                      </Link>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(project.id)}>
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
