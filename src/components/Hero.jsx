import React, { useRef, useState, useEffect } from "react";
import food from "../assets/Images/momo.png";
import chefAvatar from "../assets/Images/chef_avatar.png";
import mexicooPizza from "../assets/Images/mexicoo_pizza.png";
import tomato from "../assets/Images/floating_tomato.png";
import garlic from "../assets/Images/floating_garlic.png";

const Hero = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [slide, setSlide] = useState(0);
  const totalSlides = 3;

  /* Tilt on mouse move */
  const handleMouseMove = (e) => {
    if (!imgRef.current || !containerRef.current || window.innerWidth < 768) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    imgRef.current.style.transform = `rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.04)`;
  };
  const resetTilt = () => {
    if (imgRef.current) imgRef.current.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* Auto-advance slide dots */
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % totalSlides), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        .hero-root { font-family:'Outfit',sans-serif; }

        /* Dark split shape */
        .hero-dark-split {
          position: absolute;
          top: 0; right: 0;
          width: 52%;
          height: 100%;
          background: #1a1a1a;
          clip-path: ellipse(100% 100% at 100% 50%);
          overflow: hidden;
        }

        /* Food pattern on dark bg */
        .hero-pattern-icon {
          position: absolute;
          opacity: 0.06;
          fill: #fff;
        }

        /* Floating food image */
        .hero-food-img {
          transition: transform 0.35s ease;
          transform-style: preserve-3d;
          animation: heroFloat 5s ease-in-out infinite;
          filter: drop-shadow(0 40px 60px rgba(0,0,0,0.55));
        }
        @keyframes heroFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-16px); }
        }

        /* Floating small assets */
        @keyframes floatSm {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-12px) rotate(8deg); }
        }
        .hero-float-sm { animation: floatSm 4s ease-in-out infinite; }

        /* bounce chef card */
        @keyframes bounceChef {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .chef-bounce { animation: bounceChef 3.5s ease-in-out infinite; }

        /* Pizza spin */
        @keyframes pizzaSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .pizza-spin { animation: pizzaSpin 18s linear infinite; }

        /* Slide dots */
        .hero-dot {
          width: 28px; height: 5px;
          border-radius: 99px;
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
        }

        /* Scroll arrow */
        @keyframes scrollBounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(5px); }
        }
        .scroll-arrow { animation: scrollBounce 1.5s ease-in-out infinite; }

        /* Decorative squiggle */
        .hero-squiggle { opacity: 0.25; }

        /* Yellow dots */
        .hero-dot-sm {
          position: absolute;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #FFD66B;
        }

        /* Black dot */
        .hero-dot-black {
          position: absolute;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #1a1a1a;
        }
      `}</style>

      <section
        id="home"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        className="hero-root"
        style={{
          position:'relative',
          width:'100%',
          minHeight:'100vh',
          background:'#f0fdf4',
          overflow:'hidden',
          display:'flex',
          alignItems:'center',
        }}
      >

        {/* ── DARK SPLIT BACKGROUND ── */}
        <div className="hero-dark-split">
          {/* Food pattern icons */}
          {[...Array(18)].map((_, i) => (
            <svg key={i} className="hero-pattern-icon" width="70" height="70"
              viewBox="0 0 24 24" fill="white"
              style={{
                left:`${(i % 4) * 28 + 4}%`,
                top:`${Math.floor(i / 4) * 22 + 2}%`,
                transform:`rotate(${i * 23}deg)`,
              }}
            >
              <path d="M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z" />
            </svg>
          ))}
        </div>

        {/* ── DECORATIVE DOTS ── */}
        <span className="hero-dot-sm" style={{top:'18%', left:'38%'}} />
        <span className="hero-dot-sm" style={{top:'30%', right:'20%', width:6, height:6}} />
        <span className="hero-dot-sm" style={{bottom:'35%', right:'18%'}} />
        <span className="hero-dot-black" style={{top:'42%', right:'30%', width:8, height:8}} />
        <span className="hero-dot-black" style={{top:'20%', right:'42%', width:6, height:6}} />

        {/* ── FLOATING TOMATO ── */}
        <div className="hero-float-sm" style={{
          position:'absolute', top:'22%', left:'46%',
          width:60, zIndex:10, animationDelay:'0.5s',
        }}>
          <img src={tomato} alt="tomato" style={{width:'100%', filter:'drop-shadow(0 8px 16px rgba(0,0,0,0.25))'}} />
        </div>

        {/* ── FLOATING GARLIC ── */}
        <div className="hero-float-sm" style={{
          position:'absolute', bottom:'32%', left:'44%',
          width:48, zIndex:10, animationDelay:'1.2s',
        }}>
          <img src={garlic} alt="garlic" style={{width:'100%', filter:'drop-shadow(0 6px 12px rgba(0,0,0,0.3))'}} />
        </div>

        {/* ── MAIN GRID ── */}
        <div style={{
          position:'relative', zIndex:5,
          maxWidth:1400, width:'100%',
          margin:'0 auto',
          padding:'100px 40px 60px',
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          alignItems:'center',
          gap:40,
          minHeight:'100vh',
        }}
          className="hero-grid-mobile"
        >

          {/* ═══ LEFT CONTENT ═══ */}
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>

            {/* Squiggle decoration */}
            <div className="hero-squiggle" style={{marginBottom:20}}>
              <svg width="50" height="20" viewBox="0 0 50 20" fill="none">
                <path d="M2 10 Q10 2 18 10 Q26 18 34 10 Q42 2 50 10" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </div>

            {/* Heading */}
            <h1 style={{
              fontFamily:'Outfit,sans-serif',
              fontSize:'clamp(32px, 4.5vw, 58px)',
              fontWeight:400,
              lineHeight:1.2,
              color:'#1a1a1a',
              margin:0,
              marginBottom:8,
            }}>
              Smart ERP Solution for
            </h1>
            <h1 style={{
              fontFamily:'Outfit,sans-serif',
              fontSize:'clamp(32px, 4.5vw, 58px)',
              fontWeight:900,
              lineHeight:1.2,
              color:'#1a1a1a',
              margin:0,
              marginBottom:20,
            }}>
              Food &amp; Beverage <br/>
              <span style={{color:'#16a34a'}}>Excellence</span>
            </h1>

            {/* Description */}
            <p style={{
              fontSize:'14px', lineHeight:1.7,
              color:'#888', maxWidth:340, margin:0,
              marginBottom:32,
            }}>
              Simplify restaurant operations, reduce waste, and empower<br/>
              your team with intelligent automation. Only in <strong style={{color:'#1a1a1a'}}>FNB.</strong>
            </p>

            {/* CTA */}
            <div style={{display:'flex', alignItems:'center', gap:28, marginBottom:40}}>
              <button
                onClick={scrollToContact}
                style={{
                  display:'flex', alignItems:'center', gap:12,
                  padding:'14px 28px',
                  borderRadius:99,
                  background:'#1a1a1a',
                  color:'#fff',
                  fontFamily:'Outfit,sans-serif',
                  fontSize:'15px',
                  fontWeight:700,
                  border:'none',
                  cursor:'pointer',
                  boxShadow:'0 8px 24px rgba(0,0,0,0.25)',
                  transition:'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(0,0,0,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.25)'; }}
              >
                <span style={{
                  width:32, height:32, borderRadius:99,
                  background:'#FFD66B', display:'flex',
                  alignItems:'center', justifyContent:'center', flexShrink:0,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                </span>
                Elevate
              </button>
            </div>


          </div>

          {/* ═══ RIGHT FOOD IMAGE ═══ */}
          <div style={{
            position:'relative',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            height:'100%',
            minHeight:400,
          }}>
            {/* Food image */}
            <div style={{perspective:1000, position:'relative', zIndex:10}}>
              <img
                ref={imgRef}
                src={food}
                alt="Smart ERP Food"
                className="hero-food-img"
                style={{
                  width:'min(420px, 90%)',
                  objectFit:'contain',
                  position:'relative',
                  zIndex:10,
                }}
              />
            </div>

          </div>
        </div>

        {/* ═══ BOTTOM OVERLAPPING CARDS ═══ */}



        {/* ── Discount Coupon (bottom-right) ── */}
        <div
          className="hero-coupon-card"
          style={{
          position:'absolute',
          bottom:'6%',
          right:'3%',
          zIndex:20,
          background:'rgba(30,30,30,0.85)',
          backdropFilter:'blur(16px)',
          borderRadius:20,
          padding:'16px 20px',
          width:'min(340px, 90vw)',
          boxShadow:'0 12px 40px rgba(0,0,0,0.4)',
          border:'1px solid rgba(255,255,255,0.08)',
          transition:'all 0.3s',
        }}>
          {/* Card header */}
          <div style={{display:'flex', alignItems:'center', marginBottom:16}}>
            <span style={{fontSize:11, color:'#aaa', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase'}}>Discount coupon</span>
          </div>

          <div style={{display:'flex', alignItems:'center', gap:16}}>
            {/* Spinning pizza */}
            <div style={{width:70, height:70, borderRadius:'50%', flexShrink:0, overflow:'hidden', border:'2px solid rgba(255,255,255,0.15)'}}>
              <img src={mexicooPizza} alt="Pizza" className="pizza-spin" style={{width:'100%', height:'100%', objectFit:'cover'}} />
            </div>

            <div style={{flex:1}}>
              <div style={{fontSize:'16px', fontWeight:800, color:'#fff', marginBottom:4}}>Mexicoo Pizza</div>
              <div style={{display:'flex', alignItems:'center', gap:6}}>
                <span>🔥</span>
                <span style={{fontSize:12, color:'#888'}}>78 Calories</span>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive styles */}
        <style>{`
          /* ── TABLET & MOBILE ── */
          @media (max-width: 900px) {
            /* Dark bg moves to bottom half */
            .hero-dark-split {
              width: 100% !important;
              height: 50% !important;
              top: auto !important;
              bottom: 0 !important;
              clip-path: ellipse(160% 70% at 50% 100%) !important;
            }

            /* Grid stacks vertically */
            .hero-grid-mobile {
              grid-template-columns: 1fr !important;
              padding: 100px 24px 220px !important;
              min-height: unset !important;
              gap: 32px !important;
            }

            /* Food image smaller on tablet */
            .hero-food-img {
              width: min(300px, 80vw) !important;
            }

            /* Floating tomato/garlic hidden on mobile */
            .hero-float-sm { display: none !important; }

            /* Coupon card — move to bottom center */
            .hero-coupon-card {
              bottom: 16px !important;
              right: 50% !important;
              transform: translateX(50%) !important;
              width: min(320px, 92vw) !important;
            }
          }

          /* ── MOBILE ONLY ── */
          @media (max-width: 600px) {
            .hero-grid-mobile {
              padding: 88px 18px 240px !important;
              gap: 24px !important;
            }
            .hero-food-img {
              width: min(240px, 70vw) !important;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default Hero;