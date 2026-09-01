"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Banknote, Package, ShieldCheck, CalendarDays, Truck, Handshake } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const icons = [Banknote, Package, ShieldCheck, CalendarDays, Truck, Handshake];
const gradients = [
  "from-emerald-500 to-teal-400",
  "from-blue-500 to-cyan-400",
  "from-purple-500 to-violet-400",
  "from-amber-500 to-yellow-400",
  "from-rose-500 to-pink-400",
  "from-indigo-500 to-blue-400",
];

const defaultAdvantages = [
  { title: "Цены производителя", desc: "Работаем без посредников. Вы получаете продукцию по цене с поля — на 15–25% ниже рыночной." },
  { title: "Любые объёмы", desc: "От фуры до железнодорожного состава. Доставка собственным и наёмным транспортом." },
  { title: "Контроль качества", desc: "Лабораторные анализы каждой партии. Сертификаты соответствия ГОСТ и фитосанитарные документы." },
  { title: "Круглый год", desc: "Собственные овощехранилища с климат-контролем. Продукция доступна 12 месяцев в году." },
  { title: "Доставка", desc: "Оперативная доставка собственным автопарком по Краснодарскому краю. Отгрузка в день заказа." },
  { title: "Гибкие условия", desc: "Отсрочка платежа для постоянных клиентов. Индивидуальный подход к каждому партнёру." },
];

const steps = [
  { number: "01", title: "Оставляете заявку", desc: "Через форму или по телефону" },
  { number: "02", title: "Согласование", desc: "Обсуждаем объём, цены и логистику" },
  { number: "03", title: "Договор", desc: "Заключаем контракт с фиксацией условий" },
  { number: "04", title: "Отгрузка", desc: "Доставляем продукцию в оговоренные сроки" },
];

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const content = useContent();

  const advantages = defaultAdvantages.map((item, i) => ({
    title: content[`p${i + 1}_title`] || item.title,
    desc: content[`p${i + 1}_desc`] || item.desc,
  }));

  return (
    <section id="partners" className="section-padding bg-gradient-to-b from-white to-forest-50/30 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest-50/60 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] -z-10" />

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-50 text-forest-700 text-sm font-semibold mb-6">
            <Handshake className="w-4 h-4" />
            {content.partners_badge || "Партнёрам"}
          </span>
          <h2 className="heading-lg text-gray-900 mb-4">
            {content.partners_title || "Почему выбирают нас"}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {content.partners_subtitle || "Создаём комфортные условия для долгосрочного сотрудничества с оптовыми покупателями"}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {advantages.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-6 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[i]} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-forest-900 to-forest-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gold/20 rounded-full blur-[60px]" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-forest-400/10 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <h3 className="heading-md text-center mb-10">Как начать сотрудничество</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step) => (
                <div key={step.number} className="relative text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gold text-forest-900 flex items-center justify-center font-bold text-lg shadow-lg shadow-gold/20">{step.number}</div>
                  <h4 className="font-bold mb-1">{step.title}</h4>
                  <p className="text-sm text-white/60">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
