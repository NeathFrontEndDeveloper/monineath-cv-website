import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-[#00ff7b] text-md text-[#00ff7b] bg-transparent shadow-[0_0_0_1px_#00ff7b] hover:shadow-[0_0_12px_3px_#00ff7b] hover:bg-[#00ff7b] hover:text-[#1c1c22] transition-shadow duration-300 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer",
        outline_admin:
          "border border-blue-500 text-base text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out dark:border-input dark:bg-input/30 dark:hover:bg-input/50 cursor-pointer",
        primary_admin:
          "bg-blue-500 text-white hover:bg-blue-400 transition duration-300 ease-in-out dark:bg-gray-900 dark:hover:bg-gray-800 cursor-pointer",
        secondary_admin:
          "bg-transparent text-blue-500 hover:text-blue-300 transition-all duration-300 cursor-pointer",
        ghost_admin:
          "bg-green-500 text-white hover:bg-green-400 transition-all duration-300 cursor-pointer",
        secondary:
          "bg-[#00ff7b] text-[#1c1c22] shadow-[0_0_0_1px_#00ff7b] hover:bg-transparent hover:text-[#00ff7b] hover:shadow-[0_0_12px_3px_#00ff7b] hover:border hover:border-[#00ff7b] transition-shadow transition-colors duration-300 cursor-pointer",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1.5 text-sm",
        lg: "h-10 px-6 py-2.5",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
