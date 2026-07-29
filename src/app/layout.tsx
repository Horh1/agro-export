import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "ООО «АгроЭкспорт» | Экспорт сельхозпродукции",
  description: "Премиальные овощи и зерновые культуры. Сертифицированное качество, логистика под ключ.",
  keywords: ["экспорт", "агропродукция", "овощи", "зерно", "поставки"],
  openGraph: { type: "website", locale: "ru_RU", siteName: "ООО «АгроЭкспорт»" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <SmoothScroll />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
