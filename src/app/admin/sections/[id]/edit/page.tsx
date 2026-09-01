"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditSectionPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("🌱");
  const [sortOrder, setSortOrder] = useState(1);
  const [link, setLink] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/sections`)
      .then((r) => r.json())
      .then((data) => {
        const section = data.sections.find((s: any) => s.id === params.id);
        if (section) {
          setTitle(section.title);
          setDescription(section.description);
          setIcon(section.icon);
          setSortOrder(section.sortOrder);
          setLink(section.link || "");
          setImages(section.images || []);
        }
        setLoading(false);
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/admin/sections/${params.id}?key=agro-admin-2026`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, icon, sortOrder, link, images }),
    });

    if (res.ok) {
      router.push("/admin/sections?key=agro-admin-2026");
      router.refresh();
    } else {
      alert("Ошибка");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Удалить секцию?")) return;
    const res = await fetch(`/api/admin/sections/${params.id}?key=agro-admin-2026`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/sections?key=agro-admin-2026");
      router.refresh();
    }
  };

  if (loading) return <div className="text-gray-500 py-20 text-center">Загрузка...</div>;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Редактирование секции</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок *</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Описание *</label>
          <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 outline-none text-sm resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Иконка (эмодзи)</label>
          <input value={icon} onChange={(e) => setIcon(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Порядок</label>
          <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ссылка на документы</label>
          <input value={link} onChange={(e) => setLink(e.target.value)}
            placeholder="https://drive.google.com/..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Фото</label>
          <ImageUpload images={images} onChange={setImages} />
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
