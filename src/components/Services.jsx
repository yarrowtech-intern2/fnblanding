import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
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

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

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

  return (
    <section
      id="services"
      className="relative py-16 sm:py-20 lg:py-28 
      bg-gradient-to-b from-white via-green-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className="text-center mb-12 sm:mb-16"
          data-aos="fade-up"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl 
            font-bold text-green-600"
          >
            Our Services
          </h2>
        </div>

        <div
          className="grid gap-6 sm:gap-8
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className="group relative bg-white 
              rounded-2xl p-6 sm:p-8
              border border-gray-200
              transition-all duration-500
              hover:shadow-2xl hover:border-green-400
              hover:-translate-y-2"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 sm:w-16 sm:h-16
                rounded-xl bg-gradient-to-br 
                from-green-400 to-green-600
                flex items-center justify-center
                text-white text-2xl sm:text-3xl
                transition-all duration-500
                group-hover:rotate-6 group-hover:scale-110"
              >
                {service.icon}
              </div>

              <h3
                className="mt-6 text-lg sm:text-xl 
                font-bold text-gray-800
                transition-colors duration-300
                group-hover:text-green-600"
              >
                {service.title}
              </h3>

              <p
                className="mt-3 text-sm sm:text-base 
                text-gray-600 leading-relaxed
                transition-colors duration-300
                group-hover:text-gray-700"
              >
                {service.description}
              </p>

              {/* Hover Gradient Line */}
              <span
                className="absolute bottom-0 left-0 h-1 w-0 
                bg-gradient-to-r from-green-400 to-green-600
                transition-all duration-500
                group-hover:w-full rounded-b-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
