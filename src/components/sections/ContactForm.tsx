"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";

const inquirySchema = z.object({
  applicantType: z.enum(["individual", "company"]),
  companyName: z.string().optional(),
  contactPerson: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().min(6, "Введите телефон"),
  email: z.string().email("Неверный email"),
  interestedIn: z.array(z.string()).min(1, "Выберите хотя бы один продукт"),
  volume: z.string().optional(),
  message: z.string().max(2000).optional(),
});

type InquiryForm = z.infer<typeof inquirySchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      applicantType: "individual",
      interestedIn: [],
    },
  });

  const applicantType = watch("applicantType");
  const interestedIn = watch("interestedIn") || [];

  const toggleProduct = (product: string) => {
    if (interestedIn.includes(product)) {
      setValue("interestedIn", interestedIn.filter((p) => p !== product));
    } else {
      setValue("interestedIn", [...interestedIn, product]);
    }
  };

  const onSubmit = async (data: InquiryForm) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSubmitted(true);
        reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const productOptions = [
    "Картофель", "Морковь", "Лук", "Свёкла", "Капуста",
    "Пшеница", "Ячмень", "Кукуруза", "Подсолнечник", "Горох"
  ];

  return (
    <section id="contact" className="section-padding bg-cream" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-gold" />
              <span className="text-forest-700 font-semibold tracking-widest uppercase text-sm">Контакты</span>
            </div>
            <h2 className="heading-lg text-forest-900 mb-8">Обсудим<br />вашу поставку</h2>
            <p className="text-gray-500 mb-10 leading-relaxed">Заполните форму, и наш менеджер свяжется с вами в течение часа для обсуждения деталей.</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-forest-700" />
                </div>
                <div>
                  <div className="font-semibold text-forest-900">Телефон</div>
                  <a href="tel:+79184677402" className="text-gray-500 hover:text-forest-700 transition-colors">+7 (918) 467-74-02</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-forest-700" />
                </div>
                <div>
                  <div className="font-semibold text-forest-900">Email</div>
                  <a href="mailto:emeleval@mail.ru" className="text-gray-500 hover:text-forest-700 transition-colors">emeleval@mail.ru</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-forest-700" />
                </div>
                <div>
                  <div className="font-semibold text-forest-900">Адрес</div>
                  <p className="text-gray-500">Ростовская обл., х. Ленинаван</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white rounded-3xl p-10 shadow-xl shadow-forest-900/5 border border-gray-100 text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-forest-900 mb-3">Заявка отправлена!</h3>
                <p className="text-gray-500 mb-6">Наш менеджер свяжется с вами в ближайшее время.</p>
                <button onClick={() => setSubmitted(false)} className="text-gold-dark font-semibold hover:text-gold transition-colors">Отправить ещё одну заявку</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-forest-900/5 border border-gray-100">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-forest-900 mb-3">Тип заявителя</label>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setValue("applicantType", "individual")} className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium border transition-all ${applicantType === "individual" ? "bg-forest-900 text-white border-forest-900" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-forest-300"}`}>Физическое лицо</button>
                      <button type="button" onClick={() => setValue("applicantType", "company")} className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium border transition-all ${applicantType === "company" ? "bg-forest-900 text-white border-forest-900" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-forest-300"}`}>Компания</button>
                    </div>
                  </div>

                  {applicantType === "company" && (
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Название компании</label>
                      <input {...register("companyName")} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 outline-none transition-all" placeholder="ООО Ромашка" />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Контактное лицо *</label>
                    <input {...register("contactPerson")} className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errors.contactPerson ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-gray-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"}`} placeholder="Иван Иванов" />
                    {errors.contactPerson && <p className="text-red-500 text-xs mt-1">{errors.contactPerson.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
                    <input {...register("phone")} className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errors.phone ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-gray-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"}`} placeholder="+7 (999) 999-99-99" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input {...register("email")} type="email" className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errors.email ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-gray-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"}`} placeholder="example@mail.ru" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-forest-900 mb-3">Интересующая продукция *</label>
                    <div className="flex flex-wrap gap-2">
                      {productOptions.map(product => (
                        <button key={product} type="button" onClick={() => toggleProduct(product)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${interestedIn.includes(product) ? "bg-forest-900 text-white border-forest-900" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-forest-300"}`}>
                          {product}
                        </button>
                      ))}
                    </div>
                    {errors.interestedIn && <p className="text-red-500 text-xs mt-2">{errors.interestedIn.message}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Объём поставки</label>
                    <input {...register("volume")} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 outline-none transition-all" placeholder="Например: 20 тонн" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                    <textarea {...register("message")} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 outline-none transition-all resize-none" placeholder="Дополнительная информация..." />
                  </div>
                </div>

                <button type="submit" disabled={submitting} className="w-full py-4 bg-forest-900 hover:bg-forest-800 text-white font-semibold rounded-xl transition-all shadow-lg shadow-forest-900/20 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Отправка...</> : <><Send className="w-5 h-5" /> Отправить заявку</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
