import CertificateLinks from "@/components/CertificateLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Заглушки сертификатов — позже заменят на реальные сканы/PDF
  const certificates = [
    { name: "Сертификат ГОСТ Р", file: "#" },
    { name: "Фитосанитарный сертификат", file: "#" },
    { name: "Декларация о соответствии", file: "#" },
    { name: "Протокол испытаний", file: "#" },
  ];

  return (
    <footer className="bg-green-950 text-white">
      <div className="container-custom py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Колонка 1 — О компании */}
          <div>
            <a href="#hero" className="flex items-center gap-2 font-display font-bold text-xl mb-3">
              <span className="text-2xl">🌾</span>
              <span>Агро-Экспорт</span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Крупное сельхозпредприятие. Прямые поставки овощей и зерновых культур оптом по всей России.
            </p>
          </div>

          {/* Колонка 2 — Навигация */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "#about", label: "О компании" },
                { href: "#products", label: "Продукция" },
                { href: "#partners", label: "Партнёрам" },
                { href: "#contact", label: "Контакты" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Колонка 3 — Сертификаты */}
          {/* Колонка 3 — Сертификаты */}
<div>
  <h4 className="font-semibold mb-4 flex items-center gap-2">
    <span>📋</span> Сертификаты
  </h4>
  <CertificateLinks />
</div>

          {/* Колонка 4 — Контакты */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-sm text-white/60">
              <p>
                <a href="tel:+78000000000" className="hover:text-white transition-colors">
                  8 (800) 000-00-00
                </a>
              </p>
              <p>
                <a href="mailto:info@agro-export.ru" className="hover:text-white transition-colors">
                  info@agro-export.ru
                </a>
              </p>
              <p>Россия</p>
            </div>
          </div>
        </div>

        {/* Нижняя полоса */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {currentYear} Агро-Экспорт. Все права защищены.
          </p>
          <p className="text-white/30 text-xs">
            Разработано с заботой о качестве
          </p>
        </div>
      </div>
    </footer>
  );
}