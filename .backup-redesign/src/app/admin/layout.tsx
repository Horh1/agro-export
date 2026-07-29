"use client";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Не показываем шапку на странице логина
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-900 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <span className="font-bold">🌾 Агро-Экспорт — Админ-панель</span>
          <nav className="flex gap-4 text-sm items-center">
            <a href="/admin" className="hover:text-green-300 transition-colors">Товары</a>
            <a href="/admin/inquiries" className="hover:text-green-300 transition-colors">Заявки</a>
            <a href="/" className="hover:text-green-300 transition-colors" target="_blank">На сайт ↗</a>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="ml-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-xs"
            >
              Выйти
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
