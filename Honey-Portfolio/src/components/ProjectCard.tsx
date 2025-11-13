type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  tech?: string[];
  demo?: string;
  repo?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg overflow-hidden border border-gray-700 bg-[color:var(--color-bg)] shadow-sm">
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h4 className="font-semibold text-lg">{project.title}</h4>
        <div className="text-sm text-gray-400 mt-1">{project.subtitle}</div>
        <p className="mt-2 text-sm text-gray-400">{project.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2 text-xs text-gray-400">
            {project.tech?.slice(0, 3).map((t) => (
              <span key={t} className="px-2 py-1 rounded bg-[color:rgba(255,255,255,0.02)]">
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <a href={project.demo} className="text-sm underline" aria-label="Demo link">Demo</a>
            <a href={project.repo} className="text-sm underline" aria-label="Code repo">Code</a>
          </div>
        </div>
      </div>
    </article>
  );
}
