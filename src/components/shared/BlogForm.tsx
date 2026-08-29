"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Upload, X, FileText, Settings, ImageIcon, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageCropModal } from "@/components/shared/ImageCropModal";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { optimizeImage } from "@/utils/imageOptimization";
import type { BlogPost } from "@/types";

// MDXEditor must be client-only (uses browser DOM APIs)
const MarkdownEditor = dynamic(
  () => import("@/components/shared/MarkdownEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-slate-200 bg-slate-50 min-h-[420px] flex items-center justify-center">
        <p className="text-sm text-slate-400 animate-pulse font-['Plus_Jakarta_Sans']">
          Loading editor…
        </p>
      </div>
    ),
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogFormData {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  featured: boolean;
  published: boolean;
  content: string;
  coverImage: string;
}

interface BlogFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<BlogPost>;
  onSubmit: (data: BlogFormData, coverImageFile: File | null) => Promise<void>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// ─── Section wrapper ──────────────────────────────────────────────────────────

function FormSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1A3D7C]/10 text-[#1A3D7C]">
          {icon}
        </span>
        <h2 className="text-sm font-semibold text-slate-700 font-['Plus_Jakarta_Sans'] uppercase tracking-wider">
          {title}
        </h2>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
}

// ─── Toggle switch ────────────────────────────────────────────────────────────

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer group">
      <div>
        <p className="text-sm font-medium text-slate-800 font-['Plus_Jakarta_Sans']">{label}</p>
        <p className="text-xs text-slate-500 font-['Plus_Jakarta_Sans'] mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3D7C] focus-visible:ring-offset-2 ${
          checked ? "bg-[#1A3D7C]" : "bg-slate-200"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function BlogForm({ mode, defaultValues, onSubmit }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cover image state
  const [coverImageUrl, setCoverImageUrl] = useState(defaultValues?.coverImage ?? "");
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [pendingCoverFile, setPendingCoverFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Content state
  const [content, setContent] = useState(defaultValues?.content ?? "");

  // All other fields
  const [fields, setFields] = useState<Omit<BlogFormData, "content" | "coverImage">>({
    title: defaultValues?.title ?? "",
    excerpt: defaultValues?.excerpt ?? "",
    category: defaultValues?.category ?? "",
    author: defaultValues?.author ?? "",
    readTime: defaultValues?.readTime ?? "",
    featured: defaultValues?.featured ?? false,
    published: defaultValues?.published ?? false,
  });

  const handleField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  // ── Cover image ──────────────────────────────────────────────────────────

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCropImage(URL.createObjectURL(file));
    // reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleCroppedCover = (file: File) => {
    setPendingCoverFile(file);
    setCoverImageUrl(URL.createObjectURL(file));
    setCropImage(null);
  };

  const removeCoverImage = () => {
    setCoverImageUrl("");
    setPendingCoverFile(null);
  };

  // ── Submit ───────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("Content cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      let resolvedCoverUrl = coverImageUrl;

      // Upload cover image if a new file was cropped
      if (pendingCoverFile) {
        setUploadingImage(true);
        const optimized = await optimizeImage(pendingCoverFile, 1.5, 1920);
        const storageRef = ref(
          storage,
          `blogs/${Date.now()}_${pendingCoverFile.name}`
        );
        await uploadBytes(storageRef, optimized);
        resolvedCoverUrl = await getDownloadURL(storageRef);
        setUploadingImage(false);
      }

      await onSubmit(
        { ...fields, content, coverImage: resolvedCoverUrl },
        pendingCoverFile
      );
    } catch (err) {
      console.error("BlogForm submit error:", err);
      alert("Failed to save. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadingImage(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24 px-4 sm:px-0">
      {/* Page header */}
      <div className="flex items-center gap-4 bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
        <Link
          href="/admin/blogs"
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
            {mode === "create" ? "Create New Blog Post" : "Edit Blog Post"}
          </h1>
          <p className="text-xs text-slate-500 font-['Plus_Jakarta_Sans'] mt-0.5">
            {mode === "create"
              ? "Fill in the details below and publish when ready."
              : "Update the post details, then save your changes."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ── Post Details ────────────────────────────────────────────── */}
        <FormSection icon={<FileText className="w-4 h-4" />} title="Post Details">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 font-['Plus_Jakarta_Sans']">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              required
              name="title"
              value={fields.title}
              onChange={handleField}
              placeholder="e.g. The Future of Sustainable Construction in Africa"
              className="text-base h-11"
            />
            {fields.title && (
              <p className="text-xs text-slate-400 font-['Plus_Jakarta_Sans'] font-mono">
                /blog/
                <span className="text-[#1A3D7C]">{generateSlug(fields.title)}</span>
              </p>
            )}
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 font-['Plus_Jakarta_Sans']">
              Excerpt / Summary <span className="text-red-500">*</span>
            </label>
            <Textarea
              required
              name="excerpt"
              value={fields.excerpt}
              onChange={handleField}
              placeholder="A compelling one-to-two sentence summary shown on the blog listing…"
              rows={3}
            />
            <p className="text-xs text-slate-400 font-['Plus_Jakarta_Sans']">
              {fields.excerpt.length}/200 characters recommended
            </p>
          </div>

          {/* Category / Author / ReadTime — 3 col */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 font-['Plus_Jakarta_Sans']">
                Category <span className="text-red-500">*</span>
              </label>
              <Input
                required
                name="category"
                value={fields.category}
                onChange={handleField}
                placeholder="Industry Insights"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 font-['Plus_Jakarta_Sans']">
                Author Name <span className="text-red-500">*</span>
              </label>
              <Input
                required
                name="author"
                value={fields.author}
                onChange={handleField}
                placeholder="Jane Doe"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 font-['Plus_Jakarta_Sans']">
                Read Time <span className="text-red-500">*</span>
              </label>
              <Input
                required
                name="readTime"
                value={fields.readTime}
                onChange={handleField}
                placeholder="5 min read"
              />
            </div>
          </div>
        </FormSection>

        {/* ── Cover Image ─────────────────────────────────────────────── */}
        <FormSection icon={<ImageIcon className="w-4 h-4" />} title="Cover Image">
          {coverImageUrl ? (
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
              <Image
                src={coverImageUrl}
                alt="Cover preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <button
                type="button"
                onClick={removeCoverImage}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="absolute bottom-3 right-3 bg-white/90 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg hover:bg-white transition-colors font-['Plus_Jakarta_Sans'] opacity-0 group-hover:opacity-100"
              >
                Change image
              </button>
            </div>
          ) : (
            <label
              htmlFor="cover-upload"
              className="flex flex-col items-center justify-center w-full aspect-[16/9] border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-[#1A3D7C]/40 transition-all group"
            >
              <div className="flex flex-col items-center gap-3 text-slate-400 group-hover:text-[#1A3D7C] transition-colors">
                <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#1A3D7C]/10 flex items-center justify-center transition-colors">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold font-['Plus_Jakarta_Sans']">
                    Upload cover photo
                  </p>
                  <p className="text-xs mt-0.5 font-['Plus_Jakarta_Sans']">
                    16:9 recommended — JPG, PNG, WebP up to 10 MB
                  </p>
                </div>
              </div>
            </label>
          )}

          <input
            ref={coverInputRef}
            id="cover-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverFileChange}
            disabled={uploadingImage}
          />
          {uploadingImage && (
            <p className="text-xs text-[#1A3D7C] font-medium animate-pulse font-['Plus_Jakarta_Sans']">
              Uploading cover image…
            </p>
          )}
        </FormSection>

        {/* ── Content ─────────────────────────────────────────────────── */}
        <FormSection icon={<AlignLeft className="w-4 h-4" />} title="Content">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 font-['Plus_Jakarta_Sans']">
                Article Body <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-slate-400 font-['Plus_Jakarta_Sans']">
                Markdown supported
              </span>
            </div>
            <MarkdownEditor
              value={content}
              onChange={setContent}
              placeholder="Start writing your article…"
            />
          </div>
        </FormSection>

        {/* ── Settings ────────────────────────────────────────────────── */}
        <FormSection icon={<Settings className="w-4 h-4" />} title="Publishing Settings">
          <div className="space-y-4 divide-y divide-slate-100">
            <Toggle
              label="Feature this post"
              description="Pinned as the hero article on the blog listing page."
              checked={fields.featured}
              onChange={(v) => setFields((p) => ({ ...p, featured: v }))}
            />
            <div className="pt-4">
              <Toggle
                label="Publish immediately"
                description="When off the post is saved as a draft and hidden from public view."
                checked={fields.published}
                onChange={(v) => setFields((p) => ({ ...p, published: v }))}
              />
            </div>
          </div>
        </FormSection>

        {/* ── Actions ─────────────────────────────────────────────────── */}
        <div className="sticky bottom-0 z-20 bg-white/80 backdrop-blur-sm border-t border-slate-200 -mx-4 sm:mx-0 px-4 sm:px-0 py-4 sm:rounded-xl sm:border sm:shadow-sm">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-3 max-w-5xl mx-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="font-['Plus_Jakarta_Sans']"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || uploadingImage}
              className="bg-[#1A3D7C] hover:bg-[#15305F] text-white px-8 font-['Plus_Jakarta_Sans']"
            >
              {isSubmitting
                ? uploadingImage
                  ? "Uploading image…"
                  : "Saving…"
                : mode === "create"
                  ? fields.published
                    ? "Publish Post"
                    : "Save Draft"
                  : fields.published
                    ? "Save & Publish"
                    : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>

      {/* Crop modal */}
      <ImageCropModal
        open={Boolean(cropImage)}
        image={cropImage}
        aspect={16 / 9}
        title="Crop Cover Image"
        onCancel={() => setCropImage(null)}
        onCrop={handleCroppedCover}
      />
    </div>
  );
}
