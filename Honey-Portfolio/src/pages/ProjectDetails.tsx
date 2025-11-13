// src/pages/ProjectDetails.tsx
import type { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function ProjectDetails(): ReactElement {
  return (
    <main
      className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-20"
      aria-label="Project details — Project Alpha"
    >
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10">
        <div>
          <header>
            <Link
              to="/"
              className="text-sm text-[color:var(--color-accent)] hover:underline"
              aria-label="Back to home"
            >
              ← Back
            </Link>

            <h1 className="mt-4 text-4xl font-extrabold">Project Alpha</h1>
            <p className="mt-2 text-gray-400 dark:text-gray-300">
              Landing page with micro-interactions. Fast images, A/B-ready hero variations,
              and accessible controls.
            </p>
          </header>

          <section className="mt-6 space-y-6" aria-labelledby="overview-heading">
            <div>
              <h3 id="overview-heading" className="font-semibold">Overview</h3>
              <p className="text-gray-400">
                A sample project detail page to show buyers how a project looks with screenshots
                and descriptions. Great for showcasing design process, tech stack and outcomes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Tech</h3>
              <p className="text-gray-400">React • Tailwind • Vite</p>
            </div>

            <div>
              <h3 className="font-semibold">Role</h3>
              <p className="text-gray-400">Design, Front-end, Performance</p>
            </div>
          </section>
        </div>

        <aside>
          <div className="rounded-xl overflow-hidden shadow-xl border border-gray-700">
            <img
              src="/assets/images/project-1-1200x800.webp"
              alt="Screenshot of Project Alpha — landing page with hero and card grid"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        </aside>
      </div>
    </main>
  );
}
