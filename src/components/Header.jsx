import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const location = useLocation();

  const observerRef = useRef(null);
  const isManualScroll = useRef(false);

  /* ── NAV ITEMS ── */
  const navItems = [
    { name: "Home",     path: "/" },
    { name: "Services", path: "/services" },
    { name: "About",    path: "/about" },
    { name: "FAQ",      path: "/faq" },
    { name: "Contact",  path: "/contact" },
  ];

  const pathToId = {
    "/":         "home",
    "/services": "services",
    "/about":    "about",
    "/faq":      "faq",
    "/contact":  "contact",
  };

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const unlock = () => (isManualScroll.current = false);
    window.addEventListener("wheel", unlock, { passive: true });
    window.addEventListener("touchmove", unlock, { passive: true });
    return () => {
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchmove", unlock);
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(location.pathname);
      return;
    }
    const sections = Object.values(pathToId)
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          const path = Object.keys(pathToId).find((p) => pathToId[p] === id) || "/";
          setActiveSection(path);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [location.pathname]);

  const isActive = (path) =>
    location.pathname === "/" ? activeSection === path : location.pathname === path;

  const handleNavClick = (e, path) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(pathToId[path]);
      if (!el) return;
      isManualScroll.current = true;
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 96;
      window.scrollTo({ top: offset, behavior: "smooth" });
      setTimeout(() => {
        isManualScroll.current = false;
        setActiveSection(path);
      }, 700);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-dm       { font-family: 'DM Sans', sans-serif; }

        .nav-link-underline {
          position: relative;
        }
        .nav-link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #16a34a;
          border-radius: 999px;
          transition: width 0.3s ease;
        }
        .nav-link-underline:hover::after {
          width: 60%;
        }
        .nav-link-underline.active-link::after {
          width: 60%;
          background: #16a34a;
        }
      `}</style>

      <header
        className={`font-dm fixed top-0 w-full z-50 transition-all duration-400
          ${isScrolled
            ? "bg-white/97 backdrop-blur-md shadow-[0_1px_24px_rgba(0,0,0,0.08)] border-b border-gray-100"
            : "bg-white/80 backdrop-blur-sm border-b border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">

          {/* ── LOGO ── */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-2.5 group"
          >
            <div className="flex flex-col leading-none">
              <span className="font-playfair font-bold text-base text-gray-900
                group-hover:text-green-700 transition-colors duration-300">
                Food &amp; Beverage
              </span>
              <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-gray-400">
                ERP Solutions
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className={`nav-link-underline px-4 py-2 text-sm font-medium
                  transition-colors duration-300 rounded-md
                  ${isActive(item.path)
                    ? "active-link text-green-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                {item.name}
              </Link>
            ))}

          </nav>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            onClick={() => setIsMenuOpen((p) => !p)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center
              text-gray-600 hover:text-gray-900 hover:bg-gray-100
              active:bg-gray-200 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ── MOBILE MENU ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300
            ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
        >
          <nav className="bg-white border-t border-gray-100
            px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium
                      transition-all duration-250
                      ${isActive(item.path)
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    {/* Active indicator dot */}
                    {isActive(item.path) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3 flex-shrink-0" />
                    )}
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;