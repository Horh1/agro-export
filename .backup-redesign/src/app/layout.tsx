import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "СПСК Корсунский | Овощи и зерновые оптом",
    template: "%s | СПСК Корсунский",
  },
  description:
    "Корсунский кооператив — надёжный поставщик овощей и зерновых. Прямые поставки по Краснодарскому краю.",
  keywords: ["овощи оптом", "зерновые оптом", "корсунский кооператив", "спск корсунский"],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🌱</text></svg>",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "СПСК Корсунский",
    title: "СПСК Корсунский | Овощи и зерновые оптом",
    description: "Прямые поставки овощей и зерновых от производителя",
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
