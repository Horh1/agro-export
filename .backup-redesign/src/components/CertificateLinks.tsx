"use client";

const certificates = [
  {
    name: "Декларации о соответствии",
    url: "https://drive.google.com/drive/folders/1eib6-PmPqOI6HNoz0UTqDtPHpwgN0vPC?usp=drive_link",
    icon: "📜",
  },
  {
    name: "Протоколы испытаний",
    url: "https://drive.google.com/drive/folders/16mXpNOTAPNFOL9jIGi-29RmrbPxE5NQ_?usp=drive_link",
    icon: "🔬",
  },
];

export default function CertificateLinks() {
  return (
    <div className="flex flex-col gap-2">
      {certificates.map((cert) => (
        <a
          key={cert.name}
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm group"
        >
          <span className="text-base">{cert.icon}</span>
          <span>{cert.name}</span>
          <svg className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      ))}
    </div>
  );
}
