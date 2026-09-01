"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Save } from "lucide-react";

const sections = [
  {
    title: "🎯 Hero (первый экран)",
    fields: [
      { key: "hero_badge", label: "Бейдж", value: "Приём заказов на урожай 2026" },
      { key: "hero_title", label: "Первая строка заголовка", value: "От поля" },
      { key: "hero_title_accent", label: "Акцентная строка", value: "до вашего стола" },
      { key: "hero_subtitle", label: "Подзаголовок", value: "Свежие овощи и отборное зерно.\nНатуральная продукция с полей Кубани.\nПрямые поставки от кооператива «Корсунский»" },
      { key: "hero_btn_products", label: "Кнопка «Продукция»", value: "Смотреть продукцию" },
      { key: "hero_btn_contact", label: "Кнопка «Контакты»", value: "Связаться с нами" },
      { key: "hero_stat1_value", label: "Статистика 1 — значение", value: "1 000+" },
      { key: "hero_stat1_label", label: "Статистика 1 — подпись", value: "гектаров полей" },
      { key: "hero_stat2_value", label: "Статистика 2 — значение", value: "20+" },
      { key: "hero_stat2_label", label: "Статистика 2 — подпись", value: "лет на рынке" },
      { key: "hero_stat3_value", label: "Статистика 3 — значение", value: "100+" },
      { key: "hero_stat3_label", label: "Статистика 3 — подпись", value: "партнёров" },
    ],
  },
  {
    title: "🏢 О компании",
    fields: [
      { key: "about_badge", label: "Бейдж", value: "О компании" },
      { key: "about_title", label: "Заголовок", value: "Корсунский кооператив — надёжный поставщик" },
      { key: "about_desc1", label: "Описание 1", value: "Наше предприятие — это современный агропромышленный комплекс полного цикла." },
      { key: "about_desc2", label: "Описание 2", value: "Работаем напрямую, без посредников." },
      { key: "about_stat1_value", label: "Статистика 1 — значение", value: "20+" },
      { key: "about_stat1_label", label: "Статистика 1 — подпись", value: "лет на рынке" },
      { key: "about_stat2_value", label: "Статистика 2 — значение", value: "100+" },
      { key: "about_stat2_label", label: "Статистика 2 — подпись", value: "партнёров" },
      { key: "about_stat3_value", label: "Статистика 3 — значение", value: "50 000+" },
      { key: "about_stat3_label", label: "Статистика 3 — подпись", value: "тонн в год" },
    ],
  },
  {
    title: "🤝 Партнёрам",
    fields: [
      { key: "partners_badge", label: "Бейдж", value: "Партнёрам" },
      { key: "partners_title", label: "Заголовок", value: "Почему выбирают нас" },
      { key: "partners_subtitle", label: "Подзаголовок", value: "Создаём комфортные условия для долгосрочного сотрудничества с оптовыми покупателями" },
      { key: "p1_title", label: "Карточка 1 — заголовок", value: "Цены производителя" },
      { key: "p1_desc", label: "Карточка 1 — описание", value: "Работаем без посредников. Вы получаете продукцию по цене с поля — на 15–25% ниже рыночной." },
      { key: "p2_title", label: "Карточка 2 — заголовок", value: "Любые объёмы" },
      { key: "p2_desc", label: "Карточка 2 — описание", value: "От фуры до железнодорожного состава. Доставка собственным и наёмным транспортом." },
      { key: "p3_title", label: "Карточка 3 — заголовок", value: "Контроль качества" },
      { key: "p3_desc", label: "Карточка 3 — описание", value: "Лабораторные анализы каждой партии. Сертификаты соответствия ГОСТ и фитосанитарные документы." },
      { key: "p4_title", label: "Карточка 4 — заголовок", value: "Круглый год" },
      { key: "p4_desc", label: "Карточка 4 — описание", value: "Собственные овощехранилища с климат-контролем. Продукция доступна 12 месяцев в году." },
      { key: "p5_title", label: "Карточка 5 — заголовок", value: "Доставка" },
      { key: "p5_desc", label: "Карточка 5 — описание", value: "Оперативная доставка собственным автопарком по Краснодарскому краю. Отгрузка в день заказа." },
      { key: "p6_title", label: "Карточка 6 — заголовок", value: "Гибкие условия" },
      { key: "p6_desc", label: "Карточка 6 — описание", value: "Отсрочка платежа для постоянных клиентов. Индивидуальный подход к каждому партнёру." },
    ],
  },
  {
    title: "📞 Контакты",
    fields: [
      { key: "contact_badge", label: "Бейдж", value: "Контакты" },
      { key: "contact_title", label: "Заголовок", value: "Начнём сотрудничество?" },
      { key: "contact_subtitle", label: "Подзаголовок", value: "Оставьте заявку, и наш менеджер свяжется с вами в течение 1–2 часов." },
      { key: "contact_phone", label: "Телефон", value: "+7 (918) 467-74-02" },
      { key: "contact_email", label: "Email", value: "emeleval@mail.ru" },
      { key: "contact_address", label: "Адрес", value: "ст. Старокорсунская, ул. им. Ленина, д. 56" },
    ],
  },
  {
    title: "⚙️ Футер",
    fields: [
      { key: "footer_text", label: "Описание", value: "Сельскохозяйственный кооператив. Прямые поставки овощей и зерновых от производителя." },
      { key: "footer_copyright", label: "Копирайт", value: "СПСК «Корсунский»" },
    ],
  },
];

export default function AdminContentPage() {
  const [allContent, setAllContent] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("🎯 Hero (первый экран)");

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        if (data.contents && data.contents.length > 0) {
          const map: Record<string, string> = {};
          data.contents.forEach((c: any) => { map[c.key] = c.value; });
          setAllContent(map);
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (key: string, value: string) => {
    setAllContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const contents = Object.entries(allContent).map(([key, value]) => ({ key, value }));
      const res = await fetch("/api/content?key=agro-admin-2026", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      });
      if (res.ok) alert("✅ Сохранено!");
      else alert("Ошибка сохранения");
    } catch { alert("Ошибка"); }
    finally { setSaving(false); }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6 sticky top-14 bg-gray-50 py-3 z-10">
        <h1 className="text-2xl font-bold text-gray-900">Тексты на сайте</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:bg-gray-300 text-sm font-medium shadow-lg shadow-green-700/20"
        >
          <Save className="w-4 h-4" />
          {saving ? "Сохранение..." : "Сохранить"}
        </button>
      </div>

      <div className="space-y-3">
        {sections.map((section) => {
          const isOpen = openSection === section.title;
          return (
            <div key={section.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenSection(isOpen ? null : section.title)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{section.title}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4">
                  {section.fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
                      {field.value.length > 80 ? (
                        <textarea
                          rows={3}
                          value={allContent[field.key] ?? field.value}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 outline-none text-sm resize-none"
                        />
                      ) : (
                        <input
                          value={allContent[field.key] ?? field.value}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 outline-none text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
