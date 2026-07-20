"use client";

import { useState } from "react";

interface Props {
  images?: string[] | null;
  name: string;
}

const PLACEHOLDER = "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=800&h=600&fit=crop";

export default function ProductGallery({ images, name }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Безопасно получаем массив
  const safeImages: string[] = Array.isArray(images) && images.length > 0
    ? images
    : [PLACEHOLDER];

  const next = () => setActiveIndex((prev) => (prev + 1) % safeImages.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);

  return (
    <div>
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden mb-4 aspect-[4/3]">
        <img
          src={safeImages[activeIndex] || PLACEHOLDER}
          alt={`${name} — фото ${activeIndex + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Если фото не загрузилось — показываем заглушку
            (e.target as HTMLImageElement).src = PLACEHOLDER;
          }}
        />

        {safeImages.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {safeImages.length > 1 && (
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/50 text-white text-xs font-medium">
            {activeIndex + 1} / {safeImages.length}
          </div>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {safeImages.map((img, i) => (
            <button key={i} onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                i === activeIndex ? "border-green-500 ring-2 ring-green-500/20" : "border-gray-200 opacity-60 hover:opacity-100"
              }`}>
              <img src={img} alt="" className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}