"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const advantages = [
  {
    icon: "💰",
    title: "Цены производителя",
    desc: "Работаем без посредников. Вы получаете продукцию по цене с поля — на 15–25% ниже рыночной.",
  },
  {
    icon: "📦",
    title: "Любые объёмы",
    desc: "От фуры до железнодорожного состава. Единовременная отгрузка до 2 000 тонн.",
  },
  {
    icon: "🔍",
    title: "Контроль качества",
    desc: "Лабораторные анализы каждой партии. Сертификаты соответствия ГОСТ и фитосанитарные документы.",
  },
  {
    icon: "📅",
    title: "Круглый год",
    desc: "Собственные овощехранилища с климат-контролем. Продукция доступна 12 месяцев в году.",
  },
  {
    icon: "🚛",
    title: "Доставка",
    desc: "Организуем логистику под ключ. Авто, ж/д и контейнерные перевозки по РФ и на экспорт.",
  },
  {
    icon: "🤝",
    title: "Гибкие условия",
    desc: "Отсрочка платежа для постоянных клиентов. Индивидуальный подход к каждому партнёру.",
  },
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

  return (
    <section id="partners" className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-green-700 font-semibold text-sm tracking-wider uppercase">
            Партнёрам
          </span>
          <h2 className="heading-lg text-gray-900 mt-3 mb-4">
            Почему выбирают{" "}
            <span className="text-green-700">нас</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Создаём комфортные условия для долгосрочного сотрудничества с оптовыми покупателями
          </p>
        </motion.div>

        {/* Сетка преимуществ */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {advantages.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className="p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-50 transition-all group"
            >
              <span className="text-3xl block mb-4">{item.icon}</span>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Как начать работать — шаги */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-3xl p-8 sm:p-12"
        >
          <h3 className="heading-md text-gray-900 text-center mb-10">
            Как начать сотрудничество
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-green-700 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-green-700/20">
                  {step.number}
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-sm text-gray-500">{step.desc}</p>
                {/* Стрелка между шагами (кроме последнего) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 -right-3 text-green-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}