import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import ProjectsGrid from "./components/ProjectsGrid";
import Testimonials from "./components/Testimonials";
import BlogPreview from "./components/BlogPreview";
import ContactForm from "./components/ContactForm";
import Reveal from "./components/Reveal";

// 🎨 Main App Component
export default function App() {
  return (
    <div
      className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Fixed Navbar */}
      <Header />

      {/* Main Page Sections */}
      <main className="pt-20">
        {/* 👋 Hero Section */}
        <Reveal>
          <Hero />
        </Reveal>

        {/* 📖 About Section */}
        <Reveal>
          <About />
        </Reveal>

        {/* 🧠 Skills Section */}
        <Reveal stagger>
          <Skills />
        </Reveal>

        {/* 💼 Projects Section */}
        <Reveal>
          <ProjectsGrid />
        </Reveal>

        {/* 💬 Testimonials */}
        <Reveal>
          <Testimonials />
        </Reveal>

        {/* 📰 Blog preview */}
        <Reveal>
          <BlogPreview />
        </Reveal>

        {/* 📬 Contact form */}
        <Reveal>
          <ContactForm />
        </Reveal>
      </main>

      {/* 🌙 Footer */}
      <footer className="text-center py-8 border-t border-gray-700 bg-[color:var(--btn-bg)] text-gray-400 text-sm">
        © {new Date().getFullYear()} Honey Portfolio — Built with ❤️ using React
        & TailwindCSS
      </footer>
    </div>
  );
}
