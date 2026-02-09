import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-b from-white via-green-50 to-white pt-24 pb-20 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12" data-aos="fade-up">
          <div className="text-center bg-[#f6fbf7] py-8 sm:py-10 rounded-xl shadow-sm">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600">
              Get Started Today
            </h2>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT */}
          <div data-aos="fade-right">

            {/* Plans */}
            <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-lg hover:shadow-2xl transition">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Subscription Plans
              </h3>

              <ul className="space-y-4 text-sm sm:text-base">
                {[
                  ["Basic", "Inventory + Order Management"],
                  ["Professional", "Full ERP Suite"],
                  ["Enterprise", "Custom Solutions"],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-3">
                    <span className="mt-1">✔</span>
                    <div>
                      <h4 className="font-semibold">{title}</h4>
                      <p className="opacity-90">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-md hover:shadow-xl transition">
              <h3 className="text-lg sm:text-xl font-bold mb-6">
                Contact Information
              </h3>

              <ul className="space-y-4 text-sm sm:text-base text-gray-700">

                {/* Email */}
                <li>
                  <a
                    href="mailto:info@fnb-solutions.com"
                    className="flex items-center gap-3 hover:text-blue-500 transition"
                  >
                    <FaEnvelope className="text-blue-500" />
                    info@fnb-solutions.com
                  </a>
                </li>

                {/* Phone */}
                <li>
                  <a
                    href="tel:+919830590929"
                    className="flex items-center gap-3 hover:text-green-600 transition"
                  >
                    <FaPhoneAlt className="text-green-500" />
                    +91 98305 90929
                  </a>
                </li>

                {/* Address */}
                <li>
                  <a
                    href="https://www.google.com/maps?q=3A,+Bertram+St,+Esplanade,+Dharmatala,+Kolkata+700087"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 hover:text-red-500 transition"
                  >
                    <FaMapMarkerAlt className="text-red-500 mt-1" />
                    <span>
                      3A, Bertram St, Esplanade, Dharmatala,
                      Taltala, Kolkata, West Bengal 700087
                    </span>
                  </a>
                </li>

              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div data-aos="fade-left">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition">
              <h3 className="text-xl sm:text-2xl font-bold mb-6">
                Contact Us
              </h3>

              {submitSuccess && (
                <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 border border-green-200">
                  Thank you! We’ll contact you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">

                {["name", "email", "company"].map((field) => (
                  <div key={field}>
                    <label className="block font-semibold mb-1 capitalize">
                      {field}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 transition"
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-semibold mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 transition"
                  />
                </div>

                {/* ✅ FIXED BUTTON (NO STRING ERROR) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-bold text-white transition shadow-lg ${
                    isSubmitting
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
