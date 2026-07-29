"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, type InquiryInput } from "@/lib/validations";
import toast, { Toaster } from "react-hot-toast";

const productOptions = [
  "Картофель", "Морковь", "Свёкла", "Капуста", "Лук репчатый",
  "Пшеница", "Ячмень", "Кукуруза", "Другое",
];

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { interestedIn: [] },
  });

  const onSubmit = async (data: InquiryInput) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      reset();
    } catch { toast.error("Ошибка при отправке. Попробуйте позже."); }
    finally { setSubmitting(false); }
  };

  return (
    <section id="contact" className="section-padding bg-gray-50" ref={ref}>
      <Toaster position="top-center" />
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="text-green-700 font-semibold text-sm tracking-wider uppercase">Контакты</span>
            <h2 className="heading-lg text-gray-900 mt-3 mb-6">Начнём <span className="text-green-700">сотрудничество</span>?</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Оставьте заявку, и наш менеджер свяжется с вами в течение 1–2 рабочих дней. Обсудим объёмы, цены и условия поставки.
            </p>
            <div className="space-y-5">
              {[
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "Телефон", value: "+7 (918) 467-74-02", href: "tel:+79184677402" },
                { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email", value: "emeleval@mail.ru", href: "mailto:emeleval@mail.ru" },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "Адрес", value: "Краснодарский край, г. Краснодар, ст. Старокорсунская, ул. им. Ленина, д. 56", href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{item.label}</div>
                    {item.href ? <a href={item.href} className="text-green-700 hover:text-green-800 transition-colors">{item.value}</a> : <p className="text-gray-500">{item.value}</p>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100" noValidate>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Тип заявителя *</label>
                <div className="flex gap-3">
                  {["individual","company"].map((t) => (
                    <label key={t} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 cursor-pointer hover:border-green-300 transition-colors has-[:checked]:border-green-500 has-[:checked]:bg-green-50 has-[:checked]:text-green-700">
                      <input type="radio" value={t} {...register("applicantType")} className="sr-only" />
                      <span>{t === "individual" ? "Физлицо" : "Компания"}</span>
                    </label>
                  ))}
                </div>
                {errors.applicantType && <p className="text-red-500 text-xs mt-1">{errors.applicantType.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Название компании</label>
                <input {...register("companyName")} placeholder='ООО "Компания"' className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Контактное лицо *</label>
                  <input {...register("contactPerson")} placeholder="Иванов Иван" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm" />
                  {errors.contactPerson && <p className="text-red-500 text-xs mt-1">{errors.contactPerson.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Телефон *</label>
                  <input type="tel" {...register("phone")} placeholder="+7 (999) 123-45-67" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                <input type="email" {...register("email")} placeholder="company@mail.ru" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Интересующая продукция *</label>
                <div className="flex flex-wrap gap-2">
                  {productOptions.map((product) => (
                    <label key={product} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 cursor-pointer hover:border-green-300 transition-colors has-[:checked]:border-green-500 has-[:checked]:bg-green-50 has-[:checked]:text-green-700 text-sm">
                      <input type="checkbox" value={product} {...register("interestedIn")} className="sr-only" />{product}
                    </label>
                  ))}
                </div>
                {errors.interestedIn && <p className="text-red-500 text-xs mt-1">{errors.interestedIn.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Примерный объём закупки</label>
                <input {...register("volume")} placeholder="Например: 20 тонн ежемесячно" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm" />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Дополнительная информация</label>
                <textarea rows={3} {...register("message")} placeholder="Опишите ваши потребности или задайте вопрос..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none text-sm resize-none" />
              </div>
              <button type="submit" disabled={submitting} className="w-full py-3.5 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-700/20">
                {submitting ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Отправка...</span> : "Отправить заявку"}
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
