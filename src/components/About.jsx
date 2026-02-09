import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import aboutImage from "../assets/Images/about.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const features = [
  {
    title: "AI-powered Inventory",
    desc: "Optimize stock levels and reduce waste with intelligent forecasting.",
  },
  {
    title: "Customer Engagement",
    desc: "Personalized offers and loyalty programs to retain customers.",
  },
  {
    title: "Sustainability Driven",
    desc: "Eco-friendly and cost-efficient operational practices.",
  },
];

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  /* Scroll to Contact */
  const handleContactClick = (e) => {
    e.preventDefault();

    const scrollToContact = () => {
      const el = document.getElementById("contact");
      if (!el) return;

      const headerOffset = 96;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToContact, 150);
    } else {
      scrollToContact();
    }
  };

  return (
    <section
      id="about"
      className="bg-gradient-to-b from-gray-50 to-white text-gray-800
      pt-24 scroll-mt-24"
    >
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className="text-center bg-[#f6fbf7] py-8 sm:py-10 rounded-xl"
          data-aos="fade-up"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600">
            About Us
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left" data-aos="fade-right">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-700 leading-tight">
            Empowering the Future of
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-400">
              Food & Beverage
            </span>
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto md:mx-0">
            We build smart technology solutions for restaurants, cafés,
            cloud kitchens, and food businesses to manage operations effortlessly.
          </p>

          <button
            onClick={handleContactClick}
            className="inline-flex justify-center px-8 py-3
            bg-gradient-to-r from-green-600 to-green-500
            hover:from-green-700 hover:to-green-600
            text-white font-semibold rounded-lg
            shadow-lg hover:shadow-2xl
            transition-all duration-300
            transform hover:scale-105 active:scale-95"
          >
            Get in Touch
          </button>
        </div>

        <img
          src={aboutImage}
          alt="About F&B Platform"
          data-aos="fade-left"
          className="rounded-3xl shadow-xl w-full object-cover
          max-h-[380px] sm:max-h-[420px]
          hover:shadow-2xl transition-all duration-500"
        />
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="text-center bg-[#f6fbf7] py-8 sm:py-10 rounded-xl mb-12"
            data-aos="fade-up"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600">
              What We Offer
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <div
                key={i}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
                className="bg-white rounded-2xl p-6 sm:p-8
                shadow-md hover:shadow-2xl
                transition-all duration-500
                transform hover:scale-105
                border border-gray-200 hover:border-green-400"
              >
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
