import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import aboutImage from "../assets/Images/about.jpg";

/* ── Intersection Observer hook ── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

/* ── Features data ── */
const features = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: "AI-powered Inventory",
    desc: "Optimize stock levels and reduce waste with intelligent forecasting.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Customer Engagement",
    desc: "Personalized offers and loyalty programs to retain customers.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Sustainability Driven",
    desc: "Eco-friendly and cost-efficient operational practices.",
  },
];

/* ── Feature Card ── */
const FeatureCard = ({ item, index }) => {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className="group relative bg-white rounded-2xl p-7 sm:p-8
        border border-gray-100
        shadow-[0_2px_16px_rgba(0,0,0,0.06)]
        hover:shadow-[0_16px_48px_rgba(22,101,52,0.13)]
        hover:-translate-y-2 hover:border-green-200
        transition-all duration-500 overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms, box-shadow 0.4s, border-color 0.4s`,
      }}
    >
      {/* Background blob */}
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full
        bg-green-50 opacity-0 group-hover:opacity-100
        transition-opacity duration-500 pointer-events-none" />

      {/* Icon */}
      <div className="relative w-12 h-12 rounded-xl
        bg-gradient-to-br from-green-500 to-green-700
        flex items-center justify-center text-white
        shadow-[0_4px_12px_rgba(22,101,52,0.3)]
        group-hover:scale-110 group-hover:rotate-3
        transition-transform duration-300 mb-5"
      >
        {item.icon}
      </div>

      <h4 className="relative text-lg font-bold text-gray-800
        group-hover:text-green-700 transition-colors duration-300 mb-2">
        {item.title}
      </h4>
      <p className="relative text-sm sm:text-base text-gray-500
        group-hover:text-gray-600 leading-relaxed transition-colors duration-300">
        {item.desc}
      </p>

      {/* Bottom accent line */}
      <span className="absolute bottom-0 left-0 h-[3px] w-0
        bg-gradient-to-r from-green-400 to-green-600
        group-hover:w-full transition-all duration-500 rounded-b-2xl" />
    </div>
  );
};

/* ── Main Component ── */
const About = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [headingRef, headingInView] = useInView(0.2);
  const [textRef, textInView] = useInView(0.2);
  const [imgRef, imgInView] = useInView(0.15);
  const [featHeadRef, featHeadInView] = useInView(0.2);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (!el) return;
    const offset = el.getBoundingClientRect().top + window.pageYOffset - 96;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToContact, 150);
    } else {
      scrollToContact();
    }
  };

  const fadeIn = (inView, dir = "up", delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView
      ? "translate(0,0)"
      : dir === "right"
      ? "translateX(-36px)"
      : dir === "left"
      ? "translateX(36px)"
      : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-dm       { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <section
        id="about"
        className="font-dm relative bg-gradient-to-b from-gray-50 to-white
          text-gray-800 pt-24 scroll-mt-24 overflow-hidden"
      >
        {/* ── Decorative blobs ── */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full
          bg-green-100/40 blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-40 left-0 w-64 h-64 rounded-full
          bg-green-50/60 blur-3xl -translate-x-1/3 pointer-events-none" />

        {/* ══ SECTION TITLE ══ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            ref={headingRef}
            className="text-center py-10 sm:py-12"
            style={fadeIn(headingInView, "up")}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-green-400" />
              <span className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">
                Who We Are
              </span>
              <span className="block w-8 h-px bg-green-400" />
            </div>

            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl
              font-extrabold text-gray-900 leading-tight">
              About{" "}
              <span className="relative inline-block text-green-600">
                Us
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 60 8" fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6 Q15 0 30 4 Q45 8 60 2"
                    stroke="#16a34a" strokeWidth="2.5"
                    strokeLinecap="round" fill="none"
                    strokeDasharray="80"
                    strokeDashoffset={headingInView ? "0" : "80"}
                    style={{ transition: "stroke-dashoffset 1s ease 0.5s" }}
                  />
                </svg>
              </span>
            </h1>
          </div>
        </div>

        {/* ══ MAIN CONTENT — Text + Image ══ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20
          grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left — Text */}
          <div
            ref={textRef}
            className="space-y-7 text-center md:text-left"
            style={fadeIn(textInView, "right")}
          >
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl
              font-extrabold text-gray-900 leading-tight"
            >
              Empowering the Future of
              <br />
              <span className="text-transparent bg-clip-text
                bg-gradient-to-r from-green-600 to-green-400">
                Food &amp; Beverage
              </span>
            </h2>

            <p className="text-gray-500 text-base sm:text-lg font-light
              max-w-xl mx-auto md:mx-0 leading-relaxed"
            >
              We build smart technology solutions for restaurants, cafés,
              cloud kitchens, and food businesses to manage operations
              effortlessly — from kitchen to customer.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <span className="block w-10 h-px bg-green-300" />
              <span className="text-green-600 text-sm font-medium tracking-wider uppercase">
                Built for excellence
              </span>
            </div>

            <div className="flex justify-center md:justify-start">
              <button
                onClick={handleContactClick}
                className="inline-flex items-center gap-2
                  px-9 py-3.5 rounded
                  bg-gradient-to-r from-green-700 via-green-600 to-green-500
                  text-white text-sm font-medium tracking-widest uppercase
                  shadow-[0_4px_20px_rgba(22,101,52,0.4)]
                  hover:shadow-[0_10px_36px_rgba(22,101,52,0.55)]
                  hover:-translate-y-1 hover:scale-[1.03]
                  active:scale-95 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2}>
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2
                    2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Get in Touch
              </button>
            </div>
          </div>

          {/* Right — Image */}
          <div
            ref={imgRef}
            style={fadeIn(imgInView, "left", 150)}
            className="relative"
          >
            {/* Decorative frame behind image */}
            <div className="absolute -top-4 -right-4 w-full h-full
              rounded-3xl border-2 border-green-200/60 pointer-events-none" />

            <img
              src={aboutImage}
              alt="About F&B Platform"
              className="relative rounded-3xl shadow-2xl w-full object-cover
                max-h-[380px] sm:max-h-[430px]
                hover:shadow-[0_24px_60px_rgba(22,101,52,0.2)]
                transition-all duration-500"
            />


          </div>
        </div>

        {/* ══ FEATURES SECTION ══ */}
        <div className="py-20 sm:py-24 relative">
          {/* Subtle top border */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-green-200" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/* Features heading */}
            <div
              ref={featHeadRef}
              className="text-center mb-14"
              style={fadeIn(featHeadInView, "up")}
            >
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-green-400" />
                <span className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">
                  Core Features
                </span>
                <span className="block w-8 h-px bg-green-400" />
              </div>

              <h3 className="font-playfair text-3xl sm:text-4xl md:text-5xl
                font-extrabold text-gray-900 leading-tight"
              >
                What We{" "}
                <span className="relative inline-block text-green-600">
                  Offer
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 80 8" fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 6 Q20 0 40 4 Q60 8 80 2"
                      stroke="#16a34a" strokeWidth="2.5"
                      strokeLinecap="round" fill="none"
                      strokeDasharray="100"
                      strokeDashoffset={featHeadInView ? "0" : "100"}
                      style={{ transition: "stroke-dashoffset 1s ease 0.5s" }}
                    />
                  </svg>
                </span>
              </h3>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
              {features.map((item, i) => (
                <FeatureCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;