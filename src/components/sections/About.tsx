"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sprout, Warehouse, Truck, Shield, Leaf, FileText } from "lucide-react";
import { useContent } from "@/hooks/useContent";

interface SectionInfo {
  id: string;
  title: string;
  description: string;
  images: string[];
  icon: string;
  link?: string | null;
}

const iconMap: Record<string, any> = {
  "🌱": Sprout,
  "🏭": Warehouse,
  "🚛": Truck,
  "📋": Shield,
};

const gradients = [
  "from-green-600 to-emerald-400",
  "from-amber-600 to-yellow-400",
  "from-blue-600 to-cyan-400",
  "from-purple-600 to-pink-400",
];

function parseLinks(link: string) {
  const pairs = link.split("|").map((s) => s.trim());
  const links: { label: string; url: string }[] = [];
  for (let i = 0; i < pairs.length - 1; i += 2) {
    if (pairs[i] && pairs[i + 1]) {
      links.push({ label: pairs[i], url: pairs[i + 1] });
    }
  }
  return links;
}

export default function About() {
  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [activeSection, setActiveSection] = useState<SectionInfo | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const content = useContent();

  useEffect(() => {
    fetch("/api/sections")
      .then((r) => r.json())
      .then((data) => setSections(data.sections || []))
      .catch(() => {});
  }, []);

  const nextImage = () => {
    if (!activeSection) return;
    setCurrentImage((prev) => (prev + 1) % activeSection.images.length);
  };

  const prevImage = () => {
    if (!activeSection) return;
    setCurrentImage((prev) => (prev - 1 + activeSection.images.length) % activeSection.images.length);
  };

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-forest-50/50 rounded-full blur-[120px] -z-10" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-50 text-forest-700 text-sm font-semibold mb-6">
              <Leaf className="w-4 h-4" />
              {content.about_badge || "О компании"}
            </span>
            <h2 className="heading-lg text-gray-900 mb-6">
              {content.about_title || "Корсунский кооператив — надёжный поставщик"}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6 text-lg">
              {content.about_desc1 || "Наше предприятие — это современный агропромышленный комплекс полного цикла."}
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              {content.about_desc2 || "Работаем напрямую, без посредников."}
            </p>

            <div className="flex flex-wrap gap-8">
              {[
                { value: content.about_stat1_value || "20+", label: content.about_stat1_label || "лет на рынке" },
                { value: content.about_stat2_value || "100+", label: content.about_stat2_label || "партнёров" },
                { value: content.about_stat3_value || "50 000+", label: content.about_stat3_label || "тонн в год" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-forest-700">{stat.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {sections.map((section, i) => {
              const Icon = iconMap[section.icon] || Sprout;
              return (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 * i }}
                  whileHover={{ y: -5, scale: 1.03 }}
                  onClick={() => { setActiveSection(section); setCurrentImage(0); }}
                  className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 text-left"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{section.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3">{section.description}</p>
                  <span className="inline-flex items-center gap-1 text-forest-700 text-sm font-medium mt-3">
                    Подробнее
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveSection(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-64 sm:h-80 bg-gray-100">
                {activeSection.images.length > 0 ? (
                  <img src={activeSection.images[currentImage]} alt={activeSection.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">{activeSection.icon}</div>
                )}
                {activeSection.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg">
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg">
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/60 text-white text-xs rounded-full">
                      {currentImage + 1} / {activeSection.images.length}
                    </div>
                  </>
                )}
                <button onClick={() => setActiveSection(null)} className="absolute top-3 right-3 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg">
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{activeSection.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{activeSection.description}</p>
                {activeSection.link && parseLinks(activeSection.link).length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {parseLinks(activeSection.link).map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-forest-700 hover:bg-forest-800 text-white font-semibold rounded-xl transition-colors">
                        <FileText className="w-4 h-4" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
