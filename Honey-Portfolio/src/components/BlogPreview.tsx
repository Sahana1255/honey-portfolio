import posts from "../data/blog.json";

export default function BlogPreview() {
  return (
    <section id="blog" className="max-w-6xl mx-auto px-6 py-16">
      <h3 className="text-2xl font-bold text-[color:var(--color-accent)] mb-6">Latest posts</h3>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <article key={p.id} className="p-6 rounded-lg border border-gray-700 bg-[color:var(--color-bg)]">
            <h4 className="font-semibold text-lg">{p.title}</h4>
            <div className="text-xs text-gray-500 mt-1">{p.date}</div>
            <p className="mt-3 text-gray-400">{p.excerpt}</p>
            <a href={`/blog/${p.slug}`} className="mt-4 inline-block text-sm underline text-[color:var(--color-accent)]">
              Read more →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
