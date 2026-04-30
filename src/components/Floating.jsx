import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaEnvelope, FaArrowUp, FaPlus, FaPhoneAlt, FaCommentDots } from "react-icons/fa";

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="
        fixed
        right-4 sm:right-6
        bottom-6 sm:bottom-8
        z-[1000]
        flex flex-col items-center gap-3
      "
    >
      {/* WhatsApp & Email (Expandable) */}
      <div className={`flex flex-col gap-3 transition-all duration-300 transform ${
        isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-10 pointer-events-none"
      }`}>
        {/* WhatsApp */}
        <a
          href="https://wa.me/919830590929?text=Hello%20I%20am%20interested%20in%20your%20ERP%20solutions"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="
            w-12 h-12 sm:w-14 sm:h-14
            rounded-full bg-green-500 text-white
            flex items-center justify-center
            shadow-lg hover:shadow-2xl hover:scale-110 transition-all
          "
        >
          <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7" />
        </a>

        {/* Email */}
        <a
          href="mailto:info@fnb-solutions.com"
          aria-label="Send Email"
          className="
            w-12 h-12 sm:w-14 sm:h-14
            rounded-full bg-blue-500 text-white
            flex items-center justify-center
            shadow-lg hover:shadow-2xl hover:scale-110 transition-all
          "
        >
          <FaEnvelope className="w-6 h-6 sm:w-7 sm:h-7" />
        </a>
      </div>

      {/* Scroll to Top (Conditional) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`
          w-10 h-10 sm:w-12 sm:h-12
          rounded-full
          bg-gray-900/80 hover:bg-black
          text-white
          flex items-center justify-center
          shadow-lg backdrop-blur-sm
          transition-all duration-500
          ${showScrollTop ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-10 pointer-events-none"}
          hover:scale-110 active:scale-95
          cursor-pointer
        `}
      >
        <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Contact Menu"
        className={`
          w-14 h-14 sm:w-16 sm:h-16
          rounded-full
          ${isOpen ? "bg-green-600" : "bg-green-700"}
          text-white
          flex items-center justify-center
          shadow-[0_8px_24px_rgba(22,101,52,0.3)]
          hover:shadow-[0_12px_32px_rgba(22,101,52,0.4)]
          transition-all duration-300
          hover:scale-110 active:scale-95
          cursor-pointer
        `}
      >
        {isOpen ? <FaPhoneAlt className="text-xl" /> : <FaCommentDots className="text-xl" />}
      </button>
    </div>
  );
};

export default FloatingActions;
