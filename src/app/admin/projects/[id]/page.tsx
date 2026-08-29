"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useSWR from "swr";
import { ArrowLeft, Upload, X } from "lucide-react";
import { getProjectById, updateProject } from "@/services/projectService";
import { storage } from "@/lib/firebase";
import { optimizeImage } from "@/utils/imageOptimization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Project } from "@/types";
import { ImageCropModal } from "@/components/shared/ImageCropModal";

function ProjectEditForm({ project }: { project: Project }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: project.title ?? "",
    category: project.category ?? "",
    location: project.location ?? "",
    description: project.description ?? "",
    keyChallenges: Array.isArray(project.keyChallenges) ? project.keyChallenges.join(", ") : "",
    sustainableFeatures: Array.isArray(project.sustainableFeatures) ? project.sustainableFeatures.join(", ") : "",
    client: project.client ?? "",
    completionDate: project.completionDate ?? "",
    featured: Boolean(project.featured),
    featuredImage: project.featuredImage ?? "",
    images: project.images ?? [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isFeatured = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      const newImages = [...formData.images];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (isFeatured) {
          setCropImage(URL.createObjectURL(file));
          break;
        } else {
          const optimizedFile = await optimizeImage(file, 1, 1920);
          const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
          await uploadBytes(storageRef, optimizedFile);
          const url = await getDownloadURL(storageRef);
          newImages.push(url);
        }
      }

      if (!isFeatured) {
        setFormData((prev) => ({ ...prev, images: newImages }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleCroppedFeaturedImage = async (file: File) => {
    setUploadingImage(true);
    try {
      const optimizedFile = await optimizeImage(file, 1, 1920);
      const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, optimizedFile);
      const url = await getDownloadURL(storageRef);
      setFormData((prev) => ({ ...prev, featuredImage: url }));
    } finally {
      setUploadingImage(false);
      setCropImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project.id) return;
    if (!formData.featuredImage && formData.images.length === 0) {
      return alert("At least one image is required.");
    }

    setIsSubmitting(true);
    try {
      await updateProject(project.id, {
        ...formData,
        keyChallenges: formData.keyChallenges.split(",").map((item) => item.trim()).filter(Boolean),
        sustainableFeatures: formData.sustainableFeatures.split(",").map((item) => item.trim()).filter(Boolean),
      });
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Project Title</label>
          <Input required name="title" value={formData.title} onChange={handleChange} className="text-lg" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Category</label>
          <Input name="category" value={formData.category} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Location</label>
          <Input name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Client</label>
          <Input name="client" value={formData.client} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Completion Date</label>
          <Input name="completionDate" value={formData.completionDate} onChange={handleChange} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Description</label>
          <Textarea name="description" value={formData.description} onChange={handleChange} rows={4} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Key Challenges</label>
          <Textarea name="keyChallenges" value={formData.keyChallenges} onChange={handleChange} rows={3} />
          <p className="text-xs text-slate-500">Separate each challenge with a comma.</p>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Sustainable Features</label>
          <Textarea name="sustainableFeatures" value={formData.sustainableFeatures} onChange={handleChange} rows={3} />
          <p className="text-xs text-slate-500">Separate each feature with a comma.</p>
        </div>
        <div className="flex flex-col gap-4 py-2 md:col-span-2 md:flex-row md:items-center md:gap-8 md:border-y md:border-slate-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 rounded border-slate-300 text-brand-primary focus:ring-brand-primary" />
            <span className="text-sm font-medium text-slate-700">Featured Project (Show on Homepage)</span>
          </label>
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Featured Image (Cover)</label>
          {formData.featuredImage ? (
            <div className="relative h-64 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <Image src={formData.featuredImage} alt="Cover" fill className="object-cover" />
              <button type="button" onClick={() => setFormData((prev) => ({ ...prev, featuredImage: "" }))} className="absolute right-4 top-4 rounded-full bg-red-500 p-2 text-white hover:bg-red-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition-colors hover:bg-slate-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="mb-2 h-8 w-8 text-slate-400" />
                <p className="mb-2 text-sm text-slate-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-400">PNG, JPG, WEBP (Max 1MB - Auto-optimized)</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, true)} disabled={uploadingImage} />
            </label>
          )}
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Gallery Images</label>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {formData.images.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
                <button type="button" onClick={() => removeImage(i)} className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}

            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition-colors hover:bg-slate-100">
              <div className="flex flex-col items-center justify-center">
                <Upload className="mb-2 h-6 w-6 text-slate-400" />
                <span className="text-xs font-medium text-slate-500">Add Image</span>
              </div>
              <input type="file" className="hidden" accept="image/*" multiple onChange={(e) => handleImageUpload(e, false)} disabled={uploadingImage} />
            </label>
          </div>
        </div>

        {uploadingImage && <p className="text-sm font-medium text-blue-600 animate-pulse">Optimizing and uploading image(s)...</p>}
      </div>

      <ImageCropModal
        open={Boolean(cropImage)}
        image={cropImage}
        aspect={16 / 9}
        title="Crop Featured Image"
        onCancel={() => setCropImage(null)}
        onCrop={handleCroppedFeaturedImage}
      />

      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end sm:gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || uploadingImage} className="bg-[#1A3D7C] px-8 text-white hover:bg-[#15305F]">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const { data: project, isLoading } = useSWR(id ? ["project", id] : null, () => getProjectById(id as string));

  useEffect(() => {
    params.then(({ id: routeId }) => setId(routeId));
  }, [params]);

  if (isLoading && !project) {
    return <div className="p-8 text-slate-500">Loading project...</div>;
  }

  if (!project) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto pb-20 px-4 sm:px-0">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="text-slate-500 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Project not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 px-4 sm:px-0">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects" className="text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Edit Project</h1>
      </div>

      <ProjectEditForm project={project} />
    </div>
  );
}
