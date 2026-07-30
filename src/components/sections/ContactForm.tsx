"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, type InquiryInput } from "@/lib/validations";
import toast, { Toaster } from "react-hot-toast";
import { Phone, Mail, MapPin, Send, User, Building2 } from "lucide-react";

const productOptions = [
  "Картофель", "Лук", "Морковь", "Свёкла", "Капуста",
  "Пшеница", "Ячмень", "Кукуруза", "Подсолнечник",
];

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
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
      toast.success("Заявка отправлена! Свяжемся в ближайшее время.");
      reset();
    } catch { toast.error("Ошибка отправки. Попробуйте позже."); }
    finally { setSubmitting(false); }
  };

  const inputClass = (name: string) =>
    `w-full px-4 py-3.5 rounded-xl border-2 bg-white text-sm transition-all duration-300 outline-none ${
      focused === name
        ? "border-forest-500 shadow-lg shadow-forest-500/10"
        : errors[name as keyof InquiryInput]
        ? "border-red-300 bg-red-50"
        : "border-gray-200 hover:border-gray-300"
    }`;

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-white to-forest-50/30 relative overflow-hidden" ref={ref}>
      <Toaster position="top-center" />
      
      {/* Фоновые круги */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-forest-100/50 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gold/10 rounded-full blur-[120px] -z-10" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Левая часть — контакты */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-50 text-forest-700 text-sm font-semibold mb-6">
              <Send className="w-4 h-4" />
              Контакты
            </span>
            <h2 className="heading-lg text-gray-900 mb-4">
              Начнём <span className="text-gradient">сотрудничество</span>?
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed">
              Оставьте заявку, и наш менеджер свяжется с вами в течение 1–2 часов. Обсудим объёмы, цены и условия.
            </p>

            <div className="space-y-6">
              {[
                { icon: Phone, label: "Телефон", value: "+7 (918) 467-74-02", href: "tel:+79184677402" },
                { icon: Mail, label: "Email", value: "emeleval@mail.ru", href: "mailto:emeleval@mail.ru" },
                { icon: MapPin, label: "Адрес", value: "ст. Старокорсунская, ул. им. Ленина, д. 56", href: null },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center group-hover:bg-forest-100 transition-colors">
                    <item.icon className="w-5 h-5 text-forest-700" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-gray-900 font-medium hover:text-forest-700 transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-gray-900 font-medium">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Правая часть — форма */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                {/* Тип заявителя */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Кто вы *</label>
                  <div className="flex gap-3">
                    {[
                      { value: "individual", label: "Физлицо", icon: User },
                      { value: "company", label: "Компания", icon: Building2 },
                    ].map((t) => (
                      <label
                        key={t.value}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 cursor-pointer transition-all has-[:checked]:border-forest-500 has-[:checked]:bg-forest-50 has-[:checked]:text-forest-700 hover:border-gray-300"
                      >
                        <input type="radio" value={t.value} {...register("applicantType")} className="sr-only" />
                        <t.icon className="w-4 h-4" />
                        <span className="font-medium text-sm">{t.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.applicantType && <p className="text-red-500 text-xs mt-1">{errors.applicantType.message}</p>}
                </div>

                {/* Компания */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Название компании</label>
                  <input
                    {...register("companyName")}
                    placeholder='ООО "Компания"'
                    className={inputClass("companyName")}
                    onFocus={() => setFocused("companyName")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Контактное лицо */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Контактное лицо *</label>
                  <input
                    {...register("contactPerson")}
                    placeholder="Иван Иванов"
                    className={inputClass("contactPerson")}
                    onFocus={() => setFocused("contactPerson")}
                    onBlur={() => setFocused(null)}
                  />
                  {errors.contactPerson && <p className="text-red-500 text-xs mt-1">{errors.contactPerson.message}</p>}
                </div>

                {/* Телефон */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Телефон *</label>
                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder="+7 (999) 123-45-67"
                    className={inputClass("phone")}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="company@mail.ru"
                    className={inputClass("email")}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Продукция */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Интересующая продукция *</label>
                  <div className="flex flex-wrap gap-2">
                    {productOptions.map((product) => (
                      <label
                        key={product}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-gray-200 cursor-pointer transition-all has-[:checked]:border-forest-500 has-[:checked]:bg-forest-50 has-[:checked]:text-forest-700 hover:border-gray-300 text-sm"
                      >
                        <input type="checkbox" value={product} {...register("interestedIn")} className="sr-only" />
                        {product}
                      </label>
                    ))}
                  </div>
                  {errors.interestedIn && <p className="text-red-500 text-xs mt-1">{errors.interestedIn.message}</p>}
                </div>

                {/* Объём */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Примерный объём закупки</label>
                  <input
                    {...register("volume")}
                    placeholder="Например: 20 тонн ежемесячно"
                    className={inputClass("volume")}
                    onFocus={() => setFocused("volume")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Сообщение */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Дополнительная информация</label>
                  <textarea
                    rows={3}
                    {...register("message")}
                    placeholder="Опишите ваши потребности или задайте вопрос..."
                    className={`${inputClass("message")} resize-none`}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>

              {/* Кнопка */}
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 bg-gradient-to-r from-forest-700 to-forest-600 hover:from-forest-800 hover:to-forest-700 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold rounded-xl transition-all shadow-lg shadow-forest-700/20 hover:shadow-xl hover:shadow-forest-700/30 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Отправить заявку
                  </>
                )}
              </motion.button>
              <p className="text-xs text-gray-400 text-center mt-4">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
