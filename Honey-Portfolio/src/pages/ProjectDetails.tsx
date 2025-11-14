// src/pages/ProjectDetails.tsx
import type { ReactElement } from "react";
import { Link, useParams } from "react-router-dom";

// Project data - you can move this to a separate file later
const projects = {
  "project-alpha": {
    title: "Project Alpha",
    description: "Landing page with micro-interactions. Fast images, A/B-ready hero variations, and accessible controls.",
    overview: "A sample project detail page to show buyers how a project looks with screenshots and descriptions. Great for showcasing design process, tech stack and outcomes.",
    tech: "React • Tailwind • Vite",
    role: "Design, Front-end, Performance",
    image: "/assets/images/project-1-1200x800.webp",
    alt: "Screenshot of Project Alpha — landing page with hero and card grid"
  },
  "project-beta": {
    title: "Project Beta",
    description: "E-commerce platform with cart functionality and user authentication.",
    overview: "A fully functional e-commerce solution with product listings, cart management, and secure checkout process.",
    tech: "React • TypeScript • Node.js • MongoDB",
    role: "Full-stack Development, UI/UX Design",
    image: "/assets/images/project-2-1200x800.webp",
    alt: "Screenshot of Project Beta — e-commerce product page"
  },
  "project-gamma": {
    title: "Project Gamma",
    description: "Dashboard analytics platform with real-time data visualization.",
    overview: "Interactive dashboard for business analytics featuring charts, graphs, and real-time data updates.",
    tech: "React • D3.js • Express • PostgreSQL",
    role: "Front-end Development, Data Visualization",
    image: "/assets/images/project-3-1200x800.webp",
    alt: "Screenshot of Project Gamma — analytics dashboard"
  }
};

export default function ProjectDetails(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  
  // Handle case where project doesn't exist
  if (!slug || !projects[slug as keyof typeof projects]) {
    return (
      <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-6">The project you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-block px-5 py-3 rounded-lg font-semibold bg-[color:var(--color-accent)] text-white hover:opacity-90 transition"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const project = projects[slug as keyof typeof projects];

  return (
    <main
      className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-20"
      aria-label={`Project details — ${project.title}`}
    >
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10">
        <div>
          <header>
            <Link
              to="/"
              className="text-sm text-[color:var(--color-accent)] hover:underline"
              aria-label="Back to home"
            >
              ← Back to Home
            </Link>

            <h1 className="mt-4 text-4xl font-extrabold">{project.title}</h1>
            <p className="mt-2 text-gray-400 dark:text-gray-300">
              {project.description}
            </p>
          </header>

          <section className="mt-6 space-y-6" aria-labelledby="overview-heading">
            <div>
              <h3 id="overview-heading" className="font-semibold text-lg">Overview</h3>
              <p className="text-gray-400 mt-2">
                {project.overview}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Tech Stack</h3>
              <p className="text-gray-400 mt-2">{project.tech}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">My Role</h3>
              <p className="text-gray-400 mt-2">{project.role}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-4">
              <button className="px-6 py-3 rounded-lg font-semibold bg-[color:var(--color-accent)] text-white hover:opacity-90 transition">
                Live Demo
              </button>
              <button className="px-6 py-3 rounded-lg font-semibold border border-gray-600 text-gray-300 hover:bg-gray-800 transition">
                View Code
              </button>
            </div>
          </section>
        </div>

        <aside>
          <div className="rounded-xl overflow-hidden shadow-xl border border-gray-700">
            <img
              src={project.image}
              alt={project.alt}
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
          
          {/* Additional project images */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="rounded-lg overflow-hidden border border-gray-700">
              <img
                src={project.image}
                alt={`${project.title} - additional view 1`}
                className="w-full h-32 object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-700">
              <img
                src={project.image}
                alt={`${project.title} - additional view 2`}
                className="w-full h-32 object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}