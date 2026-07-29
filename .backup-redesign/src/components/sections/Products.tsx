"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Product {
  id: string;
  name: string;
  category: "VEGETABLES" | "GRAINS";
  description: string | null;
  price: string | null;
  imageUrl: string | null;
  images?: string[] | null;
}

const categoryLabels: Record<string, { label: string; emoji: string }> = {
  VEGETABLES: { label: "Овощи", emoji: "🥕" },
  GRAINS: { label: "Зерновые", emoji: "🌾" },
};

const placeholderImages: Record<string, string> = {
  VEGETABLES: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600&h=400&fit=crop",
  GRAINS: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop",
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data.products) ? data.products : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const categories = [
    { value: "all", label: "Вся продукция", emoji: "📦" },
    { value: "VEGETABLES", label: "Овощи", emoji: "🥕" },
    { value: "GRAINS", label: "Зерновые", emoji: "🌾" },
  ];

  return (
    <section id="products" className="section-padding bg-gray-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-green-700 font-semibold text-sm tracking-wider uppercase">Продукция</span>
          <h2 className="heading-lg text-gray-900 mt-3 mb-4">
            Что мы <span className="text-green-700">выращиваем</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Широкий ассортимент овощей и зерновых культур. Вся продукция проходит строгий контроль качества.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-2 flex-wrap mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.value
                  ? "bg-green-700 text-white shadow-lg shadow-green-700/20"
                  : "bg-white text-gray-600 hover:bg-green-50 hover:text-green-700 border border-gray-200"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Товаров пока нет</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Link
                  href={`/products/${product.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-gray-100 block"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-100 to-green-50">
                    <img
                      src={
                        (Array.isArray(product.images) && product.images[0]) ||
                        product.imageUrl ||
                        placeholderImages[product.category]
                      }
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">
                        {categoryLabels[product.category]?.emoji} {categoryLabels[product.category]?.label}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
                    )}
                    {product.price && (
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-700">{product.price}</span>
                        <span className="text-xs text-gray-400">оптом</span>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <a href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-700/20 hover:shadow-xl hover:shadow-green-700/30">
            Запросить полный каталог
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
