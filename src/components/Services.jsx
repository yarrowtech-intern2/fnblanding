import React, { useEffect } from "react";
import {
  FaUsers,
  FaUtensils,
  FaBoxes,
  FaTruckLoading,
  FaTasks,
  FaCheckCircle,
  FaMoneyBillWave,
  FaChartBar,
  FaPlug,
} from "react-icons/fa";

// ✅ AOS
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    icon: <FaUsers />,
    title: "Multi-Tenant User Management",
    description:
      "Role-based access control with tenant-level configurations built for scalability.",
  },
  {
    icon: <FaUtensils />,
    title: "Dynamic Menu & Recipe Management",
    description:
      "Real-time menu updates, ingredient tracking, and cost-optimized recipes.",
  },
  {
    icon: <FaBoxes />,
    title: "Intelligent Inventory Control",
    description:
      "Smart stock tracking, automated restocking alerts, and loss prevention.",
  },
  {
    icon: <FaTruckLoading />,
    title: "Vendor & Supply Chain Management",
    description:
      "Centralized supplier management with seamless procurement workflows.",
  },
  {
    icon: <FaTasks />,
    title: "Production Planning & Kitchen Ops",
    description:
      "Optimized scheduling and resource allocation for high kitchen efficiency.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Quality Control & Food Safety",
    description:
      "Compliance-ready workflows with automated audits and safety reporting.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Financial Management & Accounting",
    description:
      "Expense tracking, invoicing, profit analysis, and accounting automation.",
  },
  {
    icon: <FaChartBar />,
    title: "Business Intelligence & Analytics",
    description:
      "Interactive dashboards with actionable insights and growth metrics.",
  },
  {
    icon: <FaPlug />,
    title: "System Integration & APIs",
    description:
      "Secure APIs and integrations with POS, ERP, and third-party platforms.",
  },
];

/* ─────────────────────────────────────────
   Single Service Card (Same UI)
───────────────────────────────────────── */
const ServiceCard = ({ service, index }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 80}
      className="group relative bg-white rounded-2xl p-7 sm:p-8
        border border-gray-100
        shadow-[0_2px_16px_rgba(0,0,0,0.06)]
        hover:shadow-[0_16px_48px_rgba(22,101,52,0.14)]
        hover:-translate-y-2 hover:border-green-300
        transition-all duration-500 overflow-hidden cursor-default"
    >
      {/* Subtle background blob on hover */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 rounded-full
        bg-green-50 opacity-0 group-hover:opacity-100
        transition-opacity duration-500 pointer-events-none"
      />

      {/* Icon */}
      <div
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl
        bg-gradient-to-br from-green-500 to-green-700
        flex items-center justify-center
        text-white text-2xl sm:text-3xl
        shadow-[0_4px_14px_rgba(22,101,52,0.35)]
        group-hover:scale-110 group-hover:rotate-3
        transition-transform duration-400"
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        className="relative mt-5 text-lg sm:text-xl font-bold
        text-gray-800 group-hover:text-green-700
        transition-colors duration-300 leading-snug"
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className="relative mt-3 text-sm sm:text-base
        text-gray-500 leading-relaxed
        group-hover:text-gray-600 transition-colors duration-300"
      >
        {service.description}
      </p>

      {/* Bottom accent line */}
      <span
        className="absolute bottom-0 left-0 h-[3px] w-0
        bg-gradient-to-r from-green-400 to-green-600
        group-hover:w-full transition-all duration-500 rounded-b-2xl"
      />
    </div>
  );
};

/* ─────────────────────────────────────────
   Services Section
───────────────────────────────────────── */
const Services = () => {
  // ✅ AOS Init
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <section
        id="services"
        className="font-dm relative py-20 sm:py-24 lg:py-32 overflow-hidden
          bg-gradient-to-b from-white via-green-50/60 to-white"
      >
        {/* Decorative background shapes */}
        <div
          className="absolute top-0 left-0 w-72 h-72 rounded-full
          bg-green-100/40 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full
          bg-green-100/30 blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div data-aos="fade-up" className="text-center mb-16 sm:mb-20">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-green-400" />
              <span className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">
                What We Offer
              </span>
              <span className="block w-8 h-px bg-green-400" />
            </div>

            {/* Main title */}
            <h2
              className="font-playfair text-4xl sm:text-5xl lg:text-6xl
              font-extrabold text-gray-900 leading-tight"
            >
              Our{" "}
              <span className="relative inline-block text-green-600">
                Services
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6 Q50 0 100 4 Q150 8 200 2"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="220"
                    strokeDashoffset="0"
                  />
                </svg>
              </span>
            </h2>

            {/* Subtitle */}
            <p
              className="mt-5 text-gray-500 text-base sm:text-lg font-light
              max-w-xl mx-auto leading-relaxed"
            >
              End-to-end tools designed to modernize every corner of your
              food &amp; beverage operation.
            </p>
          </div>

          {/* Cards Grid */}
          <div
            className="grid gap-6 sm:gap-7
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
