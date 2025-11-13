// src/components/CustomizationPanel.tsx
import React, { useEffect, useState } from "react";

const TYPO_PRESETS = {
  system: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  serif: "Georgia, 'Times New Roman', Times, serif",
  mono: "SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace",
};

export default function CustomizationPanel() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [typo, setTypo] = useState(localStorage.getItem("typo") || "system");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "light") {
      document.documentElement.style.setProperty("--color-bg", "#ffffff");
      document.documentElement.style.setProperty("--color-text", "#213547");
      document.documentElement.style.setProperty("--btn-bg", "#f9f9f9");
      document.documentElement.classList.remove("dark");
    } else {
      // restore dark defaults (you may fine tune)
      document.documentElement.style.setProperty("--color-bg", "#242424");
      document.documentElement.style.setProperty("--color-text", "rgba(255,255,255,0.87)");
      document.documentElement.style.setProperty("--btn-bg", "#1a1a1a");
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("typo", typo);
    document.documentElement.style.setProperty("--font-sans", TYPO_PRESETS[typo as keyof typeof TYPO_PRESETS]);
  }, [typo]);

  return (
    <div className="p-4 rounded-lg border border-gray-700 bg-[color:var(--btn-bg)] w-full max-w-sm">
      <h4 className="font-semibold mb-2">Customization</h4>

      <div className="mb-3">
        <label className="block text-sm mb-1">Theme</label>
        <div className="flex gap-2">
          <button className={`px-3 py-1 rounded ${theme === "dark" ? "bg-[color:var(--color-accent)] text-white" : "bg-gray-200"}`} onClick={() => setTheme("dark")}>Dark</button>
          <button className={`px-3 py-1 rounded ${theme === "light" ? "bg-[color:var(--color-accent)] text-white" : "bg-gray-200"}`} onClick={() => setTheme("light")}>Light</button>
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-sm mb-1">Typography</label>
        <select value={typo} onChange={(e) => setTypo(e.target.value)} className="w-full bg-transparent border border-gray-700 rounded px-2 py-1">
          <option value="system">System Sans</option>
          <option value="serif">Serif</option>
          <option value="mono">Monospace</option>
        </select>
      </div>

      <div>
        <label className="block text-sm mb-2">Button preview</label>
        <div className="flex gap-2">
          <button className="btn">Primary</button>
          <button className="rounded-lg px-4 py-2 border border-gray-700">Secondary</button>
        </div>
      </div>
    </div>
  );
}
