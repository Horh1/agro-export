"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Banknote, Package, ShieldCheck, CalendarDays, Truck, Handshake } from "lucide-react";

const advantages = [
  { icon: Banknote, title: "Цены производителя", desc: "Работаем без посредников. Вы получаете продукцию по цене с поля — на 15–25% ниже рыночной.", gradient: "from-emerald-500 to-teal-400" },
  { icon: Package, title: "Любые объёмы", desc: "От фуры до железнодорожного состава. Доставка собственным и наёмным транспортом.", gradient: "from-blue-500 to-cyan-400" },
  { icon: ShieldCheck, title: "Контроль качества", desc: "Лабораторные анализы каждой партии. Сертификаты соответствия ГОСТ и фитосанитарные документы.", gradient: "from-purple-500 to-violet-400" },
  { icon: CalendarDays, title: "Круглый год", desc: "Собственные овощехранилища с климат-контролем. Продукция доступна 12 месяцев в году.", gradient: "from-amber-500 to-yellow-400" },
  { icon: Truck, title: "Доставка", desc: "Оперативная доставка собственным автопарком по Краснодарскому краю. Отгрузка в день заказа.", gradient: "from-rose-500 to-pink-400" },
  { icon: Handshake, title: "Гибкие условия", desc: "Отсрочка платежа для постоянных клиентов. Индивидуальный подход к каждому партнёру.", gradient: "from-indigo-500 to-blue-400" },
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
    <section id="partners" className="section-padding bg-gradient-to-b from-white to-forest-50/30 relative overflow-hidden" ref={ref}>
      {/* Фоновые элементы */}
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
            Партнёрам
          </span>
          <h2 className="heading-lg text-gray-900 mb-4">
            Почему выбирают <span className="text-gradient">нас</span>
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
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Градиентная полоска сверху */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Иконка */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>

              {/* Свечение при наведении */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-forest-50/0 group-hover:to-forest-50/30 transition-all duration-500 rounded-2xl pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Шаги */}
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
              {steps.map((step, i) => (
                <div key={step.number} className="relative text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gold text-forest-900 flex items-center justify-center font-bold text-lg shadow-lg shadow-gold/20">
                    {step.number}
                  </div>
                  <h4 className="font-bold mb-1">{step.title}</h4>
                  <p className="text-sm text-white/60">{step.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-7 -right-3 text-gold">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
