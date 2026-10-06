"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductOptionPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetch("/api/admin/product-options?key=agro-admin-2026")
      .then((r) => r.json())
      .then((data) => {
        const option = data.options?.find((o: any) => o.id === params.id);
        if (option) {
          setName(option.name);
          setSortOrder(option.sortOrder);
          setIsActive(option.isActive);
        }
        setLoading(false);
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(
      `/api/admin/product-options/${params.id}?key=agro-admin-2026`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, sortOrder, isActive }),
      }
    );
    if (res.ok) {
      router.push("/admin/product-options?key=agro-admin-2026");
      router.refresh();
    } else {
      alert("Ошибка");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Удалить?")) return;
    const res = await fetch(
      `/api/admin/product-options/${params.id}?key=agro-admin-2026`,
      { method: "DELETE" }
    );
    if (res.ok) {
      router.push("/admin/product-options?key=agro-admin-2026");
      router.refresh();
    }
  };

  if (loading) return <div className="text-gray-500 py-20 text-center">Загрузка...</div>;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Редактирование</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
          <input required value={name} onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Порядок</label>
          <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 outline-none text-sm" />
        </div>
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-green-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
          </label>
          <span className="text-sm text-gray-700">
            {isActive ? "Показывать в форме" : "Скрыт"}
          </span>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="px-5 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:bg-gray-300 text-sm font-medium">
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
          <button type="button" onClick={() => router.back()}
            className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Отмена</button>
          <button type="button" onClick={handleDelete}
            className="px-5 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm ml-auto">Удалить</button>
        </div>
      </form>
    </div>
  );
}
