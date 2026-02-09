import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const location = useLocation();

  const observerRef = useRef(null);
  const isManualScroll = useRef(false);

  /* NAV ITEMS */
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  /* PATH → SECTION ID */
  const pathToId = {
    "/": "home",
    "/services": "services",
    "/about": "about",
    "/faq": "faq",
    "/contact": "contact",
  };

  /* CLOSE MOBILE MENU ON ROUTE CHANGE */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  /* HEADER BG ON SCROLL */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* UNLOCK OBSERVER WHEN USER SCROLLS MANUALLY */
  useEffect(() => {
    const unlock = () => (isManualScroll.current = false);
    window.addEventListener("wheel", unlock, { passive: true });
    window.addEventListener("touchmove", unlock, { passive: true });

    return () => {
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchmove", unlock);
    };
  }, []);

  /* ✅ INTERSECTION OBSERVER (NO SKIP FIX) */
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
          const path =
            Object.keys(pathToId).find((p) => pathToId[p] === id) || "/";

          setActiveSection(path);
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [location.pathname]);

  const isActive = (path) =>
    location.pathname === "/" ? activeSection === path : location.pathname === path;

  /* HANDLE NAV CLICK (DESKTOP + MOBILE) */
  const handleNavClick = (e, path) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(pathToId[path]);
      if (!el) return;

      isManualScroll.current = true;

      const headerOffset = 96;
      const offset =
        el.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offset, behavior: "smooth" });

      setTimeout(() => {
        isManualScroll.current = false;
        setActiveSection(path);
      }, 700);
    }

    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-green-100/95 backdrop-blur shadow-md"
          : "bg-green-50/90 backdrop-blur"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="font-bold text-lg text-gray-800">
          Food & Beverage
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                isActive(item.path)
                  ? "bg-lime-500 text-white shadow"
                  : "text-gray-800 hover:bg-lime-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsMenuOpen((p) => !p)}
          className="md:hidden p-2 rounded-lg hover:bg-lime-100 transition"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-green-50 border-t border-green-200 px-4 py-4">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={`block px-4 py-3 rounded-lg text-center font-medium transition ${
                    isActive(item.path)
                      ? "bg-lime-500 text-white"
                      : "text-gray-800 hover:bg-lime-100"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
