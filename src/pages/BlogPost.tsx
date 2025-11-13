// src/pages/BlogPost.tsx
import type { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function BlogPost(): ReactElement {
  return (
    <article
      className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-20"
      aria-label="Blog post — Designing for Accessibility"
    >
      <div className="max-w-4xl mx-auto">
        <header>
          <Link
            to="/"
            className="text-sm text-[color:var(--color-accent)] hover:underline"
            aria-label="Go back to home"
          >
            ← Back
          </Link>

          <h1 className="mt-4 text-4xl font-extrabold">Designing for Accessibility</h1>
          <p className="mt-2 text-gray-400 dark:text-gray-300 max-w-2xl">
            Quick wins and best practices to make your interfaces usable for everyone.
          </p>
        </header>

        <section className="mt-8 prose prose-invert max-w-none text-lg" aria-labelledby="post-heading">
          {/* note: `prose` classes require the @tailwindcss/typography plugin to be useful */}
          <p>
            This is a demo article used for the ThemeForest preview. It demonstrates how a blog
            post layout looks, including headings, images, lists, code blocks and callouts.
          </p>

          <h2 id="post-heading">Why accessibility matters</h2>
          <p>Accessibility increases reach, helps SEO, and is the right thing to do.</p>

          <h3>Checklist</h3>
          <ul>
            <li>Semantic HTML</li>
            <li>Keyboard navigation</li>
            <li>Color contrast</li>
          </ul>

          <p className="mt-8 text-sm text-gray-400">Published: 2025-08-14</p>
        </section>
      </div>
    </article>
  );
}
