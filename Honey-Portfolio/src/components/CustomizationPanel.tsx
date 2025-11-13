// src/components/CustomizationPanel.tsx
import { useEffect, useState } from "react";

const TYPO_PRESETS = {
  system: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  serif: "Georgia, 'Times New Roman', Times, serif",
  mono: "SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace",
};

export default function CustomizationPanel() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [typo, setTypo] = useState(() => localStorage.getItem("typo") || "system");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    
    if (theme === "light") {
      root.style.setProperty("--color-bg", "#ffffff");
      root.style.setProperty("--color-text", "#213547");
      root.style.setProperty("--btn-bg", "#f9f9f9");
      root.classList.remove("dark");
      root.style.setProperty('color-scheme', 'light');
    } else {
      root.style.setProperty("--color-bg", "#242424");
      root.style.setProperty("--color-text", "rgba(255,255,255,0.87)");
      root.style.setProperty("--btn-bg", "#1a1a1a");
      root.classList.add("dark");
      root.style.setProperty('color-scheme', 'dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("typo", typo);
    document.documentElement.style.setProperty(
      "--font-sans", 
      TYPO_PRESETS[typo as keyof typeof TYPO_PRESETS]
    );
  }, [typo]);

  return (
    <div className="p-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm w-full max-w-sm shadow-lg">
      <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Customization</h4>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Theme</label>
        <div className="flex gap-2">
          <button 
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              theme === "dark" 
                ? "bg-[color:var(--color-accent)] text-white shadow-lg shadow-[color:var(--color-accent)]/30" 
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`} 
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>
          <button 
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              theme === "light" 
                ? "bg-[color:var(--color-accent)] text-white shadow-lg shadow-[color:var(--color-accent)]/30" 
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`} 
            onClick={() => setTheme("light")}
          >
            Light
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Typography</label>
        <select 
          value={typo} 
          onChange={(e) => setTypo(e.target.value)} 
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)] transition-colors duration-300"
        >
          <option value="system">System Sans</option>
          <option value="serif">Serif</option>
          <option value="mono">Monospace</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Button Preview</label>
        <div className="flex gap-3">
          <button className="btn flex-1">Primary</button>
          <button className="flex-1 rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 font-semibold">
            Secondary
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Changes saved automatically
        </p>
      </div>
    </div>
  );
}