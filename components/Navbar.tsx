"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
      ${
        scrolled
          ? "bg-[#0b0f1a]/95 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          : "bg-[#0b0f1a]/70"
      }
      backdrop-blur-md border-b border-white/10`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300
        ${scrolled ? "py-3" : "py-5"}`}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo/ralyxa.png"
            alt="RALAXA Logo"
            width={scrolled ? 60 : 90}
            height={scrolled ? 60 : 90}
            priority
            className="transition-all duration-300 drop-shadow-[0_0_18px_rgba(56,189,248,0.45)]"
          />
          <span
            className={`font-semibold tracking-wide text-white transition-all duration-300
            ${scrolled ? "text-xl" : "text-2xl"}`}
          >
            RALAXA
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10 text-gray-300 text-sm font-medium uppercase tracking-wide">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#research" className="hover:text-white transition">Research</a>
          <a href="#work" className="hover:text-white transition">Work</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-3xl"
          aria-label="Toggle Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#0b0f1a] border-t border-white/10">
          <div className="flex flex-col px-6 py-6 gap-6 text-gray-300 text-sm uppercase tracking-wide">
            <a onClick={() => setOpen(false)} href="#about" className="hover:text-white">About</a>
            <a onClick={() => setOpen(false)} href="#research" className="hover:text-white">Research</a>
            <a onClick={() => setOpen(false)} href="#work" className="hover:text-white">Work</a>
            <a onClick={() => setOpen(false)} href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}
