"use client";

import ImageUpload from "@/components/admin/ImageUpload";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "VEGETABLES",
    variety: "",
    description: "",
    characteristics: "",
    price: "",
    minOrder: "",
    images: [] as string[],
    isActive: true,
  });

  useEffect(() => {
    fetch("/api/admin/products?key=agro-admin-2026")
      .then((r) => r.json())
      .then((data) => {
        const product = data.products.find(
          (p: { id: string }) => p.id === params.id
        );
        if (product) {
          setForm({
            name: product.name || "",
            category: product.category || "VEGETABLES",
            variety: product.variety || "",
            description: product.description || "",
            characteristics: product.characteristics || "",
            price: product.price || "",
            minOrder: product.minOrder || "",
            images: Array.isArray(product.images) ? product.images : [],
            isActive: product.isActive,
          });
        }
        setLoading(false);
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(
      `/api/admin/products/${params.id}?key=agro-admin-2026`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          variety: form.variety || null,
          description: form.description || null,
          characteristics: form.characteristics || null,
          price: form.price || null,
          minOrder: form.minOrder || null,
          images: Array.isArray(form.images) ? form.images : [],
          isActive: form.isActive,
        }),
      }
    );

    if (res.ok) {
      router.push("/admin?key=agro-admin-2026");
      router.refresh();
    } else {
      alert("Ошибка при сохранении");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Удалить товар? Это действие нельзя отменить.")) return;
    setDeleting(true);

    const res = await fetch(
      `/api/admin/products/${params.id}?key=agro-admin-2026`,
      { method: "DELETE" }
    );

    if (res.ok) {
      router.push("/admin?key=agro-admin-2026");
      router.refresh();
    } else {
      alert("Ошибка при удалении");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Редактирование товара
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
          <input required value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
          <select value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm">
            <option value="VEGETABLES">Овощи</option>
            <option value="GRAINS">Зерновые</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Сорт</label>
          <input value={form.variety}
            onChange={(e) => setForm({ ...form, variety: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
          <textarea rows={3} value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Характеристики</label>
          <input value={form.characteristics}
            onChange={(e) => setForm({ ...form, characteristics: e.target.value })}
            placeholder="Крахмал: 15% | Урожайность: 400 ц/га"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm" />
          <p className="text-xs text-gray-400 mt-1">Через символ |</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Цена</label>
          <input value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="от 25 ₽/кг"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Минимальный заказ</label>
          <input value={form.minOrder}
            onChange={(e) => setForm({ ...form, minOrder: e.target.value })}
            placeholder="от 500 кг"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm" />
        </div>

                <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Фото</label>
          <ImageUpload images={Array.isArray(form.images) ? form.images : []} onChange={(urls) => setForm({ ...form, images: urls })} />
        </div>

        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-green-500/20 rounded-full peer peer-checked:bg-green-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
          </label>
          <span className="text-sm text-gray-700">
            {form.isActive ? "Товар виден на сайте" : "Товар скрыт"}
          </span>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="px-5 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:bg-gray-300 text-sm font-medium">
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
          <button type="button" onClick={() => router.back()}
            className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            Отмена
          </button>
          <button type="button" onClick={handleDelete} disabled={deleting}
            className="px-5 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm ml-auto disabled:opacity-50">
            {deleting ? "Удаление..." : "Удалить"}
          </button>
        </div>
      </form>
    </div>
  );
}