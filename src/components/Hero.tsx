import { useEffect, useState } from "react";
import Confetti from "./Confetti";

export default function Hero() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMicrocopy, setShowMicrocopy] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = mq && mq.matches;

    const shown = sessionStorage.getItem("hp_confetti_shown");
    if (!shown && !reduced) {
      setShowConfetti(true);
      sessionStorage.setItem("hp_confetti_shown", "1");
      setTimeout(() => setShowConfetti(false), 1800);
    }

    // show microcopy slightly after load (but skip if reduced motion)
    setTimeout(() => setShowMicrocopy(true), reduced ? 0 : 700);
  }, []);

  return (
    <section
      id="hero"
      className="pt-24 min-h-screen flex items-center bg-[var(--color-bg)] text-[var(--color-text)]"
      aria-label="Hero section"
    >
      {/* Confetti (respects prefers-reduced-motion inside Confetti component) */}
      {showConfetti && <Confetti />}

      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left: text */}
        <div className="w-full lg:w-7/12 text-center lg:text-left">
          <p className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[color:var(--color-accent)] bg-[rgba(100,108,255,0.06)]">
            Welcome
          </p>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Hi, I’m <span className="text-[color:var(--color-accent)]">Honey</span> 👋
          </h1>

          <p className="mt-4 text-lg text-gray-400 dark:text-gray-300 max-w-xl">
            I build clean, accessible frontends using React, Tailwind, and TypeScript.
            Performance-first, accessible-by-default, and polished for production.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="#projects"
              className="inline-block px-6 py-3 rounded-lg font-semibold text-white shadow-sm"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              View My Work
            </a>

            <a
              href="#contact"
              className="inline-block px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 font-semibold"
            >
              Get In Touch
            </a>
          </div>

          {/* Microcopy — subtle, friendly */}
          <div
            className={`mt-4 text-sm text-gray-400 dark:text-gray-300 transition-all duration-700 ease-out transform ${
              showMicrocopy ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
            aria-hidden={!showMicrocopy}
          >
            Welcome — click <a href="#contact" className="underline text-[color:var(--color-accent)]">Get in Touch</a> to send a quick message!
          </div>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-4">🌍 Remote-friendly</span>
            <span className="mr-4">⚡ Performance-focused</span>
            <span>♿ Accessibility-minded</span>
          </div>
        </div>

        {/* Right: mock screenshot / avatar */}
        <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-gray-700">
            <div className="bg-gradient-to-br from-[color:var(--color-accent)] to-[color:var(--color-accent-hover)] p-8">
              <div className="h-48 rounded-lg bg-white/10 flex items-center justify-center">
                {/* Placeholder visual — replace with an image in public/assets */}
                <div className="text-white text-lg font-semibold">Project mockup</div>
              </div>
            </div>
            <div className="p-4 bg-[color:var(--btn-bg)]">
              <div className="flex items-center justify-between text-sm text-gray-300">
                <div>Project Alpha</div>
                <div className="text-xs text-gray-400">React • Tailwind</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
