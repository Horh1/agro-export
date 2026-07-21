"use client";

import { usePathname } from "next/navigation";
import CertificateLinks from "@/components/CertificateLinks";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-green-950 text-white">
      <div className="container-custom py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <a href="#hero" className="flex items-center gap-2 mb-3">
              <img src="/logo.png?v=3" alt="СПСК Корсунский" className="h-12 w-auto brightness-0 invert" />
            </a>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              СПСК &quot;КОРСУНСКИЙ&quot;. Прямые поставки овощей и зерновых культур оптом.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <nav className="flex flex-col gap-2">
              {[{ href: "#about", label: "О компании" },{ href: "#products", label: "Продукция" },{ href: "#partners", label: "Партнёрам" },{ href: "#contact", label: "Контакты" }].map((link) => (
                <a key={link.href} href={link.href} className="text-white/50 hover:text-white transition-colors text-sm">{link.label}</a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2"><span>📋</span> Сертификаты</h4>
            <CertificateLinks />
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-sm text-white/60">
              <p><a href="tel:+79184677402" className="hover:text-white transition-colors">+7 (918) 467-74-02</a></p>
              <p><a href="mailto:emeleval@mail.ru" className="hover:text-white transition-colors">emeleval@mail.ru</a></p>
              <p>Россия</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">© {currentYear} СПСК &quot;КОРСУНСКИЙ&quot;. Все права защищены.</p>
          <p className="text-white/30 text-xs">Разработано с заботой о качестве</p>
        </div>
      </div>
    </footer>
  );
}
