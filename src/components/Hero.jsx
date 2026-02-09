import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import tableImage from "../assets/Images/resturent.jpg";

const Hero = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  /* 🔹 SCROLL TO SECTION BY ID (ROUTER SAFE) */
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 96; // match fixed header height
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  /* 🔹 HANDLE CTA CLICK */
  const handleSectionClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 150);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center
      text-white overflow-hidden scroll-mt-24"
      style={{
        backgroundImage: `url(${tableImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div
        className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12
        max-w-4xl"
        data-aos="zoom-in-up"
        data-aos-delay="200"
      >
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl
        font-bold mb-6 leading-tight drop-shadow-2xl">
          Smart ERP Solutions for
          <br className="hidden sm:block" />
          <span className="text-amber-300 inline-block mt-2 sm:mt-0">
            Food & Beverage Excellence
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-200
        max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-md">
          Simplify restaurant operations, reduce waste, and empower your team
          with intelligent automation and real-time insights.
        </p>

        {/* CTA BUTTONS (SECTION ID BASED) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleSectionClick("contact")}
            className="inline-flex justify-center items-center
            px-8 py-3 rounded-lg font-semibold text-white
            bg-gradient-to-r from-green-600 to-green-500
            hover:from-green-700 hover:to-green-600
            shadow-lg hover:shadow-2xl
            transition-all duration-300
            transform hover:scale-105 active:scale-95"
          >
            Explore Here
          </button>

          <button
            onClick={() => handleSectionClick("services")}
            className="inline-flex justify-center items-center
            px-8 py-3 rounded-lg font-semibold
            border border-white/70 text-white
            hover:bg-white hover:text-gray-900
            transition-all duration-300
            transform hover:scale-105 active:scale-95"
          >
            View Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
