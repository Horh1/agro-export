"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "#hero", label: "Главная" },
  { href: "#about", label: "О компании" },
  { href: "#products", label: "Продукция" },
  { href: "#partners", label: "Партнёрам" },
  { href: "#contact", label: "Контакты" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Скрываем Header на страницах админки
  if (pathname.startsWith("/admin")) return null;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ... весь остальной код компонента без изменений
  const handleNavClick = () => setIsMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg shadow-green-900/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Логотип */}
          <a
  href="#hero"
  className={`flex items-center gap-2 font-display font-bold text-xl lg:text-2xl transition-colors duration-300 ${
    isScrolled ? "text-green-800" : "text-white"
  }`}
>
            <span className="text-2xl lg:text-3xl">🌾</span>
            <span>Агро-Экспорт</span>
          </a>

          {/* Десктоп-навигация */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-700 rounded-lg hover:bg-green-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-3 px-5 py-2.5 text-sm font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 transition-colors shadow-lg shadow-green-700/20"
            >
              Оставить заявку
            </a>
          </nav>

          {/* Мобильная кнопка */}
          <button
  onClick={() => setIsMobileOpen(!isMobileOpen)}
  className={`lg:hidden p-2 transition-colors ${
    isScrolled ? "text-gray-700 hover:text-green-700" : "text-white hover:text-green-300"
  }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <nav className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={handleNavClick}
                className="mt-2 px-4 py-3 text-sm font-semibold text-white bg-green-700 rounded-lg text-center hover:bg-green-800 transition-colors"
              >
                Оставить заявку
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}