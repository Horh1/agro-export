"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, type InquiryInput } from "@/lib/validations";
import toast, { Toaster } from "react-hot-toast";

const productOptions = ["Картофель","Лук","Морковь","Свёкла","Капуста","Пшеница","Ячмень","Кукуруза","Подсолнечник"];

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InquiryInput>({ resolver: zodResolver(inquirySchema), defaultValues: { interestedIn: [] } });

  const onSubmit = async (data: InquiryInput) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      toast.success("Заявка отправлена!");
      reset();
    } catch { toast.error("Ошибка отправки."); }
    finally { setSubmitting(false); }
  };

  return (
    <section id="contact" className="section-padding bg-gray-50" ref={ref}>
      <Toaster position="top-center" />
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="text-green-700 font-semibold text-sm uppercase">Контакты</span>
            <h2 className="heading-lg text-gray-900 mt-3 mb-6">Готовы <span className="text-green-700">обсудить</span>?</h2>
            <p className="text-gray-500 mb-8">Оставьте заявку, и мы свяжемся с вами в течение 1–2 часов.</p>
            <div className="space-y-5">
              {[{ icon: "M3 5a2...", label: "Телефон", value: "+7 (918) 467-74-02", href: "tel:+79184677402" },{ icon: "M3 8l7.89...", label: "Email", value: "emeleval@mail.ru", href: "mailto:emeleval@mail.ru" },{ icon: "M17.657...", label: "Адрес", value: "Краснодарский край, ст. Корсунская", href: null }].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center"><svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg></div>
                  <div><div className="font-medium">{item.label}</div>{item.href ? <a href={item.href} className="text-green-700">{item.value}</a> : <p className="text-gray-500">{item.value}</p>}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 shadow-lg border" noValidate>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Кто вы *</label>
                <div className="flex gap-3">
                  {["individual","company"].map((t) => (<label key={t} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer has-[:checked]:border-green-500 has-[:checked]:bg-green-50"><input type="radio" value={t} {...register("applicantType")} className="sr-only" /><span>{t==="individual"?"Физлицо":"Компания"}</span></label>))}
                </div>
              </div>
              <div className="mb-4"><label className="block text-sm font-medium mb-1.5">Компания</label><input {...register("companyName")} className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-green-500/20 outline-none text-sm" /></div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div><label className="block text-sm font-medium mb-1.5">Контакт *</label><input {...register("contactPerson")} className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-green-500/20 outline-none text-sm" /></div>
                <div><label className="block text-sm font-medium mb-1.5">Телефон *</label><input type="tel" {...register("phone")} className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-green-500/20 outline-none text-sm" /></div>
              </div>
              <div className="mb-4"><label className="block text-sm font-medium mb-1.5">Email *</label><input type="email" {...register("email")} className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-green-500/20 outline-none text-sm" /></div>
              <div className="mb-4"><label className="block text-sm font-medium mb-2">Продукция *</label><div className="flex flex-wrap gap-2">{productOptions.map((p) => (<label key={p} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border cursor-pointer has-[:checked]:border-green-500 has-[:checked]:bg-green-50 text-sm"><input type="checkbox" value={p} {...register("interestedIn")} className="sr-only" />{p}</label>))}</div></div>
              <div className="mb-4"><label className="block text-sm font-medium mb-1.5">Объём</label><input {...register("volume")} className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-green-500/20 outline-none text-sm" /></div>
              <div className="mb-5"><label className="block text-sm font-medium mb-1.5">Дополнительно</label><textarea rows={3} {...register("message")} className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-green-500/20 outline-none text-sm resize-none" /></div>
              <button type="submit" disabled={submitting} className="w-full py-3.5 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white font-semibold rounded-xl shadow-lg">{submitting ? "Отправка..." : "Отправить заявку"}</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
