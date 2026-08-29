"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useSWR from "swr";
import { ArrowLeft, Upload, X } from "lucide-react";
import { getTeamMemberById, updateTeamMember } from "@/services/teamService";
import { storage } from "@/lib/firebase";
import { optimizeImage } from "@/utils/imageOptimization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TeamMember } from "@/types";
import { ImageCropModal } from "@/components/shared/ImageCropModal";

function TeamEditForm({ member }: { member: TeamMember }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: member.name ?? "",
    role: member.role ?? "",
    experience: member.experience ?? "",
    projects: member.projects ?? "",
    status: member.status ?? "",
    professionalBiography: member.professionalBiography ?? member.bio ?? "",
    coreExpertise: Array.isArray(member.coreExpertise) ? member.coreExpertise.join(", ") : "",
    linkedinUrl: member.linkedinUrl ?? "",
    order: member.order ?? 0,
    imageUrl: member.imageUrl ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? parseInt(value) || 0 : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      const file = files[0];
      setCropImage(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCroppedAvatar = async (file: File) => {
    setPendingAvatarFile(file);
    setFormData((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
    setCropImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member.id) return;

    setIsSubmitting(true);
    try {
      let imageUrl = formData.imageUrl;
      if (pendingAvatarFile) {
        setUploadingImage(true);
        const optimizedFile = await optimizeImage(pendingAvatarFile, 1, 1024);
        const storageRef = ref(storage, `team/${Date.now()}_${pendingAvatarFile.name}`);
        await uploadBytes(storageRef, optimizedFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      await updateTeamMember(member.id, {
        ...formData,
        imageUrl,
        bio: formData.professionalBiography,
        coreExpertise: formData.coreExpertise.split(",").map((item) => item.trim()).filter(Boolean),
      });
      router.push("/admin/team");
      router.refresh();
    } catch (error) {
      console.error("Error updating team member:", error);
      alert("Failed to update team member. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadingImage(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Full Name</label>
          <Input required name="name" value={formData.name} onChange={handleChange} className="text-lg" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Role / Title</label>
          <Input name="role" value={formData.role} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Experience</label>
          <Input name="experience" value={formData.experience} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Projects</label>
          <Input name="projects" value={formData.projects} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Status</label>
          <Input name="status" value={formData.status} onChange={handleChange} />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Professional Biography</label>
          <Textarea name="professionalBiography" value={formData.professionalBiography} onChange={handleChange} rows={5} />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Core Expertise</label>
          <Textarea name="coreExpertise" value={formData.coreExpertise} onChange={handleChange} rows={3} />
          <p className="text-xs text-slate-500">Separate each expertise with a comma.</p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">LinkedIn URL</label>
          <Input name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Display Order</label>
            <Input type="number" required name="order" value={formData.order} onChange={handleChange} />
            <p className="text-xs text-slate-500">Lower numbers appear first.</p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Profile Image (Optional)</label>
            {formData.imageUrl ? (
              <div className="relative h-40 w-40 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <Image src={formData.imageUrl} alt="Profile" fill className="object-cover" />
                <button type="button" onClick={() => setFormData((prev) => ({ ...prev, imageUrl: "" }))} className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600 shadow-md">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <label className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition-colors hover:bg-slate-100">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="mb-2 h-6 w-6 text-slate-400" />
                  <span className="px-2 text-center text-xs font-medium text-slate-500">Upload Photo</span>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
              </label>
            )}
            {uploadingImage && <p className="text-xs font-medium text-blue-600 animate-pulse">Uploading...</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end sm:gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || uploadingImage} className="bg-[#1A3D7C] px-8 text-white hover:bg-[#15305F]">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <ImageCropModal
        open={Boolean(cropImage)}
        image={cropImage}
        aspect={1}
        title="Crop Profile Image"
        onCancel={() => setCropImage(null)}
        onCrop={handleCroppedAvatar}
      />
    </form>
  );
}

export default function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const { data: member, isLoading } = useSWR(id ? ["team-member", id] : null, () => getTeamMemberById(id as string));

  useEffect(() => {
    params.then(({ id: routeId }) => setId(routeId));
  }, [params]);

  if (isLoading && !member) {
    return <div className="p-8 text-slate-500">Loading team member...</div>;
  }

  if (!member) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto pb-20 px-4 sm:px-0">
        <div className="flex items-center gap-4">
          <Link href="/admin/team" className="text-slate-500 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Team member not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-20 px-4 sm:px-0">
      <div className="flex items-center gap-4">
        <Link href="/admin/team" className="text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Edit Team Member</h1>
      </div>

      <TeamEditForm member={member} />
    </div>
  );
}
