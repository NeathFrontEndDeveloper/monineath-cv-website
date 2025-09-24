// "use client";

// import { createContext, useContext } from "react";

// type ThemeContextType = {
//   theme: string;
//   toggleTheme: () => void;
// };

// export const ThemeContext = createContext<ThemeContextType | undefined>(
//   undefined
// );

// export function useTheme() {
//   const ctx = useContext(ThemeContext);
//   if (!ctx) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return {
//     theme: ctx.theme,
//     toggleTheme: ctx.toggleTheme,
//     actualTheme: ctx.theme,
//   };
// }
