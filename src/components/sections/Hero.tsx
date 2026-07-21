"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-950">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.08, scale: 1 }} transition={{ duration: 2 }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-yellow-400 to-amber-500" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.05, scale: 1 }} transition={{ duration: 2, delay: 0.3 }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-green-400 to-emerald-300" />
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />Принимаем заказы на сезон 2026
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="heading-xl text-white mb-6 leading-[1.1]">
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-200 bg-clip-text text-transparent">Прямые поставки</span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-yellow-500/20 rounded-full -z-0" />
            </span>
            <br />овощей и зерновых<br />от производителя
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
            Крупное сельхозпредприятие с собственными полями. Выращиваем, храним и доставляем продукцию оптовым покупателям.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-green-950 font-bold rounded-xl text-lg transition-all transform hover:scale-105 shadow-xl shadow-yellow-500/25 text-center">Оставить заявку</a>
            <a href="#products" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-lg backdrop-blur-sm border border-white/20 transition-all text-center">Смотреть продукцию</a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-12 pt-8 border-t border-white/10">
            {[{ value: "1 000+", label: "гектаров полей" },{ value: "20+", label: "лет на рынке" },{ value: "50 000+", label: "тонн в год" },{ value: "100+", label: "партнёров" }].map((stat) => (
              <div key={stat.label}><div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div><div className="text-sm text-white/50 mt-1">{stat.label}</div></div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 8, 0] }} transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#about" className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
          <span className="text-xs font-medium tracking-wider uppercase">Узнать больше</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </a>
      </motion.div>
    </section>
  );
}
