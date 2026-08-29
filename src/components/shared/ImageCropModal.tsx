"use client";

import { useCallback, useMemo, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

type Props = {
  open: boolean;
  image: string | null;
  aspect: number;
  title: string;
  onCancel: () => void;
  onCrop: (file: File) => void;
};

const createCroppedImage = async (imageSrc: string, crop: Area): Promise<File> => {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context unavailable");
  }

  canvas.width = crop.width;
  canvas.height = crop.height;
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
  if (!blob) throw new Error("Unable to crop image");
  return new File([blob], `cropped-${Date.now()}.jpg`, { type: "image/jpeg" });
};

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

export function ImageCropModal({ open, image, aspect, title, onCancel, onCrop }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const reset = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  }, []);

  const handleCancel = useCallback(() => {
    reset();
    onCancel();
  }, [onCancel, reset]);

  const handleCrop = useCallback(async () => {
    if (!image || !croppedAreaPixels) return;
    const file = await createCroppedImage(image, croppedAreaPixels);
    reset();
    onCrop(file);
  }, [croppedAreaPixels, image, onCrop, reset]);

  const modal = useMemo(() => {
    if (!open || !image) return null;

    return (
      <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/70 p-4">
        <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <button type="button" onClick={handleCancel} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
              Cancel
            </button>
          </div>
          <div className="relative h-[60vh] bg-slate-900">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
            />
          </div>
          <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-slate-700">Zoom</label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.01"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={handleCancel} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Cancel
              </button>
              <button type="button" onClick={handleCrop} className="rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary/90">
                Use Crop
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [aspect, crop, handleCancel, handleCrop, image, open, title, zoom]);

  return modal;
}
