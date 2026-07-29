"use client";
import { motion } from "framer-motion";
import { ChevronDown, Sprout, Globe, Truck } from "lucide-react";
const stats = [
  { icon: Sprout, value: "50+", label: "Сортов продукции" },
  { icon: Globe, value: "12", label: "Стран-экспортёров" },
  { icon: Truck, value: "10K+", label: "Тонн в год" },
];
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80" alt="Field" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-900/50 to-forest-950/90" />
      </div>
      <div className="relative z-10 container-custom text-center text-white pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-10">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-sm font-medium tracking-wide">Экспорт сельхозпродукции из России</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="heading-xl mb-8 max-w-4xl mx-auto">
          От поля до <span className="italic text-gold">стола мира</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg sm:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          Премиальные овощи и зерновые культуры с современных ферм. Сертифицированное качество, логистика под ключ, надёжные партнёрства.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <a href="#products" className="btn-primary">Смотреть продукцию</a>
          <a href="#contact" className="btn-secondary">Обсудить поставку</a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-white/20 pt-10">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.15 }} className="text-center">
              <stat.icon className="w-6 h-6 mx-auto mb-3 text-gold" />
              <div className="text-3xl sm:text-4xl font-bold font-display">{stat.value}</div>
              <div className="text-sm text-white/60 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ChevronDown className="w-8 h-8 text-white/40" />
      </motion.div>
    </section>
  );
}
