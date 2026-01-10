import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "");
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.remove("light");
      localStorage.setItem("theme", "");
    }
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "" ? "light" : ""));
  };
  return { theme, toggleTheme };
}
