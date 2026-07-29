import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

const categoryLabels: Record<string, string> = {
  VEGETABLES: "Овощи",
  GRAINS: "Зерновые",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    select: { name: true, description: true, price: true },
  });

  if (!product) return { title: "Товар не найден" };

  return {
    title: product.name,
    description: product.description || `Купить ${product.name} оптом от производителя`,
    openGraph: {
      title: `${product.name} | Агро-Экспорт`,
      description: product.description || `${product.name} оптом от производителя. ${product.price || ""}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product || !product.isActive) notFound();

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-green-700">Главная</Link>
          <span className="mx-2">/</span>
          <Link href="/#products" className="hover:text-green-700">Продукция</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10">
          <ProductGallery images={product.images ?? []} name={product.name} />
          <div>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 mb-4">
              {product.category === "VEGETABLES" ? "🥕" : "🌾"} {categoryLabels[product.category]}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            {product.variety && <p className="text-green-700 font-medium mb-4">Сорт: {product.variety}</p>}
            {product.price && (
              <div className="flex items-baseline gap-2 mb-6 p-5 bg-green-50 rounded-2xl">
                <span className="text-3xl font-bold text-green-900">{product.price}</span>
                <span className="text-green-600 text-sm">оптом</span>
              </div>
            )}
            {product.minOrder && (
              <div className="flex items-center gap-3 mb-6 p-4 bg-amber-50 rounded-xl">
                <span className="text-2xl">📦</span>
                <div>
                  <p className="font-medium text-amber-900">Минимальный заказ</p>
                  <p className="text-amber-700 text-sm">{product.minOrder}</p>
                </div>
              </div>
            )}
            {product.characteristics && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Характеристики</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.characteristics.split(" | ").map((char: string) => {
                    const parts = char.split(": ");
                    return (
                      <div key={char} className="p-3 bg-gray-50 rounded-xl text-sm">
                        <span className="text-gray-400">{parts[0]}</span>
                        <p className="font-medium text-gray-900">{parts[1] || ""}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {product.description && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Описание</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}
            <a href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl">
              Запросить партию
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
