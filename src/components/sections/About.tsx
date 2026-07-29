"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Shield, Truck, Award } from "lucide-react";
import AnimatedCounter from "../ui/AnimatedCounter";
const features = [
  { icon: Leaf, title: "Экологичное производство", desc: "Продукция выращивается на полях с 100% контролем качества почв и воды. Без ГМО и вредных химикатов." },
  { icon: Shield, title: "Международные стандарты", desc: "Соответствие ISO, HACCP и ГОСТ. Полный пакет сертификатов для экспорта в любую страну мира." },
  { icon: Truck, title: "Логистика под ключ", desc: "От склада до порта назначения. Контроль температурного режима на всех этапах транспортировки." },
  { icon: Award, title: "Гарантия качества", desc: "Каждая партия проходит лабораторный контроль. Возврат и замена при несоответствии спецификации." },
];
export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="about" className="section-padding bg-cream overflow-hidden">
      <div className="container-custom" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-gold" />
              <span className="text-forest-700 font-semibold tracking-widest uppercase text-sm">О компании</span>
            </div>
            <h2 className="heading-lg text-forest-900 mb-8">Надёжный партнёр в <span className="italic text-forest-700">агроэкспорте</span></h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">Мы специализируемся на экспорте премиальной сельхозпродукции из России. Наша миссия — доставить свежие овощи и качественное зерно на столы мира, сохранив все полезные свойства и вкусовые качества.</p>
            <p className="text-gray-500 leading-relaxed mb-10">Работаем напрямую с фермерскими хозяйствами, контролируем каждый этап: от посева до отгрузки. Гарантируем соблюдение сроков и индивидуальный подход.</p>
            <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              <div><div className="text-3xl font-bold text-forest-900 font-display"><AnimatedCounter target={10} suffix="+" /></div><div className="text-sm text-gray-500 mt-1">лет опыта</div></div>
              <div><div className="text-3xl font-bold text-forest-900 font-display"><AnimatedCounter target={500} suffix="+" /></div><div className="text-sm text-gray-500 mt-1">клиентов</div></div>
              <div><div className="text-3xl font-bold text-forest-900 font-display"><AnimatedCounter target={99} suffix="%" /></div><div className="text-sm text-gray-500 mt-1">в срок</div></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-forest-900/10">
              <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80" alt="Agriculture" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center"><Award className="w-6 h-6 text-gold-dark" /></div>
                <div><div className="font-bold text-forest-900">ISO 22000</div><div className="text-xs text-gray-500">Сертифицировано</div></div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          {features.map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }} className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center mb-4 group-hover:bg-forest-900 transition-colors"><feature.icon className="w-6 h-6 text-forest-700 group-hover:text-gold transition-colors" /></div>
              <h3 className="font-semibold text-forest-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
