"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductOptionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [sortOrder, setSortOrder] = useState(10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/product-options?key=agro-admin-2026", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, sortOrder, isActive: true }),
    });
    if (res.ok) {
      router.push("/admin/product-options?key=agro-admin-2026");
      router.refresh();
    } else {
      alert("Ошибка");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Новый пункт</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
          <input required value={name} onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Порядок (меньше = выше)</label>
          <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 outline-none text-sm" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="px-5 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:bg-gray-300 text-sm font-medium">
            {saving ? "Создание..." : "Создать"}
          </button>
          <button type="button" onClick={() => router.back()}
            className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Отмена</button>
        </div>
      </form>
    </div>
  );
}
