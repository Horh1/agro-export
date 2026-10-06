"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <span className="text-3xl flex-shrink-0">🍪</span>
        <div className="flex-1 text-sm text-gray-600">
          Мы используем файлы cookie для улучшения работы сайта и анализа посещаемости.
          Продолжая использовать сайт, вы соглашаетесь с{" "}
          <Link href="/privacy" className="text-forest-700 underline hover:text-forest-800">
            Политикой конфиденциальности
          </Link>.
        </div>
        <button
          onClick={accept}
          className="px-6 py-2.5 bg-forest-700 hover:bg-forest-800 text-white font-medium rounded-xl transition-colors flex-shrink-0 w-full sm:w-auto"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
