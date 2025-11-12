type Testimonial = {
  id: string;
  name: string;
  role?: string;
  text: string;
};

import testimonials from "../data/testimonials.json";

export default function Testimonials() {
  return (
    <section id="testimonials" className="max-w-6xl mx-auto px-6 py-16">
      <h3 className="text-2xl font-bold text-[color:var(--color-accent)] mb-6">
        What people say
      </h3>

      <div className="grid gap-6 sm:grid-cols-2">
        {testimonials.map((t: Testimonial) => (
          <blockquote
            key={t.id}
            className="p-6 bg-[color:var(--btn-bg)] rounded-lg border border-gray-700"
          >
            <p className="text-gray-300">{t.text}</p>
            <footer className="mt-4 text-sm text-gray-400">
              — <span className="font-medium">{t.name}</span>
              {t.role ? <span className="text-xs text-gray-500">, {t.role}</span> : null}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
