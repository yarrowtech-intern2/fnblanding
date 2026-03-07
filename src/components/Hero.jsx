import React, { useRef } from "react";
import food from "../assets/Images/momo.png";

const Hero = () => {
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;

    const rect = containerRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateX = -y * 18;
    const rotateY = x * 18;

    imgRef.current.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const resetTilt = () => {
    if (imgRef.current) {
      imgRef.current.style.transform =
        "rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="relative w-full min-h-screen bg-[#f3f3f3] overflow-hidden flex items-center py-16 lg:py-0"
    >

      {/* PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="absolute w-[6px] h-[6px] md:w-2 md:h-2 bg-yellow-400 rounded-full opacity-60 animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">

          <p className="text-yellow-500 font-semibold text-sm md:text-lg mb-2">
            RESTAURANT MANAGEMENT PLATFORM
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
            Smart ERP Solution for <br />
            <span className="text-green-500">
              Food & Beverage Excellence
            </span>
          </h1>

          <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto lg:mx-0 mb-10">
            Simplify restaurant operations, reduce waste, and empower your team
            with intelligent automation and real-time insights.
          </p>

          <button
            onClick={scrollToContact}
            className="bg-yellow-500 text-black px-7 py-3 md:px-8 md:py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            Elevate
          </button>

        </div>

        {/* RIGHT DESIGN */}
        <div className="relative flex items-center justify-center lg:justify-end h-[320px] sm:h-[380px] md:h-[420px] lg:h-[460px]">

          <div className="relative flex items-center justify-center w-full h-full">

            {/* DARK SHAPE */}
            <div className="
              absolute
              w-[260px] h-[260px]
              sm:w-[320px] sm:h-[320px]
              md:w-[420px] md:h-[420px]
              bg-black
              rounded-[120px]
              rotate-[25deg]
              animate-spinSlow
            " />

            {/* YELLOW SHAPE */}
            <div className="
              absolute
              w-[200px] h-[200px]
              sm:w-[260px] sm:h-[260px]
              md:w-[320px] md:h-[320px]
              bg-yellow-400
              rounded-[100px]
              rotate-[25deg]
              opacity-80
              animate-pulseSlow
            " />

            {/* GLOW */}
            <div className="
              absolute
              w-[200px] h-[200px]
              sm:w-[260px] sm:h-[260px]
              md:w-[320px] md:h-[320px]
              bg-yellow-300
              blur-[120px]
              opacity-30
              rounded-full
              animate-glow
            " />

            {/* FOOD IMAGE */}
            <img
              ref={imgRef}
              src={food}
              alt="food"
              className="
                relative
                w-[200px]
                sm:w-[240px]
                md:w-[300px]
                lg:w-[360px]
                xl:w-[400px]
                object-contain
                drop-shadow-[0_35px_50px_rgba(0,0,0,0.5)]
                animate-float
                transition-transform duration-300
              "
            />

          </div>

        </div>

      </div>

      {/* ANIMATIONS */}
      <style>{`

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
          100% { transform: translateY(0px); }
        }

        @keyframes glow {
          0% { opacity:0.3; transform:scale(1); }
          50% { opacity:0.6; transform:scale(1.2); }
          100% { opacity:0.3; transform:scale(1); }
        }

        @keyframes particle {
          0% { transform:translateY(0); opacity:0 }
          50% { opacity:1 }
          100% { transform:translateY(-200px); opacity:0 }
        }

        @keyframes spinSlow {
          from { transform:rotate(0deg) }
          to { transform:rotate(360deg) }
        }

        @keyframes pulseSlow {
          0% { transform:scale(1) }
          50% { transform:scale(1.1) }
          100% { transform:scale(1) }
        }

        .animate-float { animation: float 6s ease-in-out infinite }
        .animate-glow { animation: glow 5s ease-in-out infinite }
        .animate-particle { animation: particle 6s linear infinite }
        .animate-spinSlow { animation: spinSlow 40s linear infinite }
        .animate-pulseSlow { animation: pulseSlow 8s ease-in-out infinite }

      `}</style>

    </section>
  );
};

export default Hero;