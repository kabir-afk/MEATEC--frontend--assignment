import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "" ? "light" : ""));
    console.log(theme);
  };
  return { theme, toggleTheme };
}
