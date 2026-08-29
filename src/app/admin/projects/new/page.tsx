"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/services/projectService";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { optimizeImage } from "@/utils/imageOptimization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ImageCropModal } from "@/components/shared/ImageCropModal";

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    keyChallenges: "",
    sustainableFeatures: "",
    client: "",
    completionDate: "",
    featured: false,
    featuredImage: "",
    images: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isFeatured: boolean = false) => {
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
        setFormData(prev => ({ ...prev, images: newImages }));
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
    setFormData(prev => ({ ...prev, images: newImages }));
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

    setIsSubmitting(true);
    try {
      await createProject({
        ...formData,
        keyChallenges: formData.keyChallenges.split(",").map((item) => item.trim()).filter(Boolean),
        sustainableFeatures: formData.sustainableFeatures.split(",").map((item) => item.trim()).filter(Boolean),
      });
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 px-4 sm:px-0">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects" className="text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">Create New Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Project Title</label>
            <Input required name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Azure Heights Villa" className="text-lg" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Category</label>
            <Input name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Residential" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Location</label>
            <Input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Victoria Island, Lagos" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Client</label>
            <Input name="client" value={formData.client} onChange={handleChange} placeholder="e.g. Private Investor" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Completion Date</label>
            <Input name="completionDate" value={formData.completionDate} onChange={handleChange} placeholder="e.g. 2025" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Project details and scope..." rows={4} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Key Challenges</label>
            <Textarea name="keyChallenges" value={formData.keyChallenges} onChange={handleChange} placeholder="Challenge 1, Challenge 2, Challenge 3" rows={3} />
            <p className="text-xs text-slate-500">Separate each challenge with a comma.</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Sustainable Features</label>
            <Textarea name="sustainableFeatures" value={formData.sustainableFeatures} onChange={handleChange} placeholder="Feature 1, Feature 2, Feature 3" rows={3} />
            <p className="text-xs text-slate-500">Separate each feature with a comma.</p>
          </div>

          <div className="space-y-4 md:col-span-2 flex items-center gap-8 py-2 border-y border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 text-brand-primary rounded border-slate-300 focus:ring-brand-primary" />
              <span className="text-sm font-medium text-slate-700">Featured Project (Show on Homepage)</span>
            </label>
          </div>
        </div>

        {/* Image Uploads */}
        <div className="space-y-6 pt-4">
          <div className="space-y-4">
            <label className="text-sm font-medium text-slate-700 block">Featured Image (Cover)</label>
            {formData.featuredImage ? (
              <div className="relative w-full h-64 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <Image src={formData.featuredImage} alt="Cover" fill className="object-cover" />
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, featuredImage: "" }))} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-slate-400">PNG, JPG, WEBP (Max 1MB - Auto-optimized)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, true)} disabled={uploadingImage} />
              </label>
            )}
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-slate-700 block">Gallery Images</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              
              <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-6 h-6 text-slate-400 mb-2" />
                  <span className="text-xs text-slate-500 font-medium">Add Image</span>
                </div>
                <input type="file" className="hidden" accept="image/*" multiple onChange={(e) => handleImageUpload(e, false)} disabled={uploadingImage} />
              </label>
            </div>
          </div>
          
        {uploadingImage && <p className="text-sm text-blue-600 animate-pulse font-medium">Optimizing and uploading image(s)...</p>}
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
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting || uploadingImage} className="bg-[#1A3D7C] hover:bg-[#15305F] text-white px-8">
            {isSubmitting ? "Saving..." : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
