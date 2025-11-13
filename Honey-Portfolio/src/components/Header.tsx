// src/components/Header.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  
  // Enhanced theme state with system preference listener
  const [dark, setDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) {
        return saved === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  // Enhanced scroll effect with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // System theme change listener
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setDark(e.matches);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Active section observer
  const updateActiveSection = useCallback(() => {
    const sections = ["about", "projects", "skills", "contact-form"];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  // Enhanced click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside as any);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside as any);
    };
  }, []);

  // Enhanced theme application with smooth transition
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      
      if (dark) {
        root.classList.add("dark");
        root.style.setProperty('color-scheme', 'dark');
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        root.style.setProperty('color-scheme', 'light');
        localStorage.setItem("theme", "light");
      }
    }
  }, [dark]);

  // Enhanced scroll navigation with loading state
  const scrollToIdOrNavigate = useCallback(async (id: string) => {
    setIsLoading(true);
    
    try {
      const el = document.getElementById(id);
      
      if (location.pathname !== "/") {
        navigate(`/#${id}`);
        setTimeout(() => {
          const newEl = document.getElementById(id);
          if (newEl) {
            const top = newEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top, behavior: "smooth" });
          }
          setIsLoading(false);
        }, 300);
        return;
      }

      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
        setIsLoading(false);
        return;
      }

      const attempts = 3;
      for (let i = 0; i < attempts; i++) {
        await new Promise(resolve => setTimeout(resolve, 100 * (i + 1)));
        const foundEl = document.getElementById(id);
        if (foundEl) {
          const foundTop = foundEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: foundTop, behavior: "smooth" });
          break;
        }
      }
    } catch (err) {
      console.error("Scroll error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [location.pathname, navigate]);

  const headerOffset = 80;

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("");
    }
    setMobileMenuOpen(false);
  };

  const handleNavClick = async (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    await scrollToIdOrNavigate(id);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setDark(!dark);
  };

  // Navigation data without emojies
  const navItems = [
    { href: "#about", label: "ABOUT" },
    { href: "#projects", label: "PROJECTS" },
    { href: "#skills", label: "SKILLS" },
    { href: "#contact-form", label: "CONTACT" }
  ];

  return (
    <header 
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-all duration-500 ${
        isScrolled 
          ? "bg-white/95 dark:bg-neutral-900/95 shadow-2xl py-2 border-b border-gray-200/30 dark:border-neutral-700/30" 
          : "bg-white/80 dark:bg-neutral-900/80 shadow-lg py-4"
      } ${isLoading ? 'pointer-events-none' : ''}`}
    >
      {/* Loading Bar */}
      <div className={`absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[color:var(--color-accent)] to-purple-600 transition-all duration-300 ${
        isLoading ? 'w-full opacity-100' : 'w-0 opacity-0'
      }`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Enhanced Logo */}
        <a
          href="/"
          onClick={handleHomeClick}
          className="flex items-center gap-3 group relative"
        >
          <div className="relative">
            <div 
              className="w-10 h-10 rounded-xl transition-all duration-500 group-hover:scale-110 shadow-lg relative overflow-hidden"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center text-white font-black text-sm tracking-widest">
                H
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black bg-gradient-to-r from-[color:var(--color-accent)] to-purple-600 bg-clip-text text-transparent transition-all duration-500 leading-tight tracking-tight">
              HONEY
            </span>
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400 transition-colors duration-300 tracking-widest">
              PORTFOLIO
            </span>
          </div>
        </a>

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href.slice(1))}
              className={`relative font-black text-sm tracking-wide transition-all duration-300 group/nav ${
                activeSection === item.href.slice(1)
                  ? "text-[color:var(--color-accent)] dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:text-[color:var(--color-accent)] dark:hover:text-white"
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              <div className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[color:var(--color-accent)] transition-all duration-300 group-hover/nav:w-full ${
                activeSection === item.href.slice(1) ? 'w-full' : ''
              }`} />
              <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[color:var(--color-accent)]/10 to-purple-600/10 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300" />
            </a>
          ))}
        </nav>

        {/* Enhanced Right side controls */}
        <div className="flex items-center gap-4">
        

          {/* Enhanced Theme Toggle */}
         {/* Enhanced Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            disabled={isLoading}
            className={`relative p-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 transition-all duration-700 hover:scale-110 hover:shadow-2xl group/theme ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:rotate-180'
            }`}
            title={`Switch to ${dark ? 'light' : 'dark'} mode`}
          >
            <div className="relative w-6 h-6">
              {/* Sun */}
              <div className={`absolute inset-0 transition-all duration-700 ${
                dark ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'
              }`}>
                <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 rounded-full" />
                <div className="absolute -inset-1 bg-amber-400/30 rounded-full blur-sm" />
              </div>
              
              {/* Moon */}
              <div className={`absolute inset-0 transition-all duration-700 ${
                dark ? 'opacity-100 scale-100 -rotate-180' : 'opacity-0 scale-50 rotate-90'
              }`}>
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-full" />
                <div className="absolute top-1 right-1 w-3 h-3 bg-blue-200/80 rounded-full" />
                <div className="absolute -inset-1 bg-blue-400/20 rounded-full blur-sm" />
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-200 to-orange-300 dark:from-blue-400 dark:to-purple-500 opacity-0 group-hover/theme:opacity-20 transition-opacity duration-500" />
          </button>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-gray-200 dark:border-gray-700"
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
            disabled={isLoading}
          >
            <div className={`w-5 h-5 relative transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`}>
              <div className={`absolute top-1/2 left-1/2 w-4 h-0.5 bg-current -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
              }`} />
              <div className={`absolute top-1/2 left-1/2 w-4 h-0.5 bg-current -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`} />
              <div className={`absolute top-1/2 left-1/2 w-4 h-0.5 bg-current -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
              }`} />
            </div>
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <div 
        ref={mobileMenuRef}
        className={`lg:hidden absolute top-full inset-x-0 transition-all duration-500 overflow-hidden ${
          mobileMenuOpen 
            ? "max-h-[70vh] opacity-100 bg-white/98 dark:bg-neutral-900/98 backdrop-blur-2xl shadow-2xl border-t border-gray-200/50 dark:border-neutral-700/50" 
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6">
          {/* Mobile Navigation Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
              <div className="flex flex-col">
                <span className="font-black text-gray-900 dark:text-white text-sm">NAVIGATION</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-bold">PORTFOLIO SECTIONS</span>
              </div>
            </div>
            <div className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-black text-gray-600 dark:text-gray-300">
              {navItems.length}
            </div>
          </div>
          
          <nav className="grid gap-2 mb-6">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href.slice(1))}
                className={`flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300 font-black text-sm tracking-wide border-2 ${
                  activeSection === item.href.slice(1)
                    ? "bg-[color:var(--color-accent)] text-white border-[color:var(--color-accent)] shadow-lg"
                    : "bg-transparent text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-[color:var(--color-accent)]/50"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span>{item.label}</span>
                <span className={`transition-transform duration-300 ${
                  activeSection === item.href.slice(1) ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                } group-hover:translate-x-0 group-hover:opacity-100`}>
                  →
                </span>
              </a>
            ))}
          </nav>
          
          {/* Enhanced Mobile footer */}
          <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-3">
              <span className="font-bold">© 2024 HONEY PORTFOLIO</span>
              <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-black">
                v2.0
              </span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-3 px-4 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black text-sm transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[color:var(--color-accent)]">
                DOWNLOAD CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}