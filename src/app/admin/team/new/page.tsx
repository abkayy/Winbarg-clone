"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTeamMember } from "@/services/teamService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { optimizeImage } from "@/utils/imageOptimization";
import { ImageCropModal } from "@/components/shared/ImageCropModal";

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    experience: "",
    projects: "",
    status: "",
    professionalBiography: "",
    coreExpertise: "",
    linkedinUrl: "",
    order: 0,
    imageUrl: "",
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

      await createTeamMember({
        ...formData,
        imageUrl,
        bio: formData.professionalBiography,
        coreExpertise: formData.coreExpertise.split(",").map((item) => item.trim()).filter(Boolean),
      });
      router.push("/admin/team");
      router.refresh();
    } catch (error) {
      console.error("Error adding team member:", error);
      alert("Failed to add member. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadingImage(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-20 px-4 sm:px-0">
      <div className="flex items-center gap-4">
        <Link href="/admin/team" className="text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Add Team Member</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <Input required name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Oluwaseun Adeyemi" className="text-lg" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Role / Title</label>
            <Input name="role" value={formData.role} onChange={handleChange} placeholder="e.g. Chief Executive Officer" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Experience</label>
            <Input name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 15+ Years" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Projects</label>
            <Input name="projects" value={formData.projects} onChange={handleChange} placeholder="e.g. 50+ Premier Builds" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Status</label>
            <Input name="status" value={formData.status} onChange={handleChange} placeholder="e.g. Certified LEED AP" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Professional Biography</label>
            <Textarea name="professionalBiography" value={formData.professionalBiography} onChange={handleChange} placeholder="Detailed professional biography..." rows={5} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Core Expertise</label>
            <Textarea name="coreExpertise" value={formData.coreExpertise} onChange={handleChange} placeholder="Sustainable Design, Structural Engineering, Urban Planning" rows={3} />
            <p className="text-xs text-slate-500">Separate each expertise with a comma.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">LinkedIn URL</label>
            <Input name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Display Order</label>
              <Input type="number" required name="order" value={formData.order} onChange={handleChange} placeholder="0" />
              <p className="text-xs text-slate-500">Lower numbers appear first.</p>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-slate-700 block">Profile Image (Optional)</label>
              {formData.imageUrl ? (
                <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <Image src={formData.imageUrl} alt="Profile" fill className="object-cover" />
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, imageUrl: "" }))} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-xs text-slate-500 font-medium text-center px-2">Upload Photo</span>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                </label>
              )}
              {uploadingImage && <p className="text-xs text-blue-600 animate-pulse font-medium">Uploading...</p>}
            </div>
          </div>
        </div>
        <ImageCropModal
          open={Boolean(cropImage)}
          image={cropImage}
          aspect={1}
          title="Crop Profile Image"
          onCancel={() => setCropImage(null)}
          onCrop={handleCroppedAvatar}
        />

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end sm:gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting || uploadingImage} className="bg-[#1A3D7C] hover:bg-[#15305F] text-white px-8">
            {isSubmitting ? "Saving..." : "Add Member"}
          </Button>
        </div>
      </form>
    </div>
  );
}
