import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const faqs = [
  {
    question: "What is the F&B-ERP Restaurant Management System?",
    answer:
      "F&B-ERP is a cloud-native, multi-tenant restaurant management system designed to handle user management, menu and recipe control, order processing, inventory, vendors, finance, analytics, and kitchen operations within a single unified platform.",
  },
  {
    question: "Who can use the F&B-ERP system?",
    answer:
      "The system supports multiple user roles including  Restaurant Owner (Admin), Manager, Vendor, and Employees such as chefs, waiters, accountants, and cleaners, each with hierarchical role-based access control.",
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

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section
      id="faq"
      className="relative w-full bg-gradient-to-b
      from-white via-green-50 to-white
      py-16 sm:py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className="text-center mb-12 bg-[#f6fbf7]
          py-8 sm:py-10 rounded-xl"
          data-aos="fade-up"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 60}
                className="bg-white border border-gray-200
                rounded-xl transition-all duration-300
                hover:shadow-lg hover:border-green-400"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex justify-between items-center
                  px-5 sm:px-6 py-4 text-left
                  font-semibold text-gray-900
                  focus:outline-none"
                >
                  <span className="text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={`text-green-600 text-xl
                    transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div
                    className="overflow-hidden px-5 sm:px-6 pb-5
                    text-gray-600 text-sm sm:text-base
                    border-t border-green-100 bg-green-50/50"
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
