// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import ProjectsGrid from "./components/ProjectsGrid";
import Testimonials from "./components/Testimonials";
import BlogPreview from "./components/BlogPreview";
import ContactForm from "./components/ContactForm";
import Reveal from "./components/Reveal";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import ProjectDetails from "./pages/ProjectDetails";

/**
 * App with routing - This enables proper client-side routing with 404 handling
 */
export default function App() {
  return (
    <div
      className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <Header />

      {/* Routes - This is where the magic happens */}
      <main className="pt-20">
        <Routes>
          {/* Home route: All your existing sections */}
          <Route
            path="/"
            element={
              <>
                <Reveal>
                  <Hero />
                </Reveal>

                <Reveal>
                  <About />
                </Reveal>

                <Reveal stagger={true}>
                  <Skills />
                </Reveal>

                <Reveal>
                  <ProjectsGrid />
                </Reveal>

                <Reveal>
                  <Testimonials />
                </Reveal>

                <Reveal>
                  <BlogPreview />
                </Reveal>

                <Reveal>
                  <ContactForm />
                </Reveal>
              </>
            }
          />

          {/* Project details page */}
          <Route path="/projects/:slug" element={<ProjectDetails />} />

          {/* Blog post page */}
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Contact page (optional standalone) */}
          <Route path="/contact" element={<ContactForm />} />

          {/* 404 - Catch all unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="text-center py-8 border-t border-gray-700 bg-[color:var(--btn-bg)] text-gray-400 text-sm">
        © {new Date().getFullYear()} Honey Portfolio — Built with ❤️ using React
        & TailwindCSS
      </footer>
    </div>
  );
}