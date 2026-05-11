import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import aboutImage from "../assets/Images/about.jpg";

/* ── Intersection Observer hook ── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { setInView(entry.isIntersecting); },
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
    number: "01",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zm14 14v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Role Based Modules",
    desc: "Admins, managers, chefs, waiters, accountants, vendors, and inventory teams each get a focused workspace.",
  },
  {
    number: "02",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Live Operational Flow",
    desc: "Orders, kitchen status, stock movement, payments, and staff activity stay connected across the restaurant.",
  },
  {
    number: "03",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: "Clear Business Visibility",
    desc: "Dashboards and account history help teams understand daily performance without digging through manual records.",
  },
];

/* ── Feature Card ── */
const FeatureCard = ({ item, index }) => {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className="group relative"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : (index % 2 === 0 ? "translateX(-32px)" : "translateX(32px)"),
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
      }}
    >
      <div className="relative bg-white rounded-2xl p-7 sm:p-8
        border border-gray-100
        shadow-[0_2px_16px_rgba(0,0,0,0.06)]
        group-hover:shadow-[0_16px_48px_rgba(22,101,52,0.13)]
        group-hover:-translate-y-2 group-hover:border-green-200
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        overflow-hidden cursor-pointer
        [backface-visibility:hidden] [will-change:transform]"
      >
        {/* Number badge */}
        <div className="absolute top-4 right-6 text-4xl font-black text-gray-50 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity">
          {item.number}
        </div>

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
          text-gray-800 py-14 sm:pt-24 scroll-mt-24 overflow-hidden"
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
                How It Helps
              </span>
              <span className="block w-8 h-px bg-green-400" />
            </div>

            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl
              font-extrabold text-gray-900 leading-tight">
              Less manual chasing, <br className="hidden sm:block" />
              <span className="relative inline-block text-green-600">
                more controlled service
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8" fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6 Q50 0 100 4 Q150 8 200 2"
                    stroke="#16a34a" strokeWidth="2.5"
                    strokeLinecap="round" fill="none"
                    strokeDasharray="220"
                    strokeDashoffset={headingInView ? "0" : "220"}
                    style={{ transition: "stroke-dashoffset 1s ease 0.5s" }}
                  />
                </svg>
              </span>
            </h1>
          </div>
        </div>

        {/* ══ MAIN CONTENT — Text + Image ══ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16
          grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left — Text */}
          <div
            ref={textRef}
            className="space-y-7 text-center md:text-left"
            style={fadeIn(textInView, "right")}
          >
            <h2 className="font-playfair text-3xl sm:text-4xl
              font-extrabold text-gray-900 leading-tight"
            >
              The connected <br />
              <span className="text-transparent bg-clip-text
                bg-gradient-to-r from-green-600 to-green-400">
                food ecosystem
              </span>
            </h2>

            <p className="text-gray-500 text-base sm:text-lg font-light
              max-w-xl mx-auto md:mx-0 leading-relaxed"
            >
              The landing page now explains the product the way a restaurant owner thinks about it: 
              people, orders, inventory, payments, and the decisions that connect them.
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
                  px-9 py-3.5 rounded-full
                  bg-gradient-to-r from-green-700 via-green-600 to-green-500
                  text-white text-sm font-medium tracking-widest uppercase
                  shadow-[0_4px_20px_rgba(22,101,52,0.4)]
                  hover:shadow-[0_10px_36px_rgba(22,101,52,0.55)]
                  hover:-translate-y-1 hover:scale-[1.03]
                  active:scale-95 transition-all duration-300 cursor-pointer"
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
              alt="About FENBMMS Platform"
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