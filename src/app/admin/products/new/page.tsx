"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("VEGETABLES");
  const [variety, setVariety] = useState("");
  const [description, setDescription] = useState("");
  const [characteristics, setCharacteristics] = useState("");
  const [price, setPrice] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Введите название");
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/products?key=agro-admin-2026", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          category,
          variety: variety.trim() || null,
          description: description.trim() || null,
          characteristics: characteristics.trim() || null,
          price: price.trim() || null,
          minOrder: minOrder.trim() || null,
          images,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка сервера");
      }

      router.push("/admin?key=agro-admin-2026");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Новый товар</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
          <input required value={name} onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm">
            <option value="VEGETABLES">Овощи</option>
            <option value="GRAINS">Зерновые</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Сорт</label>
          <input value={variety} onChange={(e) => setVariety(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
          <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Характеристики</label>
          <input value={characteristics} onChange={(e) => setCharacteristics(e.target.value)}
            placeholder="Крахмал: 15% | Урожайность: 400 ц/га"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Цена</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Мин. заказ</label>
          <input value={minOrder} onChange={(e) => setMinOrder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Фото</label>
          <ImageUpload images={images} onChange={setImages} />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="px-5 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:bg-gray-300 text-sm font-medium">
            {saving ? "Создание..." : "Создать товар"}
          </button>
 rm -rf .next && npm run dev         <button type="button" onClick={() => router.back()}
            className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

