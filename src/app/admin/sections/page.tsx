import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminSectionsPage() {
  const sections = await prisma.sectionInfo.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Секции</h1>
          <p className="text-gray-500 text-sm mt-1">Управление блоками «О компании»</p>
        </div>
        <Link
          href="/admin/sections/new?key=agro-admin-2026"
          className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 text-sm font-medium"
        >
          + Добавить секцию
        </Link>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center text-xl">
              {section.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{section.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-1">{section.description}</p>
              <p className="text-xs text-gray-400 mt-1">{section.images.length} фото</p>
            </div>
            <Link
              href={`/admin/sections/${section.id}/edit?key=agro-admin-2026`}
              className="px-3 py-1.5 text-sm text-green-700 hover:bg-green-50 rounded-lg"
            >
              Ред.
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
