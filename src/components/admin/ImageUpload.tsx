"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { X } from "lucide-react";

interface Props {
  images: string[];
  onChange: (urls: string[]) => void;
}

export default function ImageUpload({ images, onChange }: Props) {
  return (
    <div className="space-y-3">
      {/* Предпросмотр загруженных фото */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChange(images.filter((_, j) => j !== i))}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}


      {/* Кнопка загрузки */}
      <UploadButton<OurFileRouter, "productImages">
        endpoint="productImages"
        onClientUploadComplete={(res) => {
          const newUrls = res?.map((r) => r.ufsUrl || r.url) ?? [];
          onChange([...images, ...newUrls]);
        }}
        onUploadError={(error) => {
          alert("Ошибка загрузки: " + error.message);
        }}
        appearance={{
          button:
            "px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 text-sm font-medium cursor-pointer",
          container: "flex flex-col items-start gap-2",
          allowedContent: "text-xs text-gray-400",
        }}
        content={{
          button: "📷 Выбрать фото",
          allowedContent: "До 4 фото, макс. 4 МБ",
        }}
      />
    </div>
  );
}