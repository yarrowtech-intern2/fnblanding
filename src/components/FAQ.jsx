import React, { useState, useEffect, useRef } from "react";

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

/* ── FAQ Data ── */
const faqs = [
  {
    question: "What is the F&B-ERP Restaurant Management System?",
    answer:
      "F&B-ERP is a cloud-native, multi-tenant restaurant management system designed to handle user management, menu and recipe control, order processing, inventory, vendors, finance, analytics, and kitchen operations within a single unified platform.",
  },
  {
    question: "Who can use the F&B-ERP system?",
    answer:
      "The system supports multiple user roles including Restaurant Owner (Admin), Manager, Vendor, and Employees such as chefs, waiters, accountants, and cleaners, each with hierarchical role-based access control.",
  },
  {
    question: "Does the system support multiple restaurants and franchises?",
    answer:
      "Yes. The platform is built on a multi-tenant architecture that allows multiple restaurant brands, franchises, and locations with complete data isolation and centralized reporting.",
  },
  {
    question: "How does inventory management help reduce food wastage?",
    answer:
      "The platform provides real-time inventory tracking, multi-location stock control, predictive demand forecasting, expiry tracking, and automated reorder alerts to minimize food wastage.",
  },
  {
    question: "Does the system support kitchen operations?",
    answer:
      "Yes. It integrates with Kitchen Display Systems (KDS), supports intelligent order routing, preparation time tracking, quality checks, and real-time kitchen workflow optimization.",
  },
  {
    question: "Can the platform scale as the business grows?",
    answer:
      "Yes. The platform is built on a microservices and cloud-native architecture with auto-scaling, high availability, and support for thousands of concurrent users and locations.",
  },
  {
    question: "Does the system provide analytics and reporting?",
    answer:
      "It includes executive dashboards, inventory analytics, staff performance metrics, financial reports, predictive analytics, and export options such as PDF, Excel, and CSV.",
  },
  {
    question: "Can it integrate with POS systems and third-party services?",
    answer:
      "Yes. The system integrates with POS hardware, payment gateways, accounting software, delivery platforms, marketing tools, IoT devices, and external APIs using REST and GraphQL.",
  },
];

/* ── Chevron Icon ── */
const ChevronIcon = ({ open }) => (
  <svg
    className={`w-5 h-5 text-green-600 transition-transform duration-400 flex-shrink-0 ${open ? "rotate-180" : "rotate-0"}`}
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── Single FAQ Item ── */
const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  const [ref, inView] = useInView(0.1);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 60}ms, transform 0.55s ease ${index * 60}ms`,
      }}
      className={`group bg-white rounded-2xl overflow-hidden
        border transition-all duration-400
        ${isOpen
          ? "border-green-300 shadow-[0_8px_32px_rgba(22,101,52,0.13)]"
          : "border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:border-green-200 hover:shadow-[0_6px_24px_rgba(22,101,52,0.09)]"
        }`}
    >
      {/* Question Button */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4
          px-6 sm:px-7 py-5 text-left focus:outline-none"
      >
        {/* Index + Question */}
        <div className="flex items-center gap-4">
          <span className={`font-playfair text-lg font-bold leading-none flex-shrink-0
            transition-colors duration-300
            ${isOpen ? "text-green-500" : "text-gray-200 group-hover:text-green-200"}`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`font-dm text-sm sm:text-base font-semibold leading-snug
            transition-colors duration-300
            ${isOpen ? "text-green-700" : "text-gray-800"}`}
          >
            {faq.question}
          </span>
        </div>

        {/* Chevron */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
          transition-all duration-300
          ${isOpen ? "bg-green-50" : "bg-gray-50 group-hover:bg-green-50"}`}
        >
          <ChevronIcon open={isOpen} />
        </div>
      </button>

      {/* Answer — smooth height animation */}
      <div
        style={{ height, transition: "height 0.4s cubic-bezier(0.4,0,0.2,1)" }}
        className="overflow-hidden"
      >
        <div
          ref={contentRef}
          className="px-6 sm:px-7 pb-6 pt-1
            border-t border-green-100/80"
        >
          {/* Left accent bar */}
          <div className="flex gap-4">
            <div className="w-0.5 rounded-full bg-gradient-to-b from-green-400 to-green-200 flex-shrink-0" />
            <p className="font-dm text-sm sm:text-base text-gray-500 leading-relaxed font-light">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={`h-[2px] bg-gradient-to-r from-green-400 to-green-600
        transition-all duration-500
        ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

/* ── Main FAQ Component ── */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [headingRef, headingInView] = useInView(0.2);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-dm       { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <section
        id="faq"
        className="font-dm relative w-full overflow-hidden
          bg-gradient-to-b from-white via-green-50/60 to-white
          py-20 sm:py-24 lg:py-32"
      >
        {/* ── Decorative blobs ── */}
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full
          bg-green-100/40 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full
          bg-green-100/30 blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">

          {/* ── Heading ── */}
          <div
            ref={headingRef}
            className="text-center mb-14"
            style={{
              opacity: headingInView ? 1 : 0,
              transform: headingInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-green-400" />
              <span className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">
                Got Questions?
              </span>
              <span className="block w-8 h-px bg-green-400" />
            </div>

            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl
              font-extrabold text-gray-900 leading-tight"
            >
              Frequently Asked{" "}
              <span className="relative inline-block text-green-600">
                Questions
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 8" fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6 Q75 0 150 4 Q225 8 300 2"
                    stroke="#16a34a" strokeWidth="2.5"
                    strokeLinecap="round" fill="none"
                    strokeDasharray="380"
                    strokeDashoffset={headingInView ? "0" : "380"}
                    style={{ transition: "stroke-dashoffset 1.1s ease 0.5s" }}
                  />
                </svg>
              </span>
            </h2>

            <p className="mt-5 text-gray-500 text-base sm:text-lg font-light
              max-w-lg mx-auto leading-relaxed"
            >
              Everything you need to know about the F&amp;B-ERP platform.
            </p>
          </div>

          {/* ── FAQ Items ── */}
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;