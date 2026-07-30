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
              <span className="font-display">СПСК Корсунский</span>
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
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-gold mt-0.5" /><span>ст. Старокорсунская, ул. им. Ленина, д. 56</span></li>
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
          © {new Date().getFullYear()} ООО «СПСК Корсунский». Все права защищены.
        </div>
      </div>
    </footer>
  );
}
