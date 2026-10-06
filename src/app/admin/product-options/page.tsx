import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminProductOptionsPage() {
  const options = await prisma.productOption.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Список продукции</h1>
          <p className="text-gray-500 text-sm mt-1">
            Пункты, которые видит клиент в форме заявки
          </p>
        </div>
        <Link
          href="/admin/product-options/new?key=agro-admin-2026"
          className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 text-sm font-medium"
        >
          + Добавить
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Название</th>
              <th className="text-left px-4 py-3 font-medium">Порядок</th>
              <th className="text-left px-4 py-3 font-medium">Статус</th>
              <th className="text-right px-4 py-3 font-medium">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {options.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{o.name}</td>
                <td className="px-4 py-3 text-gray-600">{o.sortOrder}</td>
                <td className="px-4 py-3">
                  {o.isActive ? (
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
                    href={`/admin/product-options/${o.id}/edit?key=agro-admin-2026`}
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
