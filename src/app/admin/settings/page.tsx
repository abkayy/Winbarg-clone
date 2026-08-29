"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings, Save } from "lucide-react";
import { getSiteStats, updateSiteStats } from "@/services/settingsService";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const statsSchema = z.object({
  projectsCompleted: z.string().min(1, "Required"),
  happyFamilies: z.string().min(1, "Required"),
  awardsWon: z.string().min(1, "Required"),
  yearFounded: z.string().min(1, "Required"),
});

type StatsFormData = z.infer<typeof statsSchema>;

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StatsFormData>({
    resolver: zodResolver(statsSchema),
    defaultValues: {
      projectsCompleted: "50+",
      happyFamilies: "200+",
      awardsWon: "15+",
      yearFounded: "2022",
    },
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await getSiteStats();
        reset(stats);
      } catch (error) {
        console.error("Failed to load site stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, [reset]);

  const onSubmit = async (data: StatsFormData) => {
    setIsSaving(true);
    try {
      await updateSiteStats(data);
      toast({
        title: "Settings saved",
        description: "Your changes have been saved successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1A3D7C]" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6 pb-12 font-['Plus_Jakarta_Sans']">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="mt-2 text-slate-600">Admin configuration and preferences.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1A3D7C]/10 text-[#1A3D7C]">
            <Settings className="w-4 h-4" />
          </span>
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Site Statistics (About Page)
          </h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Projects Completed */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Projects Completed <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("projectsCompleted")}
                  placeholder="e.g. 50+"
                  className="h-11"
                />
                {errors.projectsCompleted && (
                  <p className="text-xs text-red-500">{errors.projectsCompleted.message}</p>
                )}
              </div>

              {/* Happy Families */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Happy Families <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("happyFamilies")}
                  placeholder="e.g. 200+"
                  className="h-11"
                />
                {errors.happyFamilies && (
                  <p className="text-xs text-red-500">{errors.happyFamilies.message}</p>
                )}
              </div>

              {/* Awards Won */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Awards Won <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("awardsWon")}
                  placeholder="e.g. 15+"
                  className="h-11"
                />
                {errors.awardsWon && (
                  <p className="text-xs text-red-500">{errors.awardsWon.message}</p>
                )}
              </div>

              {/* Year Founded */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Year Founded <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("yearFounded")}
                  placeholder="e.g. 2022"
                  className="h-11"
                />
                {errors.yearFounded && (
                  <p className="text-xs text-red-500">{errors.yearFounded.message}</p>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-[#1A3D7C] hover:bg-[#15305F] text-white px-8 h-11"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
