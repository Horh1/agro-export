import Link from "next/link";
import { prisma } from "@/lib/prisma";

const categoryLabels: Record<string, string> = {
  VEGETABLES: "Овощи",
  GRAINS: "Зерновые",
};

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Товары ({products.length})
        </h1>
        <Link
          href="/admin/products/new?key=agro-admin-2026"
          className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors text-sm font-medium"
        >
          + Добавить товар
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Название</th>
              <th className="text-left px-4 py-3 font-medium">Категория</th>
              <th className="text-left px-4 py-3 font-medium">Цена</th>
              <th className="text-left px-4 py-3 font-medium">Статус</th>
              <th className="text-right px-4 py-3 font-medium">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {categoryLabels[product.category]}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {product.price || "—"}
                </td>
                <td className="px-4 py-3">
                  {product.isActive ? (
                    <span className="inline-flex items-center gap-1 text-green-700">
                      <span className="w-2 h-2 rounded-full bg-green-500" /> Активен
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-gray-300" /> Скрыт
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${product.id}/edit?key=agro-admin-2026`}
                    className="text-green-700 hover:text-green-800 font-medium"
                  >
                    Ред.
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}