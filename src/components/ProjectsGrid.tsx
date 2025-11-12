import projects from "../data/projects.json";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  return (
    <section id="projects" className="py-12 max-w-6xl mx-auto px-6">
      <h3 className="text-2xl font-bold text-[color:var(--color-accent)] mb-6">Featured Projects</h3>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
