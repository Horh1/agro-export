import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "СПСК Корсунский | Овощи и зерновые оптом от производителя",
    template: "%s | СПСК Корсунский",
  },
  description:
    "СПСК Корсунский — сельскохозяйственный кооператив. Прямые поставки овощей и зерновых: картофель, морковь, свёкла, капуста, лук, пшеница, ячмень, кукуруза. Оптом от производителя.",
  keywords: [
    "овощи оптом", "зерновые оптом", "картофель оптом Краснодар", "морковь оптом",
    "свёкла оптом", "капуста оптом", "лук оптом", "пшеница оптом", "ячмень оптом",
    "кукуруза оптом", "СПСК Корсунский", "сельхозкооператив Краснодар",
    "фермерские продукты оптом", "поставки овощей Краснодарский край",
    "поставки зерновых Краснодарский край", "Корсунский кооператив",
    "Старокорсунская овощи", "купить овощи оптом Краснодар", "купить зерно оптом Краснодар",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "СПСК Корсунский",
    title: "СПСК Корсунский | Овощи и зерновые оптом",
    description: "Прямые поставки овощей и зерновых от производителя. Свежие овощи и отборное зерно с полей Кубани.",
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
      </body>
    </html>
  );
}
