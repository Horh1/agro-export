import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Агро-Экспорт | Овощи и зерновые оптом от производителя",
    template: "%s | Агро-Экспорт",
  },
  description:
    "Крупное сельхозпредприятие. Выращиваем и поставляем овощи и зерновые культуры оптом. Картофель, морковь, свёкла, капуста, пшеница, ячмень, кукуруза. Прямые поставки по всей России.",
  keywords: [
    "овощи оптом",
    "зерновые оптом",
    "картофель оптом",
    "пшеница оптом",
    "сельхозпредприятие",
    "Агро-Экспорт",
    "поставки овощей",
    "поставки зерновых",
  ],
  authors: [{ name: "Агро-Экспорт" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://agro-export.ru",
    siteName: "Агро-Экспорт",
    title: "Агро-Экспорт | Овощи и зерновые оптом",
    description: "Прямые поставки овощей и зерновых от производителя",
    images: [
      {
        url: "https://agro-export.ru/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Агро-Экспорт",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Агро-Экспорт | Овощи и зерновые оптом",
    description: "Прямые поставки овощей и зерновых от производителя",
  },
  robots: {
    index: true,
    follow: true,
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
      </body>
    </html>
  );
}
