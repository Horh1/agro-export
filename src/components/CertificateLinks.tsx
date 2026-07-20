"use client";

const certificates = [
  { name: "Сертификат ГОСТ Р", file: "#" },
  { name: "Фитосанитарный сертификат", file: "#" },
  { name: "Декларация о соответствии", file: "#" },
  { name: "Протокол испытаний", file: "#" },
];

export default function CertificateLinks() {
  return (
    <div className="flex flex-col gap-2">
      {certificates.map((cert) => (
        <a
          key={cert.name}
          href={cert.file}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm group"
          onClick={(e) => {
            if (cert.file === "#") e.preventDefault();
          }}
        >
          <svg
            className="w-4 h-4 text-green-400 flex-shrink-0 group-hover:text-green-300 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {cert.name}
        </a>
      ))}
    </div>
  );
}