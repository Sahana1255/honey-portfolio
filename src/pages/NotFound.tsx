// src/pages/NotFound.tsx
import type { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function NotFound(): ReactElement {
  return (
    <main
      className="min-h-screen flex items-center justify-center p-8 bg-[var(--color-bg)] text-[var(--color-text)]"
      aria-label="404 page not found"
    >
      <div className="max-w-2xl text-center">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>

        <p className="mb-6 text-lg text-gray-400 dark:text-gray-300">
          Oops — the page you’re looking for isn't here. But the portfolio is 😄
        </p>

        <Link
          to="/"
          className="inline-block px-5 py-3 rounded-lg font-semibold bg-[color:var(--color-accent)] text-white hover:opacity-90 transition"
          aria-label="Go back to homepage"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
