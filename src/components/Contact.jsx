import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

// ✅ AOS
import AOS from "aos";
import "aos/dist/aos.css";

/* ── Input Field ── */
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  textarea = false,
}) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
      {label}
      {required && <span className="text-red-500 text-base leading-none">*</span>}
    </label>

    {textarea ? (
      <textarea
        name={name}
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}...`}
        className="w-full px-4 py-3 rounded-xl border border-gray-200
          text-sm text-gray-800 placeholder:text-gray-400
          bg-gray-50 focus:bg-white
          focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-400
          transition-all duration-300 resize-none"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={`Enter your ${label.toLowerCase()}...`}
        className="w-full px-4 py-3 rounded-xl border border-gray-200
          text-sm text-gray-800 placeholder:text-gray-400
          bg-gray-50 focus:bg-white
          focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-400
          transition-all duration-300"
      />
    )}
  </div>
);

/* ── Contact Info Item ── */
const ContactItem = ({ href, icon, text, hoverColor }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    className={`flex items-start gap-4 group transition-colors duration-300 ${hoverColor}`}
  >
    <div
      className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-green-50
      flex items-center justify-center flex-shrink-0
      border border-gray-100 group-hover:border-green-200
      transition-all duration-300 shadow-sm"
    >
      {icon}
    </div>

    <span
      className="text-sm sm:text-base text-gray-600 group-hover:text-inherit
      leading-relaxed pt-2 transition-colors duration-300"
    >
      {text}
    </span>
  </a>
);

/* ─────────────────────────────────────────
   Toast Component (Bottom Right)
───────────────────────────────────────── */
const Toast = ({ show, type = "success", message, onClose }) => {
  if (!show) return null;

  const styles =
    type === "success"
      ? "bg-green-600 border-green-300"
      : "bg-red-600 border-red-300";

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <div
        className={`min-w-[260px] max-w-[340px] text-white px-5 py-4 rounded-xl
        shadow-[0_12px_40px_rgba(0,0,0,0.22)]
        border ${styles}
        flex items-start gap-3
        animate-[toastIn_0.35s_ease-out]`}
      >
        {/* Icon */}
        <div className="mt-0.5 flex-shrink-0">
          {type === "success" ? (
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="13" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="text-sm font-semibold tracking-wide">
            {type === "success" ? "Success" : "Error"}
          </p>
          <p className="text-sm text-white/90 leading-relaxed mt-0.5">
            {message}
          </p>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="text-white/90 hover:text-white transition"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

/* ─────────────────────────────────────────
   Main Contact Component
───────────────────────────────────────── */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Toast State
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  // ✅ AOS Init
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Mobile only digits (no letters)
    if (name === "mobile") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.mobile || !formData.company) {
    showToast("error", "Please fill all required fields.");
    return;
  }

  if (formData.mobile.length !== 10) {
    showToast("error", "Please enter a valid 10-digit mobile number.");
    return;
  }

  try {
    setIsSubmitting(true);

    const res = await fetch(import.meta.env.VITE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        company: formData.company,
        message: formData.message,
        project: "FB", // ✅ Sheet 5 (F&B)
      }).toString(),
    });

    const out = await res.json();

    setIsSubmitting(false);

    if (!out.ok) {
      showToast("error", out.error || "Failed to submit.");
      return;
    }

    setSubmitSuccess(true);
    showToast("success", "Thank you! We'll contact you shortly.");

    setFormData({
      name: "",
      email: "",
      mobile: "",
      company: "",
      message: "",
    });

    setTimeout(() => setSubmitSuccess(false), 4000);
  } catch (err) {
    setIsSubmitting(false);
    showToast("error", "Something went wrong. Please try again.");
  }
};

  return (
    <>
      {/* Toast */}
      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-dm       { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <section
        id="contact"
        className="font-dm relative bg-gradient-to-b from-white via-green-50/60 to-white
          pt-24 pb-24 scroll-mt-24 overflow-hidden"
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full
          bg-green-100/40 blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full
          bg-green-100/30 blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Heading */}
          <div data-aos="fade-up" className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-green-400" />
              <span className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">
                Reach Out
              </span>
              <span className="block w-8 h-px bg-green-400" />
            </div>

            <h2
              className="font-playfair text-4xl sm:text-5xl lg:text-6xl
              font-extrabold text-gray-900 leading-tight"
            >
              Get{" "}
              <span className="relative inline-block text-green-600">
                Started
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 160 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6 Q40 0 80 4 Q120 8 160 2"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              Today
            </h2>

            <p className="mt-5 text-gray-500 text-base sm:text-lg font-light max-w-lg mx-auto leading-relaxed">
              Choose a plan and connect with our team to transform your restaurant
              operations.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* LEFT COLUMN */}
            <div data-aos="fade-right" className="space-y-6">
              {/* Subscription Plans */}
              <div
                className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-500
                rounded-2xl p-7 sm:p-8 text-white
                shadow-[0_8px_32px_rgba(22,101,52,0.35)]
                overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 mb-5">
                    <div className="w-1 h-5 rounded-full bg-white/60" />
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold">
                      Subscription Plans
                    </h3>
                  </div>

                  <ul className="space-y-5">
                    {[
                      {
                        title: "Basic",
                        desc: "Inventory + Order Management",
                        badge: "Starter",
                      },
                      {
                        title: "Professional",
                        desc: "Full ERP Suite",
                        badge: "Popular",
                      },
                      {
                        title: "Enterprise",
                        desc: "Custom Solutions",
                        badge: "Advanced",
                      },
                    ].map(({ title, desc, badge }) => (
                      <li key={title} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            className="w-3.5 h-3.5 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="font-semibold text-sm sm:text-base">
                              {title}
                            </h4>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/20 tracking-wide">
                              {badge}
                            </span>
                          </div>
                          <p className="text-white/80 text-sm">{desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact Info */}
              <div
                className="bg-white rounded-2xl p-7 sm:p-8
                border border-gray-100
                shadow-[0_2px_16px_rgba(0,0,0,0.06)]
                hover:shadow-[0_8px_32px_rgba(22,101,52,0.1)]
                transition-shadow duration-400"
              >
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-1 h-5 rounded-full bg-green-400" />
                  <h3 className="font-playfair text-lg sm:text-xl font-bold text-gray-900">
                    Contact Information
                  </h3>
                </div>

                <div className="space-y-5">
                  <ContactItem
                    href="mailto:info@fnb-solutions.com"
                    icon={<FaEnvelope className="text-blue-500 text-sm" />}
                    text="info@fnb-solutions.com"
                    hoverColor="hover:text-blue-500"
                  />
                  <div className="h-px bg-gray-100" />
                  <ContactItem
                    href="tel:+919830590929"
                    icon={<FaPhoneAlt className="text-green-500 text-sm" />}
                    text="+91 98305 90929"
                    hoverColor="hover:text-green-600"
                  />
                  <div className="h-px bg-gray-100" />
                  <ContactItem
                    href="https://www.google.com/maps?q=3A,+Bertram+St,+Esplanade,+Dharmatala,+Kolkata+700087"
                    icon={<FaMapMarkerAlt className="text-red-500 text-sm" />}
                    text="3A, Bertram St, Esplanade, Dharmatala, Taltala, Kolkata, West Bengal 700087"
                    hoverColor="hover:text-red-500"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div data-aos="fade-left">
              <div
                className="bg-white rounded-2xl p-7 sm:p-8
                border border-gray-100
                shadow-[0_2px_16px_rgba(0,0,0,0.06)]
                hover:shadow-[0_8px_32px_rgba(22,101,52,0.1)]
                transition-shadow duration-400"
              >
                <div className="inline-flex items-center gap-2 mb-2">
                  <div className="w-1 h-5 rounded-full bg-green-400" />
                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900">
                    Send a Message
                  </h3>
                </div>

                {submitSuccess && (
                  <div
                    className="mb-6 flex items-center gap-3 p-4 rounded-xl
                    bg-green-50 border border-green-200 text-green-700"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span className="text-sm font-medium">
                      Thank you! We'll contact you shortly.
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <InputField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  {/* ✅ NEW MOBILE FIELD */}
                  <InputField
                    label="Mobile Number"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />

                  <InputField
                    label="Company Name"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />

                  <InputField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required={false}
                    textarea
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm tracking-widest uppercase
                      text-white transition-all duration-300
                      flex items-center justify-center gap-2
                      ${
                        isSubmitting
                          ? "bg-green-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-700 via-green-600 to-green-500 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(22,101,52,0.45)] active:scale-95"
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M21 12a9 9 0 11-6.219-8.56" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Submit
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
