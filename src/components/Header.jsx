import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const location = useLocation();

  const observerRef = useRef(null);
  const isManualScroll = useRef(false);

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
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
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
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        .hdr { font-family: 'Outfit', sans-serif; }

        .hdr-nav-link {
          position: relative;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          padding: 4px 14px;
          transition: color 0.25s;
        }
        .hdr-nav-link::after {
          content:'';
          position: absolute;
          bottom: 0; left: 14px;
          width: 0; height: 2px;
          background: #16a34a;
          border-radius: 2px;
          transition: width 0.25s ease;
        }
        .hdr-nav-link:hover::after,
        .hdr-nav-link.hdr-active::after { width: calc(100% - 28px); }

        /* Hamburger bars */
        .hdr-bar {
          display: block;
          width: 22px; height: 2px;
          background: #1a1a1a;
          border-radius: 99px;
          transition: all 0.3s ease;
        }
        .hdr-bar-1-open { transform: rotate(45deg) translate(3px, 3px); }
        .hdr-bar-2-open { opacity: 0; width: 0; }
        .hdr-bar-3-open { transform: rotate(-45deg) translate(3px, -3px); }

        /* Mobile menu animation */
        .hdr-mobile-open {
          animation: hdrDown 0.28s ease both;
        }
        @keyframes hdrDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header
        className="hdr"
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50,
          transition: 'background 0.3s, box-shadow 0.3s',
          background: isScrolled ? '#fff' : 'transparent',
          boxShadow: isScrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        {/* ── MAIN BAR ── */}
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          padding: '0 20px',
          height: 68,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}>

          {/* LOGO */}
          <Link to="/" onClick={(e) => handleNavClick(e, "/")} style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
              <span style={{
                fontFamily: 'Outfit,sans-serif', fontWeight: 900,
                fontSize: 'clamp(16px, 3.5vw, 22px)',
                color: '#1a1a1a', letterSpacing: '-0.3px',
              }}>
                Food &amp; Beverage
              </span>
              <span style={{
                fontFamily: 'Outfit,sans-serif', fontWeight: 700,
                fontSize: '9px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#FFD66B',
              }}>
                ERP Solutions
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV — centered glass pill */}
          <nav style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            display: 'none',   /* overridden by media query below */
            alignItems: 'center', gap: 0,
            background: isScrolled ? 'transparent' : 'rgba(255,255,255,0.78)',
            backdropFilter: isScrolled ? 'none' : 'blur(12px)',
            WebkitBackdropFilter: isScrolled ? 'none' : 'blur(12px)',
            borderRadius: 99,
            padding: isScrolled ? '0 4px' : '6px 8px',
            boxShadow: isScrolled ? 'none' : '0 2px 16px rgba(0,0,0,0.08)',
            border: isScrolled ? 'none' : '1px solid rgba(255,255,255,0.5)',
            transition: 'all 0.3s ease',
          }}
            className="hdr-desktop-nav"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className={`hdr-nav-link ${isActive(item.path) ? "hdr-active" : ""}`}
                style={{
                  color: isActive(item.path) ? '#111' : '#555',
                  fontWeight: isActive(item.path) ? 700 : 500,
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setIsMenuOpen(p => !p)}
            className="hdr-hamburger"
            aria-label="Toggle menu"
            style={{
              display: 'none',  /* shown via media query */
              flexDirection: 'column', gap: 5,
              background: 'none', border: 'none', cursor: 'pointer', padding: 4,
            }}
          >
            <span className={`hdr-bar ${isMenuOpen ? 'hdr-bar-1-open' : ''}`} />
            <span className={`hdr-bar ${isMenuOpen ? 'hdr-bar-2-open' : ''}`} />
            <span className={`hdr-bar ${isMenuOpen ? 'hdr-bar-3-open' : ''}`} />
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMenuOpen && (
          <nav
            className="hdr-mobile-open hdr-mobile-nav"
            style={{
              background: '#fff',
              borderTop: '1px solid #f0f0f0',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                style={{
                  display: 'block',
                  padding: '14px 24px',
                  fontFamily: 'Outfit,sans-serif',
                  fontSize: 16, fontWeight: isActive(item.path) ? 700 : 500,
                  color: isActive(item.path) ? '#16a34a' : '#444',
                  borderBottom: '1px solid #f5f5f5',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}

        {/* Responsive CSS injected */}
        <style>{`
          @media (min-width: 768px) {
            .hdr-desktop-nav { display: flex !important; }
            .hdr-hamburger   { display: none !important; }
          }
          @media (max-width: 767px) {
            .hdr-desktop-nav { display: none !important; }
            .hdr-hamburger   { display: flex !important; }
            .hdr-mobile-nav  { display: block; }
          }
        `}</style>
      </header>
    </>
  );
};

export default Header;