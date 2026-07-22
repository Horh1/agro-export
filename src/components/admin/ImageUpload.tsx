"use client";

import { useState } from "react";

interface Props {
  images: string[];
  onChange: (urls: string[]) => void;
}

export default function ImageUpload({ images, onChange }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await fetch("https://api.imgbb.com/1/upload?key=98e7a0b0c70e4b8c6e9d5f6a7b8c9d0e", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success) onChange([...images, data.data.url]);
      } catch (err) {
        console.error("Upload error:", err);
      }
    }
    setUploading(false);
  };

  return (
    <div className="space-y-3">
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => onChange(images.filter((_, j) => j !== i))}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600">×</button>
            </div>
          ))}
        </div>
      )}
      <label className="inline-flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 text-sm font-medium cursor-pointer">
        {uploading ? "Загрузка..." : "📷 Выбрать фото"}
        <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" disabled={uploading} />
      </label>
    </div>
  );
}
