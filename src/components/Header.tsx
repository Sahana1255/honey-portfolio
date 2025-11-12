import { useState, useEffect } from "react";

export default function Header() {
  const [dark, setDark] = useState(
    () => typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-white/60 dark:bg-neutral-900/60 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-full" style={{backgroundColor: "var(--color-accent)"}} />
          <span className="text-lg font-bold text-[color:var(--color-accent)]">Honey<span className="ml-1 text-sm text-[color:var(--color-accent-hover)]">.</span></span>
        </a>

        <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700 dark:text-gray-300">
          <a href="#about" className="hover:text-[color:var(--color-accent)]">About</a>
          <a href="#projects" className="hover:text-[color:var(--color-accent)]">Projects</a>
          <a href="#skills" className="hover:text-[color:var(--color-accent)]">Skills</a>
          <a href="#contact" className="hover:text-[color:var(--color-accent)]">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm transition"
            title="Toggle dark / light"
          >
            {dark ? "🌙" : "☀️"}
          </button>

          {/* mobile menu button (no menu wired — placeholder) */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200"
            aria-label="Open menu"
            onClick={() => {
              // placeholder — later we can add a slide-in mobile nav
              const el = document.getElementById("mobile-menu");
              if (el) el.classList.toggle("hidden");
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile nav (hidden by default) */}
      <div id="mobile-menu" className="md:hidden hidden bg-white/80 dark:bg-neutral-900/80 border-t border-gray-200 dark:border-gray-800">
        <div className="px-4 py-3 flex flex-col gap-2">
          <a href="#about" className="py-2">About</a>
          <a href="#projects" className="py-2">Projects</a>
          <a href="#skills" className="py-2">Skills</a>
          <a href="#contact" className="py-2">Contact</a>
        </div>
      </div>
    </header>
  );
}
