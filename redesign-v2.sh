#!/bin/bash
set -e

echo "🚀 Agro-Export PREMIUM Redesign + Admin Fix"
echo "============================================="

# 1. RESTORE ADMIN & CORE FILES FROM BACKUP
echo "📦 Restoring admin and core files..."
if [ -d ".backup-redesign" ]; then
    cp -r .backup-redesign/src/app/admin src/app/ 2>/dev/null || true
    cp -r .backup-redesign/src/components/admin src/components/ 2>/dev/null || true
    cp .backup-redesign/src/middleware.ts src/ 2>/dev/null || true
    cp .backup-redesign/src/lib/*.ts src/lib/ 2>/dev/null || true
    cp .backup-redesign/package.json . 2>/dev/null || true
    echo "✅ Restored from backup"
else
    echo "⚠️  No backup found, will recreate admin essentials"
fi

# 2. FIX DEPS
echo "📥 Installing dependencies..."
if [ ! -f "package.json" ]; then
    echo "❌ package.json missing!"
    exit 1
fi
npm install --legacy-peer-deps
npm install framer-motion lenis --legacy-peer-deps 2>/dev/null || npm install framer-motion lenis --force

# 3. TAILWIND
cat > tailwind.config.js << 'TAILWINDEOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: '#FAF9F6',
        forest: {
          50: '#E8F5E9', 100: '#C8E6C9', 200: '#A5D6A7', 300: '#81C784',
          400: '#66BB6A', 500: '#4CAF50', 600: '#43A047', 700: '#388E3C',
          800: '#2E7D32', 900: '#1B4332', 950: '#081C15',
        },
        gold: { DEFAULT: '#D4A373', light: '#E9C46A', dark: '#BC8A5F' },
        dark: '#1A1A1A',
      },
      fontFamily: {
        sans: ['Inter','system-ui','sans-serif'],
        display: ['Playfair Display','Georgia','serif'],
      },
    },
  },
  plugins: [],
};
TAILWINDEOF

# 4. GLOBALS
cat > src/app/globals.css << 'CSSEOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply bg-cream text-dark font-sans antialiased; }
  ::selection { @apply bg-gold/30 text-forest-900; }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { @apply bg-transparent; }
  ::-webkit-scrollbar-thumb { @apply bg-forest-300 rounded-full; }
  ::-webkit-scrollbar-thumb:hover { @apply bg-forest-400; }
}

@layer components {
  .container-custom { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8; }
  .section-padding { @apply py-24 lg:py-32; }
  .heading-xl { @apply font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight; }
  .heading-lg { @apply font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight; }
  .heading-md { @apply font-display text-xl sm:text-2xl font-semibold; }
  .btn-primary { @apply inline-flex items-center justify-center px-8 py-4 bg-gold text-white font-semibold rounded-full shadow-lg shadow-gold/25 hover:bg-gold-dark hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300; }
  .btn-secondary { @apply inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm; }
  .card-premium { @apply bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-forest-900/5 hover:border-gold/20; }
}
CSSEOF

mkdir -p src/components/ui src/components/3d

# 5. THEME PROVIDER
cat > src/components/ThemeProvider.tsx << 'THEMEEOF'
"use client";
import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext({ mounted: false });
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <ThemeContext.Provider value={{ mounted }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);
THEMEEOF

# 6. SMOOTH SCROLL
cat > src/components/SmoothScroll.tsx << 'SMOOTHEOF'
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
  return null;
}
SMOOTHEOF

# 7. ANIMATED COUNTER
cat > src/components/ui/AnimatedCounter.tsx << 'COUNTEREOF'
"use client";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
export default function AnimatedCounter({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}
COUNTEREOF

# 8. HEADER
cat > src/components/Header.tsx << 'HEADEREOF'
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sprout } from "lucide-react";
const navLinks = [
  { href: "#about", label: "О компании" },
  { href: "#products", label: "Продукция" },
  { href: "#partners", label: "Партнёрам" },
  { href: "#contact", label: "Контакты" },
];
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link href="/" className={`flex items-center gap-2 font-bold text-xl tracking-tight transition-colors ${scrolled ? 'text-forest-900' : 'text-white'}`}>
            <Sprout className={`w-8 h-8 ${scrolled ? 'text-forest-700' : 'text-gold'}`} />
            <span className="font-display">АгроЭкспорт</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-gold ${scrolled ? 'text-gray-600' : 'text-white/90'}`}>{link.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="#contact" className={`hidden sm:inline-flex px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${scrolled ? 'bg-forest-900 text-white hover:bg-forest-800' : 'bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm'}`}>Оставить заявку</a>
            <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'hover:bg-gray-100 text-gray-900' : 'hover:bg-white/10 text-white'}`}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="container-custom py-6 space-y-4">
              {navLinks.map(link => <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block py-2 text-gray-700 font-medium hover:text-forest-700 transition-colors">{link.label}</a>)}
              <a href="#contact" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3 bg-forest-900 text-white font-semibold rounded-xl">Оставить заявку</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
HEADEREOF

# 9. HERO
cat > src/components/sections/Hero.tsx << 'HEROEOF'
"use client";
import { motion } from "framer-motion";
import { ChevronDown, Sprout, Globe, Truck } from "lucide-react";
const stats = [
  { icon: Sprout, value: "50+", label: "Сортов продукции" },
  { icon: Globe, value: "12", label: "Стран-экспортёров" },
  { icon: Truck, value: "10K+", label: "Тонн в год" },
];
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80" alt="Field" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-900/50 to-forest-950/90" />
      </div>
      <div className="relative z-10 container-custom text-center text-white pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-10">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-sm font-medium tracking-wide">Экспорт сельхозпродукции из России</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="heading-xl mb-8 max-w-4xl mx-auto">
          От поля до <span className="italic text-gold">стола мира</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg sm:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          Премиальные овощи и зерновые культуры с современных ферм. Сертифицированное качество, логистика под ключ, надёжные партнёрства.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <a href="#products" className="btn-primary">Смотреть продукцию</a>
          <a href="#contact" className="btn-secondary">Обсудить поставку</a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-white/20 pt-10">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.15 }} className="text-center">
              <stat.icon className="w-6 h-6 mx-auto mb-3 text-gold" />
              <div className="text-3xl sm:text-4xl font-bold font-display">{stat.value}</div>
              <div className="text-sm text-white/60 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ChevronDown className="w-8 h-8 text-white/40" />
      </motion.div>
    </section>
  );
}
HEROEOF

# 10. ABOUT
cat > src/components/sections/About.tsx << 'ABOUTEOF'
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Shield, Truck, Award } from "lucide-react";
import AnimatedCounter from "../ui/AnimatedCounter";
const features = [
  { icon: Leaf, title: "Экологичное производство", desc: "Продукция выращивается на полях с 100% контролем качества почв и воды. Без ГМО и вредных химикатов." },
  { icon: Shield, title: "Международные стандарты", desc: "Соответствие ISO, HACCP и ГОСТ. Полный пакет сертификатов для экспорта в любую страну мира." },
  { icon: Truck, title: "Логистика под ключ", desc: "От склада до порта назначения. Контроль температурного режима на всех этапах транспортировки." },
  { icon: Award, title: "Гарантия качества", desc: "Каждая партия проходит лабораторный контроль. Возврат и замена при несоответствии спецификации." },
];
export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="about" className="section-padding bg-cream overflow-hidden">
      <div className="container-custom" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-gold" />
              <span className="text-forest-700 font-semibold tracking-widest uppercase text-sm">О компании</span>
            </div>
            <h2 className="heading-lg text-forest-900 mb-8">Надёжный партнёр в <span className="italic text-forest-700">агроэкспорте</span></h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">Мы специализируемся на экспорте премиальной сельхозпродукции из России. Наша миссия — доставить свежие овощи и качественное зерно на столы мира, сохранив все полезные свойства и вкусовые качества.</p>
            <p className="text-gray-500 leading-relaxed mb-10">Работаем напрямую с фермерскими хозяйствами, контролируем каждый этап: от посева до отгрузки. Гарантируем соблюдение сроков и индивидуальный подход.</p>
            <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              <div><div className="text-3xl font-bold text-forest-900 font-display"><AnimatedCounter target={10} suffix="+" /></div><div className="text-sm text-gray-500 mt-1">лет опыта</div></div>
              <div><div className="text-3xl font-bold text-forest-900 font-display"><AnimatedCounter target={500} suffix="+" /></div><div className="text-sm text-gray-500 mt-1">клиентов</div></div>
              <div><div className="text-3xl font-bold text-forest-900 font-display"><AnimatedCounter target={99} suffix="%" /></div><div className="text-sm text-gray-500 mt-1">в срок</div></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-forest-900/10">
              <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80" alt="Agriculture" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center"><Award className="w-6 h-6 text-gold-dark" /></div>
                <div><div className="font-bold text-forest-900">ISO 22000</div><div className="text-xs text-gray-500">Сертифицировано</div></div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          {features.map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }} className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center mb-4 group-hover:bg-forest-900 transition-colors"><feature.icon className="w-6 h-6 text-forest-700 group-hover:text-gold transition-colors" /></div>
              <h3 className="font-semibold text-forest-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
ABOUTEOF

# 11. PRODUCTS
cat > src/components/sections/Products.tsx << 'PRODUCTSEOF'
"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Product { id: string; name: string; category: "VEGETABLES" | "GRAINS"; description: string | null; price: string | null; imageUrl: string | null; images?: string[] | null; }

const categoryLabels: Record<string, string> = { VEGETABLES: "Овощи", GRAINS: "Зерно" };
const placeholderImages: Record<string, string> = { 
  VEGETABLES: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600&h=500&fit=crop", 
  GRAINS: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=500&fit=crop" 
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(d => { setProducts(Array.isArray(d.products) ? d.products : []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "all" ? products : products.filter(p => p.category === activeCategory);
  const categories = [{ value: "all", label: "Вся продукция" }, { value: "VEGETABLES", label: "Овощи" }, { value: "GRAINS", label: "Зерно" }];

  return (
    <section id="products" className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-forest-700 font-semibold tracking-widest uppercase text-sm">Продукция</span>
          <h2 className="heading-lg text-forest-900 mt-4 mb-4">Наша продукция</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Сертифицированная сельхозпродукция для экспорта. Отборное качество от проверенных производителей.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="flex justify-center gap-2 mb-14">
          {categories.map(cat => (
            <button key={cat.value} onClick={() => setActiveCategory(cat.value)} className="relative px-6 py-3 text-sm font-medium transition-colors">
              <span className={activeCategory === cat.value ? "text-forest-900" : "text-gray-400 hover:text-gray-600"}>{cat.label}</span>
              {activeCategory === cat.value && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-gray-100 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-6 space-y-3"><div className="h-5 bg-gray-200 rounded w-3/4" /><div className="h-4 bg-gray-200 rounded w-full" /></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, index) => (
                <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                  <div className="card-premium group h-full flex flex-col">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={(Array.isArray(product.images) && product.images[0]) || product.imageUrl || placeholderImages[product.category]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <Link href={`/products/${product.id}`} className="block w-full py-3 bg-white text-forest-900 text-center font-semibold rounded-xl hover:bg-gold hover:text-white transition-colors text-sm">Подробнее</Link>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-forest-800 text-xs font-semibold rounded-lg shadow-sm">{categoryLabels[product.category]}</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="heading-md text-forest-900 mb-2 group-hover:text-forest-700 transition-colors">{product.name}</h3>
                      {product.description && <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{product.description}</p>}
                      {product.price && (
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                          <span className="text-lg font-bold text-gold-dark">{product.price}</span>
                          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="text-center mt-14">
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-forest-900 hover:bg-forest-800 text-white font-semibold rounded-full transition-all shadow-lg shadow-forest-900/20 hover:shadow-xl">Оставить заявку на поставку <ArrowRight className="w-5 h-5" /></a>
        </motion.div>
      </div>
    </section>
  );
}
PRODUCTSEOF

# 12. PARTNERS
cat > src/components/sections/Partners.tsx << 'PARTNERSEOF'
"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Clock, Globe, Package, Users, Headphones } from "lucide-react";

const advantages = [
  { icon: TrendingUp, title: "Выгодные цены", desc: "Прямые поставки от производителей без посредников. Экономия до 15-25% на логистике." },
  { icon: Clock, title: "Точные сроки", desc: "Соблюдение сроков поставки — наш приоритет. Отгрузка в течение 3-5 дней после подписания договора." },
  { icon: Globe, title: "Международный опыт", desc: "Экспорт в 12+ стран. Знаем особенности таможенного оформления в каждом направлении." },
  { icon: Package, title: "Гибкие объёмы", desc: "Работаем от 1 контейнера до оптовых партий. Возможность смешанных отгрузок." },
  { icon: Users, title: "Персональный менеджер", desc: "Каждому клиенту назначается персональный менеджер на весь период сотрудничества." },
  { icon: Headphones, title: "Поддержка 24/7", desc: "Оперативное решение любых вопросов. Отслеживание груза на всех этапах доставки." },
];

const steps = [
  { number: "01", title: "Заявка", desc: "Оставьте заявку на сайте или свяжитесь с нами напрямую" },
  { number: "02", title: "Расчёт", desc: "Подготовим коммерческое предложение с учётом ваших требований" },
  { number: "03", title: "Договор", desc: "Заключаем контракт и согласовываем условия поставки" },
  { number: "04", title: "Отгрузка", desc: "Формируем партию и отправляем в кратчайшие сроки" },
];

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="partners" className="section-padding bg-forest-900 text-white" ref={ref}>
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-gold font-semibold tracking-widest uppercase text-sm">Партнёрам</span>
          <h2 className="heading-lg mt-4 mb-4">Почему выбирают нас</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Мы строим долгосрочные отношения с партнёрами по всему миру, предлагая надёжность и прозрачность.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {advantages.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.08 * i }} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold/30 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/30 transition-colors">
                <item.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
          <h3 className="heading-md text-white text-center mb-12">Как начать сотрудничество</h3>
          <div className="relative">
            <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-white/10 hidden lg:block" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={step.number} className="relative text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gold text-forest-900 flex items-center justify-center font-bold text-xl mb-6 relative z-10 shadow-lg shadow-gold/20">{step.number}</div>
                  <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                  <p className="text-white/50 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
PARTNERSEOF

# 13. CONTACT FORM
cat > src/components/sections/ContactForm.tsx << 'CONTACTEOF'
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";

const inquirySchema = z.object({
  applicantType: z.enum(["individual", "company"]),
  companyName: z.string().optional(),
  contactPerson: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().min(6, "Введите телефон"),
  email: z.string().email("Неверный email"),
  interestedIn: z.array(z.string()).min(1, "Выберите хотя бы один продукт"),
  volume: z.string().optional(),
  message: z.string().max(2000).optional(),
});

type InquiryForm = z.infer<typeof inquirySchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      applicantType: "individual",
      interestedIn: [],
    },
  });

  const applicantType = watch("applicantType");
  const interestedIn = watch("interestedIn") || [];

  const toggleProduct = (product: string) => {
    if (interestedIn.includes(product)) {
      setValue("interestedIn", interestedIn.filter((p) => p !== product));
    } else {
      setValue("interestedIn", [...interestedIn, product]);
    }
  };

  const onSubmit = async (data: InquiryForm) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSubmitted(true);
        reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const productOptions = [
    "Картофель", "Морковь", "Лук", "Свёкла", "Капуста",
    "Пшеница", "Ячмень", "Кукуруза", "Подсолнечник", "Горох"
  ];

  return (
    <section id="contact" className="section-padding bg-cream" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-gold" />
              <span className="text-forest-700 font-semibold tracking-widest uppercase text-sm">Контакты</span>
            </div>
            <h2 className="heading-lg text-forest-900 mb-8">Обсудим<br />вашу поставку</h2>
            <p className="text-gray-500 mb-10 leading-relaxed">Заполните форму, и наш менеджер свяжется с вами в течение часа для обсуждения деталей.</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-forest-700" />
                </div>
                <div>
                  <div className="font-semibold text-forest-900">Телефон</div>
                  <a href="tel:+79184677402" className="text-gray-500 hover:text-forest-700 transition-colors">+7 (918) 467-74-02</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-forest-700" />
                </div>
                <div>
                  <div className="font-semibold text-forest-900">Email</div>
                  <a href="mailto:emeleval@mail.ru" className="text-gray-500 hover:text-forest-700 transition-colors">emeleval@mail.ru</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-forest-700" />
                </div>
                <div>
                  <div className="font-semibold text-forest-900">Адрес</div>
                  <p className="text-gray-500">Ростовская обл., х. Ленинаван</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white rounded-3xl p-10 shadow-xl shadow-forest-900/5 border border-gray-100 text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-forest-900 mb-3">Заявка отправлена!</h3>
                <p className="text-gray-500 mb-6">Наш менеджер свяжется с вами в ближайшее время.</p>
                <button onClick={() => setSubmitted(false)} className="text-gold-dark font-semibold hover:text-gold transition-colors">Отправить ещё одну заявку</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-forest-900/5 border border-gray-100">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-forest-900 mb-3">Тип заявителя</label>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setValue("applicantType", "individual")} className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium border transition-all ${applicantType === "individual" ? "bg-forest-900 text-white border-forest-900" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-forest-300"}`}>Физическое лицо</button>
                      <button type="button" onClick={() => setValue("applicantType", "company")} className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium border transition-all ${applicantType === "company" ? "bg-forest-900 text-white border-forest-900" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-forest-300"}`}>Компания</button>
                    </div>
                  </div>

                  {applicantType === "company" && (
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Название компании</label>
                      <input {...register("companyName")} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 outline-none transition-all" placeholder="ООО Ромашка" />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Контактное лицо *</label>
                    <input {...register("contactPerson")} className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errors.contactPerson ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-gray-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"}`} placeholder="Иван Иванов" />
                    {errors.contactPerson && <p className="text-red-500 text-xs mt-1">{errors.contactPerson.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
                    <input {...register("phone")} className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errors.phone ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-gray-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"}`} placeholder="+7 (999) 999-99-99" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input {...register("email")} type="email" className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errors.email ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-gray-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"}`} placeholder="example@mail.ru" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-forest-900 mb-3">Интересующая продукция *</label>
                    <div className="flex flex-wrap gap-2">
                      {productOptions.map(product => (
                        <button key={product} type="button" onClick={() => toggleProduct(product)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${interestedIn.includes(product) ? "bg-forest-900 text-white border-forest-900" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-forest-300"}`}>
                          {product}
                        </button>
                      ))}
                    </div>
                    {errors.interestedIn && <p className="text-red-500 text-xs mt-2">{errors.interestedIn.message}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Объём поставки</label>
                    <input {...register("volume")} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 outline-none transition-all" placeholder="Например: 20 тонн" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                    <textarea {...register("message")} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 outline-none transition-all resize-none" placeholder="Дополнительная информация..." />
                  </div>
                </div>

                <button type="submit" disabled={submitting} className="w-full py-4 bg-forest-900 hover:bg-forest-800 text-white font-semibold rounded-xl transition-all shadow-lg shadow-forest-900/20 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Отправка...</> : <><Send className="w-5 h-5" /> Отправить заявку</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
CONTACTEOF

# 14. FOOTER
cat > src/components/Footer.tsx << 'FOOTEREEOF'
"use client";
import { Sprout, Mail, Phone, MapPin } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-forest-950 text-white/50 py-16 border-t border-white/5">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              <Sprout className="w-7 h-7 text-gold" />
              <span className="font-display">АгроЭкспорт</span>
            </div>
            <p className="text-sm leading-relaxed">Экспорт сельхозпродукции из России. Качество, проверенное временем и международными стандартами.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Навигация</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#about" className="hover:text-gold transition-colors">О компании</a></li>
              <li><a href="#products" className="hover:text-gold transition-colors">Продукция</a></li>
              <li><a href="#partners" className="hover:text-gold transition-colors">Партнёрам</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">Контакты</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-gold" /><a href="tel:+79184677402" className="hover:text-white transition-colors">+7 (918) 467-74-02</a></li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-gold" /><a href="mailto:emeleval@mail.ru" className="hover:text-white transition-colors">emeleval@mail.ru</a></li>
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-gold mt-0.5" /><span>Ростовская обл., х. Ленинаван</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Режим работы</h4>
            <p className="text-sm">Пн-Пт: 9:00 — 18:00</p>
            <p className="text-sm">Сб: 9:00 — 14:00</p>
            <p className="text-sm mt-3 text-gold">Приём заявок круглосуточно</p>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 text-center text-xs">
          © {new Date().getFullYear()} ООО «АгроЭкспорт». Все права защищены.
        </div>
      </div>
    </footer>
  );
}
FOOTEREEOF

# 15. LAYOUT
cat > src/app/layout.tsx << 'LAYOUTEOF'
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "ООО «АгроЭкспорт» | Экспорт сельхозпродукции",
  description: "Премиальные овощи и зерновые культуры. Сертифицированное качество, логистика под ключ.",
  keywords: ["экспорт", "агропродукция", "овощи", "зерно", "поставки"],
  openGraph: { type: "website", locale: "ru_RU", siteName: "ООО «АгроЭкспорт»" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <SmoothScroll />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
LAYOUTEOF

# 16. PAGE
cat > src/app/page.tsx << 'PAGEEOF'
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Partners from "@/components/sections/Partners";
import ContactForm from "@/components/sections/ContactForm";
export default function Home() {
  return (<><Hero /><About /><Products /><Partners /><ContactForm /></>);
}
PAGEEOF

# 17. ADMIN FIX
if [ ! -f "src/app/admin/layout.tsx" ]; then
    echo "🔧 Creating admin layout..."
    mkdir -p src/app/admin
    cat > src/app/admin/layout.tsx << 'ADMINEOF'
export const metadata = {
  title: "Админ-панель | АгроЭкспорт",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
ADMINEOF
fi

echo ""
echo "🎉 PREMIUM REDESIGN COMPLETE!"
echo "=============================="
echo "Admin panel restored."
echo "Run: npm run dev"
