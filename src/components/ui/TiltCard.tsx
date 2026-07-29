"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
export default function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rx, setRx] = useState(0); const [ry, setRy] = useState(0);
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setRx((e.clientY - r.top - r.height/2) / 10);
    setRy((r.width/2 - (e.clientX - r.left)) / 10);
  };
  const handleLeave = () => { setRx(0); setRy(0); };
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      animate={{ rotateX: rx, rotateY: ry }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={className}><div style={{ transform: "translateZ(50px)" }}>{children}</div></motion.div>
  );
}
