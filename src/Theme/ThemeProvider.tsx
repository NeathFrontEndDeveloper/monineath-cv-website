// "use client";

// import { useState, useEffect, ReactNode } from "react";
// import { ThemeContext } from "./ThemeContext";

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//   const [theme, setTheme] = useState<string>("light");

//   useEffect(() => {
//     const saved = localStorage.getItem("theme");
//     if (saved) {
//       setTheme(saved);
//     } else {
//       const prefersDark = window.matchMedia(
//         "(prefers-color-scheme: dark)"
//       ).matches;
//       setTheme(prefersDark ? "dark" : "light");
//     }
//   }, []);

//   // Apply theme + save to localStorage
//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () =>
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
