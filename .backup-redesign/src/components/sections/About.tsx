"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  { icon: "🌱", title: "Собственные поля", desc: "Более 1000 гектаров плодородных земель в экологически чистом регионе. Контроль качества на каждом этапе." },
  { icon: "🏭", title: "Современное хранение", desc: "Овощехранилища с климат-контролем и зерновые элеваторы. Продукция доступна круглый год." },
  { icon: "🚛", title: "Логистика", desc: "Собственный автопарк для доставки по Краснодарскому краю. Работаем без задержек." },
  { icon: "📋", title: "Сертификаты", desc: "Вся продукция сертифицирована. Соответствие ГОСТ и международным стандартам качества." },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="text-green-700 font-semibold text-sm tracking-wider uppercase">О компании</span>
            <h2 className="heading-lg text-gray-900 mt-3 mb-6">
              Корсунский кооператив — <span className="text-green-700">надёжный поставщик</span> овощей и зерновых
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Наше предприятие — это современный агропромышленный комплекс полного цикла. От подготовки почвы до доставки продукции клиенту — мы контролируем каждый этап.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Работаем напрямую, без посредников. Это позволяет нам предлагать конкурентные цены при стабильно высоком качестве. Гибкие условия сотрудничества для оптовых покупателей любого масштаба.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors group">
              Обсудить сотрудничество
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors group border border-gray-100 hover:border-green-200">
                <span className="text-3xl mb-3 block">{feature.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
