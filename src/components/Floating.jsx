import React from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const FloatingActions = () => {
  return (
    <div
      className="
        fixed
        right-3 sm:right-4
        bottom-4 sm:bottom-6
        z-[1000]
        flex flex-col gap-3 sm:gap-4
        pointer-events-auto
      "
    >
      {/* WhatsApp */}
      <a
        href="https://wa.me/919830590929?text=Hello%20I%20am%20interested%20in%20your%20ERP%20solutions"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="
          w-11 h-11 sm:w-14 sm:h-14
          rounded-full
          bg-green-500 hover:bg-green-600
          text-white
          flex items-center justify-center
          shadow-lg hover:shadow-2xl
          transition-all duration-300
          hover:scale-110 active:scale-95
        "
      >
        <FaWhatsapp className="w-5 h-5 sm:w-7 sm:h-7" />
      </a>

      {/* Email */}
      <a
        href="mailto:info@fnb-solutions.com"
        aria-label="Send Email"
        title="Send Email"
        className="
          w-11 h-11 sm:w-14 sm:h-14
          rounded-full
          bg-blue-500 hover:bg-blue-600
          text-white
          flex items-center justify-center
          shadow-lg hover:shadow-2xl
          transition-all duration-300
          hover:scale-110 active:scale-95
        "
      >
        <FaEnvelope className="w-5 h-5 sm:w-7 sm:h-7" />
      </a>
    </div>
  );
};

export default FloatingActions;
