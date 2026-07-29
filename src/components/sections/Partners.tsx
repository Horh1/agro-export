"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Clock, Globe, Package, Users, Headphones } from "lucide-react";

const advantages = [
  { icon: TrendingUp, title: "Выгодные цены", desc: "Прямые поставки от производителей без посредников. Экономия до 15-25% на логистике." },
  { icon: Clock, title: "Точные сроки", desc: "Соблюдение сроков поставки — наш приоритет. Отгрузка в течение 3-5 дней после подписания договора." },
  { icon: Globe, title: "Международный опыт", desc: "Экспорт в 12+ стран. Знаем особенности таможенного оформления в каждом направлении." },
  { icon: Package, title: "Гибкие объёмы", desc: "Работаем от 1 контейнера до оптовых партий. Возможность смешанных отгрузок." },
  { icon: Users, title: "Персональный менеджер", desc: "Каждому клиенту назначается персональный менеджер на весь период сотрудничества." },
  { icon: Headphones, title: "Поддержка 24/7", desc: "Оперативное решение любых вопросов. Отслеживание груза на всех этапах доставки." },
];

const steps = [
  { number: "01", title: "Заявка", desc: "Оставьте заявку на сайте или свяжитесь с нами напрямую" },
  { number: "02", title: "Расчёт", desc: "Подготовим коммерческое предложение с учётом ваших требований" },
  { number: "03", title: "Договор", desc: "Заключаем контракт и согласовываем условия поставки" },
  { number: "04", title: "Отгрузка", desc: "Формируем партию и отправляем в кратчайшие сроки" },
];

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="partners" className="section-padding bg-forest-900 text-white" ref={ref}>
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-gold font-semibold tracking-widest uppercase text-sm">Партнёрам</span>
          <h2 className="heading-lg mt-4 mb-4">Почему выбирают нас</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Мы строим долгосрочные отношения с партнёрами по всему миру, предлагая надёжность и прозрачность.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {advantages.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.08 * i }} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold/30 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/30 transition-colors">
                <item.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
          <h3 className="heading-md text-white text-center mb-12">Как начать сотрудничество</h3>
          <div className="relative">
            <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-white/10 hidden lg:block" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={step.number} className="relative text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gold text-forest-900 flex items-center justify-center font-bold text-xl mb-6 relative z-10 shadow-lg shadow-gold/20">{step.number}</div>
                  <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                  <p className="text-white/50 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
