"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Product { id: string; name: string; category: "VEGETABLES" | "GRAINS"; description: string | null; price: string | null; imageUrl: string | null; images?: string[] | null; }

const categoryLabels: Record<string, string> = { VEGETABLES: "Овощи", GRAINS: "Зерно" };
const placeholderImages: Record<string, string> = { 
  VEGETABLES: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600&h=500&fit=crop", 
  GRAINS: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=500&fit=crop" 
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(d => { setProducts(Array.isArray(d.products) ? d.products : []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "all" ? products : products.filter(p => p.category === activeCategory);
  const categories = [{ value: "all", label: "Вся продукция" }, { value: "VEGETABLES", label: "Овощи" }, { value: "GRAINS", label: "Зерно" }];

  return (
    <section id="products" className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-forest-700 font-semibold tracking-widest uppercase text-sm">Продукция</span>
          <h2 className="heading-lg text-forest-900 mt-4 mb-4">Наша продукция</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Сертифицированная сельхозпродукция для экспорта. Отборное качество от проверенных производителей.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="flex justify-center gap-2 mb-14">
          {categories.map(cat => (
            <button key={cat.value} onClick={() => setActiveCategory(cat.value)} className="relative px-6 py-3 text-sm font-medium transition-colors">
              <span className={activeCategory === cat.value ? "text-forest-900" : "text-gray-400 hover:text-gray-600"}>{cat.label}</span>
              {activeCategory === cat.value && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-gray-100 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-6 space-y-3"><div className="h-5 bg-gray-200 rounded w-3/4" /><div className="h-4 bg-gray-200 rounded w-full" /></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, index) => (
                <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                  <div className="card-premium group h-full flex flex-col">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={(Array.isArray(product.images) && product.images[0]) || product.imageUrl || placeholderImages[product.category]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <Link href={`/products/${product.id}`} className="block w-full py-3 bg-white text-forest-900 text-center font-semibold rounded-xl hover:bg-gold hover:text-white transition-colors text-sm">Подробнее</Link>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-forest-800 text-xs font-semibold rounded-lg shadow-sm">{categoryLabels[product.category]}</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="heading-md text-forest-900 mb-2 group-hover:text-forest-700 transition-colors">{product.name}</h3>
                      {product.description && <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{product.description}</p>}
                      {product.price && (
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                          <span className="text-lg font-bold text-gold-dark">{product.price}</span>
                          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="text-center mt-14">
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-forest-900 hover:bg-forest-800 text-white font-semibold rounded-full transition-all shadow-lg shadow-forest-900/20 hover:shadow-xl">Оставить заявку на поставку <ArrowRight className="w-5 h-5" /></a>
        </motion.div>
      </div>
    </section>
  );
}
