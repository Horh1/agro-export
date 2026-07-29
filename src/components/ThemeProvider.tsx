"use client";
import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext({ mounted: false });
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <ThemeContext.Provider value={{ mounted }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);
