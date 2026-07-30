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
            <span className="font-display">СПСК Корсунский</span>
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
