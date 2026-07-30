"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sprout, Warehouse, Truck, Shield, Leaf, Award } from "lucide-react";

const features = [
  { icon: Sprout, title: "1 000+ га", desc: "Собственных полей в Краснодарском крае. Контроль на каждом этапе.", color: "from-green-600 to-emerald-400" },
  { icon: Warehouse, title: "Хранение", desc: "Овощехранилища с климат-контролем. Продукция круглый год.", color: "from-amber-600 to-yellow-400" },
  { icon: Truck, title: "Доставка", desc: "Собственный автопарк. Доставка по всему краю без задержек.", color: "from-blue-600 to-cyan-400" },
  { icon: Shield, title: "ГОСТ", desc: "Сертифицированная продукция. Лабораторный контроль.", color: "from-purple-600 to-pink-400" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden" ref={ref}>
      {/* Фоновые элементы */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-forest-50/50 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50/50 rounded-full blur-[100px] -z-10" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Текст */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-50 text-forest-700 text-sm font-semibold mb-6">
              <Leaf className="w-4 h-4" />
              О компании
            </span>
            <h2 className="heading-lg text-gray-900 mb-6">
              Корсунский кооператив —{" "}
              <span className="text-gradient">надёжный поставщик</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6 text-lg">
              Наше предприятие — это современный агропромышленный комплекс полного цикла. От подготовки почвы до доставки — мы контролируем каждый этап.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Работаем напрямую, без посредников. Конкурентные цены, стабильное качество, гибкие условия для оптовых покупателей.
            </p>

            <div className="flex flex-wrap gap-6">
              {[
                { value: "20+", label: "лет на рынке" },
                { value: "100+", label: "партнёров" },
                { value: "50 000+", label: "тонн в год" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-forest-700">{stat.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 3D-карточки */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40, rotateY: 15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: "easeOut" }}
                whileHover={{ scale: 1.05, rotateY: -5, z: 20 }}
                className="group relative p-6 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Градиентная полоска сверху */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>

                {/* Свечение при наведении */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-forest-50/0 group-hover:to-forest-50/30 transition-all duration-500 rounded-2xl pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Нижняя плашка */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-forest-900 to-forest-800 rounded-3xl p-10 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gold/20 rounded-full blur-[60px]" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-forest-400/10 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <Award className="w-12 h-12 mx-auto mb-4 text-gold" />
            <h3 className="text-2xl font-bold mb-4">Готовы к сотрудничеству?</h3>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Обсудим объёмы, цены и условия поставки. Индивидуальный подход к каждому партнёру.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-white text-forest-950 font-bold rounded-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-gold/30">
              Оставить заявку
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
