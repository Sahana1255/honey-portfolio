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
      className="pt-0 min-h-screen flex items-center bg-[var(--color-bg)] text-[var(--color-text)]"
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
            Hi, I'm <span className="text-[color:var(--color-accent)]">Honey</span> 👋
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
              href="#contact-form"
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
            Welcome — click <a href="#contact-form" className="underline text-[color:var(--color-accent)]">Get in Touch</a> to send a quick message!
          </div>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-4">🌍 Remote-friendly</span>
            <span className="mr-4">⚡ Performance-focused</span>
            <span>♿ Accessibility-minded</span>
          </div>
        </div>

        {/* Right: Code/Design Visual */}
        <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-gray-700 bg-gradient-to-br from-[color:var(--color-accent)]/10 to-purple-500/10">
            {/* Code Preview Header */}
            <div className="bg-[color:var(--btn-bg)] border-b border-gray-700 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-xs text-gray-400 ml-2">portfolio.tsx</div>
            </div>

            {/* Code Content */}
            <div className="p-6 font-mono text-sm">
              <div className="text-gray-300 mb-4">
                <span className="text-purple-400">const</span>{" "}
                <span className="text-[color:var(--color-accent)]">Developer</span>{" "}
                <span className="text-gray-400">= {"{"}</span>
              </div>
              
              <div className="ml-4 text-gray-300 space-y-2">
                <div>
                  <span className="text-amber-300">name</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-green-400">"Honey"</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div>
                  <span className="text-amber-300">role</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-green-400">"Frontend Developer"</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div>
                  <span className="text-amber-300">skills</span>
                  <span className="text-gray-400">: [</span>
                  <span className="text-cyan-400">"React"</span>
                  <span className="text-gray-400">, </span>
                  <span className="text-cyan-400">"TypeScript"</span>
                  <span className="text-gray-400">, </span>
                  <span className="text-cyan-400">"Tailwind"</span>
                  <span className="text-gray-400">],</span>
                </div>
                <div>
                  <span className="text-amber-300">passion</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-green-400">"Creating amazing web experiences"</span>
                </div>
              </div>

              <div className="text-gray-300 mt-4">
                <span className="text-gray-400">{"};"}</span>
              </div>

              {/* Animated cursor */}
              <div className="flex items-center mt-6">
                <span className="text-gray-400">$</span>
                <span className="ml-2 text-gray-300">npm run dev</span>
                <div className="ml-1 w-2 h-4 bg-[color:var(--color-accent)] animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}