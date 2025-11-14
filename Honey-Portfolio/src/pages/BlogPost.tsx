// src/pages/BlogPost.tsx
import type { ReactElement } from "react";
import { Link, useParams } from "react-router-dom";

// Blog post data - you can move this to a separate file or CMS later
const blogPosts = {
  "designing-for-accessibility": {
    title: "Designing for Accessibility",
    description: "Quick wins and best practices to make your interfaces usable for everyone.",
    content: `
      <p>Accessibility isn't just a checklist—it's a fundamental aspect of good design that ensures everyone can use your products, regardless of their abilities or circumstances.</p>
      
      <h2>Why Accessibility Matters</h2>
      <p>Beyond being the right thing to do, accessibility benefits everyone. It improves SEO, expands your audience reach, and often results in cleaner, more maintainable code.</p>
      
      <h3>Quick Wins You Can Implement Today</h3>
      <ul>
        <li><strong>Semantic HTML:</strong> Use proper heading hierarchy and landmark elements</li>
        <li><strong>Keyboard Navigation:</strong> Ensure all interactive elements are focusable</li>
        <li><strong>Color Contrast:</strong> Maintain at least 4.5:1 ratio for normal text</li>
        <li><strong>Alt Text:</strong> Describe images for screen reader users</li>
        <li><strong>Form Labels:</strong> Always associate labels with form controls</li>
      </ul>
      
      <h3>Common Pitfalls to Avoid</h3>
      <p>Many accessibility issues stem from simple oversights: low contrast text, missing form labels, and insufficient focus indicators. Regular testing with screen readers and keyboard navigation can catch these early.</p>
      
      <blockquote>
        <p>"The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect." — Tim Berners-Lee</p>
      </blockquote>
    `,
    date: "2025-01-15",
    readTime: "4 min read",
    category: "Design",
    image: "/assets/images/blog-accessibility-1200x600.webp",
    alt: "Accessibility design principles showing contrast, keyboard navigation, and screen reader compatibility"
  },
  "modern-react-patterns": {
    title: "Modern React Patterns in 2025",
    description: "Exploring hooks, composition, and state management patterns for scalable applications.",
    content: `
      <p>React continues to evolve, and with it, the patterns we use to build maintainable, performant applications. Let's explore some modern approaches that have become industry standards.</p>
      
      <h2>Custom Hooks for Logic Reuse</h2>
      <p>Custom hooks allow you to extract component logic into reusable functions. This pattern promotes cleaner components and reduces code duplication.</p>
      
      <h3>Compound Components</h3>
      <p>This pattern provides more flexibility and better developer experience by allowing components to implicitly share state while maintaining clear separation of concerns.</p>
      
      <h3>State Management Evolution</h3>
      <p>With the rise of React Query, SWR, and newer context patterns, we're seeing a shift away from global state for everything toward more specialized solutions.</p>
    `,
    date: "2025-01-10",
    readTime: "6 min read",
    category: "Development",
    image: "/assets/images/blog-react-1200x600.webp",
    alt: "React code showing modern hooks and component patterns"
  },
  "performance-optimization": {
    title: "Frontend Performance Optimization",
    description: "Practical techniques to make your web applications feel instant.",
    content: `
      <p>Performance is a feature that directly impacts user experience, conversion rates, and SEO. Here are actionable strategies to speed up your applications.</p>
      
      <h2>Core Web Vitals Focus</h2>
      <p>Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP) are the metrics that matter most today.</p>
      
      <h3>Image Optimization</h3>
      <p>Use modern formats like WebP and AVIF, implement lazy loading, and serve responsive images to significantly reduce load times.</p>
      
      <h3>JavaScript Bundle Analysis</h3>
      <p>Regularly audit your bundles, code-split strategically, and eliminate unused code to keep your applications lean and fast.</p>
    `,
    date: "2025-01-05",
    readTime: "5 min read",
    category: "Performance",
    image: "/assets/images/blog-performance-1200x600.webp",
    alt: "Performance metrics and optimization tools dashboard"
  }
};

export default function BlogPost(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  
  // Handle case where blog post doesn't exist
  if (!slug || !blogPosts[slug as keyof typeof blogPosts]) {
    return (
      <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
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

  const post = blogPosts[slug as keyof typeof blogPosts];

  return (
    <article
      className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-20"
      aria-label={`Blog post — ${post.title}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <Link
            to="/"
            className="text-sm text-[color:var(--color-accent)] hover:underline"
            aria-label="Go back to home"
          >
            ← Back to Home
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-medium bg-[color:var(--color-accent)]/20 text-[color:var(--color-accent)] rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-400">{post.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-400 dark:text-gray-300 max-w-3xl leading-relaxed">
            {post.description}
          </p>
          
          <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
            <time dateTime={post.date}>Published: {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-xl border border-gray-700">
          <img
            src={post.image}
            alt={post.alt}
            className="w-full h-auto block"
            loading="eager"
          />
        </div>

        {/* Article Content */}
        <section 
          className="prose prose-lg prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div>
              <h3 className="font-semibold mb-2">Share this article</h3>
              <div className="flex gap-3">
                <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
                  Twitter
                </button>
                <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
                  LinkedIn
                </button>
                <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
                  Copy Link
                </button>
              </div>
            </div>
            
            <Link
              to="/"
              className="px-6 py-3 rounded-lg font-semibold border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
            >
              View All Posts
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}