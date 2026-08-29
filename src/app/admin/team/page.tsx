"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { getTeamMembers, deleteTeamMember } from "@/services/teamService";
import { TeamMember } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogoLoader } from "@/components/shared/LogoLoader";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function AdminTeamPage() {
  const { data: teamMembers = [], isLoading, mutate } = useSWR("team", getTeamMembers);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    toast({
      title: "Delete team member?",
      description: "This action cannot be undone.",
      type: "info",
      cancelLabel: "Cancel",
      actionLabel: "Delete",
      onAction: async () => {
        try {
          await deleteTeamMember(id);
          mutate();
          toast({ title: "Team member deleted", type: "success" });
        } catch (error) {
          console.error("Error deleting team member:", error);
          toast({ title: "Delete failed", description: "Please try again.", type: "error" });
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Manage Team</h1>
        <Link href="/admin/team/new">
          <Button className="bg-[#1A3D7C] hover:bg-[#15305F] text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Member
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><LogoLoader /></div>
        ) : teamMembers.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No team members found. Add your first member!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500">
                  <th className="p-4 w-20">Avatar</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Order</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-brand-primary font-bold overflow-hidden">
                        {member.imageUrl ? (
                          <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          member.name.split(" ").map((n) => n[0]).join("")
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-900">{member.name}</td>
                    <td className="p-4 text-slate-600">{member.role}</td>
                    <td className="p-4 text-slate-600">{member.order}</td>
                    <td className="p-4 text-right flex items-center justify-end gap-2">
                      <Link href={`/admin/team/${member.id}`} className={buttonVariants({ variant: "outline", size: "sm", className: "text-slate-600" })}>
                        <Edit className="w-4 h-4" />
                      </Link>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(member.id)}>
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
