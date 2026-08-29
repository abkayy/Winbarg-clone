"use client";

import useSWR from "swr";
import { getContactMessages } from "@/services/contactService";
import { getBlogs } from "@/services/blogService";
import { getProjects } from "@/services/projectService";
import { getTeamMembers } from "@/services/teamService";

export default function AdminDashboard() {
  const { data: messages = [] } = useSWR("messages", getContactMessages);
  const { data: blogs = [] } = useSWR("blogs_all", () => getBlogs(false));
  const { data: projects = [] } = useSWR("projects", getProjects);
  const { data: team = [] } = useSWR("team", getTeamMembers);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Messages" value={messages.length.toString()} />
        <StatCard title="Total Blogs" value={blogs.length.toString()} />
        <StatCard title="Total Projects" value={projects.length.toString()} />
        <StatCard title="Team Members" value={team.length.toString()} />
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4 font-['Plus_Jakarta_Sans']">Recent Activity</h2>
        <p className="text-slate-500">Welcome back to the Winbarg Homes Admin Portal. Use the sidebar to manage your content.</p>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-2">
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <p className="text-3xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">{value}</p>
    </div>
  );
}
