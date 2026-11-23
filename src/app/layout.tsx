import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "СПСК Корсунский | Овощи и зерновые оптом от производителя",
    template: "%s | СПСК Корсунский",
  },
  description:
    "СПСК Корсунский — сельскохозяйственный кооператив. Прямые поставки овощей и зерновых оптом от производителя.",
  keywords: ["овощи оптом", "зерновые оптом", "СПСК Корсунский"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "СПСК Корсунский",
    title: "СПСК Корсунский | Овощи и зерновые оптом",
    description: "Прямые поставки овощей и зерновых оптом от производителя.",
  },
  robots: { index: true, follow: true },
  
  // ДОБАВЛЕНА СЕКЦИЯ ВЕРИФИКАЦИИ:
  verification: {
    yandex: "d1d399b70f9d76b0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="85" font-family="'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif">
    🌾
  </text>
</svg>
}