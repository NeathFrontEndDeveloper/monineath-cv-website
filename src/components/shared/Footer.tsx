"use client";

import { APP_NAME } from "@/constant/data";
import SocialLinks from "@/components/shared/socialLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  //   { label: "Education", href: "/education" },
  //   { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/project" },
  { label: "Contact", href: "/contact" },
] as const;

const NavLink = memo(
  ({
    href,
    label,
    isActive,
  }: {
    href: string;
    label: string;
    isActive: boolean;
  }) => (
    <li>
      <Link
        href={href}
        className={`relative group transition-colors duration-300 ${
          isActive ? "text-[#00ff99]" : "text-white hover:text-[#00ff99]"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
        <span
          className={`absolute bottom-0 left-0 h-0.5 bg-[#00ff99] transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
          aria-hidden="true"
        />
      </Link>
    </li>
  )
);

NavLink.displayName = "NavLink";

const StackedCircularFooter = memo(() => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const isActive = (href: string) => pathname === href;

  return (
    <footer className="bg-[#1c1c22]" role="contentinfo">
      <div className="border-t border-[#00ff99] container mx-auto mb-8" />
      <div className="container mx-auto px-4 md:px-6 pb-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo Section */}
          <div className="rounded-full bg-primary/10 p-8 transition-transform duration-300 hover:scale-105">
            <Link
              href="/"
              className="text-4xl font-bold text-white hover:text-[#00ff99] transition-colors duration-300"
              aria-label="Go to homepage"
            >
              {APP_NAME}
            </Link>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation" className="w-full">
            <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
              {NAV_LINKS.map(({ href, label }) => (
                <NavLink
                  key={href}
                  href={href}
                  label={label}
                  isActive={isActive(href)}
                />
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex space-x-4">
            <SocialLinks />
          </div>

          {/* Copyright */}
          <div className="text-center pt-4 border-t border-white/10 w-full">
            <p className="text-sm text-white/60">
              © {currentYear} Sol Monineath. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

StackedCircularFooter.displayName = "StackedCircularFooter";

export default StackedCircularFooter;
