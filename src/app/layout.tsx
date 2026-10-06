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
    description: "Прямые поставки овощей и зерновых от производителя.",
  },
  robots: { index: true, follow: true },
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
}
