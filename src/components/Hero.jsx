import React, { useEffect, useState } from "react";
import tableImage from "../assets/Images/resturent.jpg";
import { useLocation, useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────
   Inline SVG Icons
───────────────────────────────────────── */
const BoltIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const PlayIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

/* ─────────────────────────────────────────
   Hero Component
───────────────────────────────────────── */
const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* ── Scroll helper ── */
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = el.getBoundingClientRect().top + window.pageYOffset - 96;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  /* ── Navigate then scroll ── */
  const handleSectionClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 150);
    } else {
      scrollToSection(id);
    }
  };

  /* ── Transition helper ── */
  const fadeUp = (delay = "") =>
    `transition-all duration-700 ease-out ${delay} ${
      loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-dm       { font-family: 'DM Sans', sans-serif; }

        @keyframes slowZoom {
          from { transform: scale(1.04); }
          to   { transform: scale(1.12); }
        }
        .hero-bg-zoom {
          animation: slowZoom 18s ease-in-out infinite alternate;
        }

        @keyframes lineGrow {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .gold-underline::after {
          content: '';
          display: block;
          height: 2px;
          background: #fcd34d;
          animation: lineGrow 1s ease-out 1.4s forwards;
          width: 0%;
        }

        @keyframes scrollBounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(8px); }
        }
        .scroll-bounce {
          animation: scrollBounce 2s ease-in-out infinite;
        }
      `}</style>

      <section
        id="home"
        className="font-dm relative w-full min-h-screen flex items-center
          justify-center text-white overflow-hidden scroll-mt-24"
      >
        {/* ── Background Image (your local asset) ── */}
        <div
          className="absolute inset-0 hero-bg-zoom"
          style={{
            backgroundImage: `url(${tableImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.52) saturate(1.15)",
          }}
        />

        {/* ── Overlays ── */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/45 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* ── Gold Left Accent Bar ── */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, #d4a853 30%, #f0c97a 70%, transparent 100%)",
            opacity: 0.8,
          }}
        />

        {/* ── Corner Filigree ── */}
        <div className="absolute top-7 left-7 w-24 h-24 border-t-2 border-l-2 border-amber-400/30 pointer-events-none" />
        <div className="absolute bottom-7 right-7 w-24 h-24 border-b-2 border-r-2 border-amber-400/30 pointer-events-none" />

        {/* ── Grain Texture ── */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 text-center px-6 md:px-10 max-w-4xl w-full">

          {/* Eyebrow */}
          <div className={`inline-flex items-center gap-3 mb-6 ${fadeUp("delay-[100ms]")}`}>
            <span className="block w-8 h-px bg-amber-400/70" />
            <span className="text-amber-300 text-xs font-medium tracking-[0.22em] uppercase">
              Restaurant Management Platform
            </span>
            <span className="block w-8 h-px bg-amber-400/70" />
          </div>

          {/* Heading */}
          <h1
            className={`font-playfair text-4xl sm:text-5xl md:text-6xl font-extrabold
              leading-[1.1] text-white mb-7 drop-shadow-2xl ${fadeUp("delay-[250ms]")}`}
          >
            Smart ERP Solutions for
            <br className="hidden sm:block" />
            <span className="text-amber-300 gold-underline inline-block mt-1">
              Food &amp; Beverage
            </span>{" "}
            Excellence
          </h1>

          {/* Description */}
          <p
            className={`text-base sm:text-lg md:text-xl font-light text-white/80
              max-w-2xl mx-auto leading-relaxed mb-10 ${fadeUp("delay-[400ms]")}`}
          >
            Simplify restaurant operations, reduce waste, and empower your team
            with intelligent automation and real-time insights.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${fadeUp("delay-[550ms]")}`}>
            {/* Primary */}
            <button
              onClick={() => handleSectionClick("contact")}
              className="inline-flex items-center justify-center gap-2
                px-9 py-3.5 rounded
                bg-gradient-to-r from-green-800 via-green-700 to-green-500
                text-white text-sm font-medium tracking-widest uppercase
                shadow-[0_4px_24px_rgba(45,106,79,0.5)]
                hover:shadow-[0_10px_40px_rgba(45,106,79,0.65)]
                hover:-translate-y-1 hover:scale-[1.03]
                active:scale-95 transition-all duration-300"
            >
              <BoltIcon />
              Explore Here
            </button>

            {/* Outline */}
            <button
              onClick={() => handleSectionClick("services")}
              className="inline-flex items-center justify-center gap-2
                px-9 py-3.5 rounded
                border border-white/40 backdrop-blur-sm
                text-white text-sm font-medium tracking-widest uppercase
                hover:border-amber-400 hover:text-amber-300 hover:bg-white/10
                hover:-translate-y-1 hover:scale-[1.03]
                active:scale-95 transition-all duration-300"
            >
              <PlayIcon />
              View Services
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;