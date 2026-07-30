"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, -60]);
  const fieldOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const fieldScale = useTransform(scrollY, [0, 400], [1, 1.03]);

  const stalks = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${(i / 50) * 100}%`,
    height: 160 + Math.random() * 240,
    thickness: 1.5 + Math.random() * 2.5,
    sway: 2 + Math.random() * 4,
    duration: 2.5 + Math.random() * 3,
    delay: Math.random() * 2,
    color: Math.random() > 0.3 ? "rgba(180,155,70,0.7)" : "rgba(200,175,90,0.5)",
  }));

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-forest-950 via-forest-900 to-amber-950/80">
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/90 via-forest-900/50 to-transparent z-10 pointer-events-none" />

      <motion.div
        style={{ opacity: fieldOpacity, scale: fieldScale }}
        className="absolute bottom-0 left-0 right-0 h-[55%] z-0"
      >
        {stalks.map((stalk) => (
          <motion.div
            key={stalk.id}
            className="absolute bottom-0"
            style={{
              left: stalk.left,
              width: stalk.thickness,
              height: stalk.height + 22,
              originY: 1,
              originX: 0.5,
            }}
            animate={{
              rotate: [-stalk.sway, stalk.sway, -stalk.sway],
            }}
            transition={{
              duration: stalk.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: stalk.delay,
            }}
          >
            <div
              style={{
                width: "100%",
                height: stalk.height,
                background: `linear-gradient(to top, ${stalk.color}, transparent)`,
                borderRadius: "1px 1px 0 0",
              }}
            />
            <div className="absolute -top-[22px] left-1/2 -translate-x-1/2">
              <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                <ellipse cx="5" cy="5" rx="2.5" ry="4.5" fill="rgba(220,195,110,0.95)" transform="rotate(-10 5 5)" />
                <ellipse cx="9" cy="5" rx="2.5" ry="4.5" fill="rgba(220,195,110,0.95)" transform="rotate(10 9 5)" />
                <ellipse cx="5" cy="11" rx="2.5" ry="4.5" fill="rgba(220,195,110,0.9)" transform="rotate(-8 5 11)" />
                <ellipse cx="9" cy="11" rx="2.5" ry="4.5" fill="rgba(220,195,110,0.9)" transform="rotate(8 9 11)" />
                <ellipse cx="5" cy="17" rx="2" ry="3.5" fill="rgba(220,195,110,0.75)" transform="rotate(-5 5 17)" />
                <ellipse cx="9" cy="17" rx="2" ry="3.5" fill="rgba(220,195,110,0.75)" transform="rotate(5 9 17)" />
                <line x1="7" y1="6" x2="7" y2="22" stroke="rgba(180,155,70,0.8)" strokeWidth="0.8" />
                <line x1="2.5" y1="4" x2="0.5" y2="0" stroke="rgba(200,175,100,0.5)" strokeWidth="0.4" />
                <line x1="11.5" y1="4" x2="13.5" y2="0" stroke="rgba(200,175,100,0.5)" strokeWidth="0.4" />
              </svg>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full bg-gold/20 z-20 pointer-events-none"
          style={{ left: `${10 + Math.random() * 80}%`, top: `${50 + Math.random() * 30}%` }}
          animate={{ y: [0, -150], opacity: [0, 0.4, 0] }}
          transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 6, ease: "easeInOut" }}
        />
      ))}

      <div className="container-custom relative z-20 py-20">
        <motion.div style={{ y: textY }} className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white/80 text-sm mb-10"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gold" />
            </span>
            Приём заказов на урожай 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white mb-8 leading-[0.95] tracking-tight"
          >
            <span className="block">От поля</span>
            <span className="block bg-gradient-to-r from-gold via-amber-200 to-gold bg-clip-text text-transparent">
              до вашего стола
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-white/40 text-lg lg:text-xl max-w-xl mx-auto mb-12"
          >
            Свежие овощи и отборное зерно.<br />
            Натуральная продукция с полей Кубани.<br />
            Прямые поставки от кооператива &laquo;Корсунский&raquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <a href="#products" className="group px-10 py-5 bg-gold hover:bg-white text-forest-950 font-bold rounded-2xl text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-gold/30">
              Смотреть продукцию
              <span className="inline-block ml-2 transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
            <a href="#contact" className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl text-lg backdrop-blur-sm border border-white/10 transition-all duration-500 hover:scale-105">
              Связаться с нами
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex justify-center gap-16 mt-20 pt-10 border-t border-white/5"
          >
            {[
              { value: "1 000+", label: "гектаров полей" },
              { value: "20+", label: "лет на рынке" },
              { value: "100+", label: "партнёров" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/25 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
