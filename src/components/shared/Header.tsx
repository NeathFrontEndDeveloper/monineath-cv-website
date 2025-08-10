"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { APP_NAME } from "@/constant/data";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLinks = [
    { label: "Home", href: "/home" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    // { label: "Education", href: "/education" },
    // { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/project" },
    { label: "Contact", href: "/contact" },
  ];

  const handleToggle = () => setIsMenuOpen((prev) => !prev);
  const handleClose = () => setIsMenuOpen(false);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className="w-full bg-[#1c1c22] ">
        <nav className="p-8 container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-white hover:text-[#00ff99] transition-colors duration-300"
          >
            {APP_NAME}
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6">
            {NavLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative group transition-colors duration-300 px-1 pb-2 ${
                    isActive(href)
                      ? "text-[#00ff99]"
                      : "text-white hover:text-[#00ff99]"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#00ff99] transition-all duration-300 ${
                      isActive(href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={handleToggle}
            className="md:hidden text-white relative w-7 h-7 focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu
              size={28}
              className={`absolute inset-0 transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0 rotate-180" : "opacity-100"
              }`}
            />
            <X
              size={28}
              className={`absolute inset-0 transition-opacity duration-300 ${
                isMenuOpen ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        </nav>

        {/* Mobile Nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col px-6 py-4 space-y-4">
            {NavLinks.map(({ href, label }, i) => (
              <li
                key={href}
                className={`transition-all transform duration-300 ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{
                  transitionDelay: `${isMenuOpen ? i * 50 : 0}ms`,
                }}
              >
                <Link
                  href={href}
                  onClick={handleClose}
                  className={`block py-2 pl-4 border-l-2 transition-all duration-300 ${
                    isActive(href)
                      ? "text-[#00ff99] border-[#00ff99]"
                      : "text-white border-transparent hover:text-[#00ff99] hover:border-[#00ff99]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Decorative Bottom Border */}
        <div className="container mx-auto border-b border-[#00ff99]" />
      </header>
    </>
  );
};

export default Header;
