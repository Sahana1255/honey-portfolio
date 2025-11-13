export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[color:var(--color-accent)]">
            About Me
          </h2>
          <p className="mt-4 text-lg text-gray-400 dark:text-gray-300 max-w-xl">
            I’m Honey — a front-end developer focused on accessible, performant
            and delightful user experiences. I build production-ready interfaces
            with React, TypeScript and Tailwind that prioritize speed and inclusivity.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="p-4 bg-[color:var(--btn-bg)] rounded-lg border border-gray-700">
              <div className="text-2xl font-bold">6+</div>
              <div className="text-sm text-gray-400">Projects shipped</div>
            </div>
            <div className="p-4 bg-[color:var(--btn-bg)] rounded-lg border border-gray-700">
              <div className="text-2xl font-bold">90+</div>
              <div className="text-sm text-gray-400">Lighthouse score (avg)</div>
            </div>
            <div className="p-4 bg-[color:var(--btn-bg)] rounded-lg border border-gray-700">
              <div className="text-2xl font-bold">6 months</div>
              <div className="text-sm text-gray-400">Support (included)</div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <img
            src="/assets/images/about-photo-600x600.webp"
            alt="Honey portrait"
            className="w-64 h-64 object-cover rounded-2xl shadow-2xl border border-gray-700"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
