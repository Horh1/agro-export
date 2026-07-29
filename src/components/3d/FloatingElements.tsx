"use client";
import { motion } from "framer-motion";
const shapes = [
  { color: "bg-emerald-500", size: "w-64 h-64", x: "5%", y: "10%", delay: 0 },
  { color: "bg-amber-400", size: "w-48 h-48", x: "75%", y: "5%", delay: 0.8 },
  { color: "bg-teal-400", size: "w-72 h-72", x: "60%", y: "55%", delay: 1.5 },
  { color: "bg-green-300", size: "w-40 h-40", x: "15%", y: "65%", delay: 2.2 },
];
export default function FloatingElements() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div key={i} className={`absolute rounded-full ${s.color} opacity-15 blur-3xl ${s.size}`} style={{ left: s.x, top: s.y }}
          animate={{ y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 7 + i, repeat: Infinity, delay: s.delay, ease: "easeInOut" }} />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_70%)]" />
    </div>
  );
}
