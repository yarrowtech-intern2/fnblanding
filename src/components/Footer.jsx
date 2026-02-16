import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  /* Path → Section ID */
  const pathToId = {
    "/": "home",
    "/services": "services",
    "/about": "about",
    "/contact": "contact",
  };

  /* Scroll Handler */
  const handleScrollLink = (e, path) => {
    e.preventDefault();

    const scrollToSection = () => {
      const el = document.getElementById(pathToId[path]);
      if (!el) return;

      const headerOffset = 96;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToSection, 150);
    } else {
      scrollToSection();
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-12 mb-12">

          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-300">
              F&B Platform
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              Transforming food & beverage operations with intelligent ERP
              solutions for modern restaurants and chains.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    onClick={(e) => handleScrollLink(e, item.path)}
                    className="text-gray-400 hover:text-green-400 transition inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-5">Contact</h4>

            <ul className="space-y-4 text-sm text-gray-400">

              {/* Email */}
              <li>
                <a
                  href="mailto:info@fnb-solutions.com"
                  className="group flex items-center justify-center md:justify-start gap-3
                  hover:text-blue-400 transition"
                >
                  <FaEnvelope className="text-blue-500 text-lg group-hover:scale-110 transition-transform" />
                  info@fnb-solutions.com
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href="tel:+919830590929"
                  className="group flex items-center justify-center md:justify-start gap-3
                  hover:text-green-400 transition"
                >
                  <FaPhoneAlt className="text-green-500 text-lg group-hover:scale-110 transition-transform" />
                  +91 98305 90929
                </a>
              </li>

              {/* Address */}
              <li>
                <a
                  href="https://www.google.com/maps?q=Humayun+Place+Kolkata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-center md:justify-start gap-3
                  hover:text-red-400 transition"
                >
                  <FaMapMarkerAlt className="text-red-500 text-lg mt-1 group-hover:scale-110 transition-transform" />
                  <span>
                    3A, Bertram St, Esplanade, Dharmatala,
                    Taltala, Kolkata, West Bengal 700087
                  </span>
                </a>
              </li>

            </ul>
          </div>

          {/* Map */}
          <div className="w-full h-52 sm:h-56 rounded-xl overflow-hidden border border-gray-700 shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Humayun%20Place%20Kolkata&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-6"></div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center pb-8 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            {/* © {year} F&B Platform. All rights reserved. */}
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600
              transition flex items-center justify-center"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-sky-500
              transition flex items-center justify-center"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-700
              transition flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
