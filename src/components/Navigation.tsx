"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { navItems, profile } from "@/data/content";

export function Navigation() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 0.92]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        className="absolute inset-0 bg-bg/90 backdrop-blur-sm"
        style={{ opacity: reduce ? 1 : bgOpacity }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-line"
        style={{ opacity: reduce ? 1 : borderOpacity }}
      />

      <nav
        className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-5 md:px-10"
        aria-label="Site"
      >
        <button
          type="button"
          onClick={() => scrollTo("about")}
          className="font-serif text-lg tracking-tight text-text transition-colors hover:text-accent"
        >
          {profile.name.split(" ")[0].toLowerCase()}.
        </button>

        <ul className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-text-faint transition-colors hover:text-text-muted"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="https://espressoprotocol.in"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-text-faint transition-colors hover:text-accent"
        >
          resume
        </a>
      </nav>

      <div className="relative border-t border-line-soft lg:hidden">
        <ul className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => (
            <li key={item.id} className="shrink-0">
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className="rounded-full px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-text-faint transition-colors hover:bg-surface hover:text-text-muted"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
