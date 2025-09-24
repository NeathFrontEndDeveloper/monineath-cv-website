// "use client";

// import { useTheme } from "@/Theme/ThemeContext";
// import { Moon, Sun } from "lucide-react";
// import { cn } from "@/lib/utils";

// type ThemeToggleProps = {
//   size?: "sm" | "md" | "lg";
//   variant?: "default" | "ghost" | "outline";
// };

// export function ThemeToggle({
//   size = "md",
//   variant = "default",
// }: ThemeToggleProps) {
//   const { actualTheme, toggleTheme } = useTheme();

//   const sizeClasses =
//     size === "sm" ? "h-2 w-2" : size === "lg" ? "h-4 w-4" : "h-6 w-6";

//   const variantClasses =
//     variant === "ghost"
//       ? "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//       : variant === "outline"
//       ? "p-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800"
//       : "p-2 rounded-full bg-gray-100 dark:bg-gray-800";

//   return (
//     <button
//       onClick={toggleTheme}
//       className={cn(
//         "flex items-center justify-center transition",
//         variantClasses
//       )}
//     >
//       {actualTheme === "light" ? (
//         <Sun className={sizeClasses} />
//       ) : (
//         <Moon className={sizeClasses} />
//       )}
//     </button>
//   );
// }
