import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroDesktop from "../../assets/phonehero.png";
import heroDesktop2 from "../../assets/phonehero2.png";
import heroDesktop3 from "../../assets/phonehero3.png";

const slides = [
  {
    id: 1,
    bgDesktop: heroDesktop,
    bgMobile: heroDesktop,
    accent: "Phone Case Print Specialists",
    title: "YOUR PIC",
    titleGradient: "ON YOUR PHONE",
    subtitle: "Premium custom phone cases featuring your dog, cat, or any pet. Crystal-clear print • Tough protection • Fast shipping • 100% happiness guaranteed.",
    cta1: "Design Your Case Now",
    to1: "/case-design",
    cta2: "View Gallery",
    to2: "/custom-mobilecase#gallery"
  },
  {
    id: 2,
    bgDesktop: heroDesktop2,
    bgMobile: heroDesktop2,
    accent: "Limited Drop • Aura Collection",
    title: "AURA",
    titleGradient: "COLLECTION",
    subtitle: "Iridescent shimmer that changes with light. Only 3,000 made — get yours before they vanish.",
    cta1: "Shop Aura Now",
    to1: "/custom-mobilecase",
    cta2: "See Colors",
    to2: "/custom-mobilecase"
  },
  {
    id: 3,
    bgDesktop: heroDesktop3,
    bgMobile: heroDesktop3,
    accent: "Forever in your pocket",
    title: "RAINBOW",
    titleGradient: "BRIDGE",
    subtitle: "Honor your angel with a beautiful memorial case. Made with love, printed with care.",
    cta1: "Create Memorial Case",
    to1: "/case-design",
    cta2: "Learn More",
    to2: "/about"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent(prev => (prev + 1) % slides.length);
  const prev = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">

      {/* Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={slide.bgMobile} />
            <source media="(min-width: 768px)" srcSet={slide.bgDesktop} />
            <img src={slide.bgDesktop} alt="" className="w-full h-full object-cover" />
          </picture>
          {/* Darker overlay for better text readability with blue/gold theme */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 md:from-black/80 md:via-black/60 md:to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 flex items-start justify-center py-6">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-xl lg:max-w-6xl"
            >

              {/* Accent - Now in rich navy blue */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="font-serif italic text-xl md:text-2xl lg:text-4xl text-[#3065C5] mb-2 md:mb-4 -rotate-1 md:-rotate-2 inline-block font-bold"
              >
                {slide.accent}
              </motion.p>

              {/* Headline - White + Gold-to-Blue Gradient */}
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.9 }}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-black tracking-tighter leading-tight md:leading-none uppercase"
              >
                {slide.title}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FADC58] via-[#C79F2B] to-[#124090]">
                  {slide.titleGradient}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-6 md:mt-8 text-base md:text-xl lg:text-2xl text-gray-100 font-medium leading-relaxed max-w-lg md:max-w-3xl"
              >
                {slide.subtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                {/* Primary CTA - Gold Gradient */}
                <Link
                  to={slide.to1}
                  className="group bg-gradient-to-r from-[#FADC58] to-[#C79F2B] text-[#124090] px-6 py-3.5 md:px-8 md:py-5 rounded-full font-bold text-sm md:text-lg
                    shadow-2xl hover:shadow-[#FADC58]/60 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 w-full sm:w-auto"
                >
                  {slide.cta1}
                  <ArrowRight
                    className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300 text-[#124090]"
                  />
                </Link>

                {/* Secondary CTA - Blue Outline → Gold Fill on Hover */}
                <Link
                  to={slide.to2}
                  className="group bg-transparent text-white border-2 border-[#3065C5] px-6 py-3.5 md:px-8 md:py-5 rounded-full
                    font-bold text-sm md:text-lg hover:bg-gradient-to-r hover:from-[#FADC58] hover:to-[#C79F2B] hover:text-[#124090] hover:border-[#FADC58] 
                    transition-all duration-400 flex items-center justify-center gap-2 md:gap-3 w-full sm:w-auto backdrop-blur-sm"
                >
                  {slide.cta2}
                  <ShoppingBag
                    className="w-4 h-4 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              </motion.div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 md:px-8 flex justify-between items-center z-30 pointer-events-none">
        <div className="pointer-events-auto text-white hidden md:block">
          <span className="text-4xl font-light text-[#FADC58]">0{current + 1}</span>
          <span className="text-white/40 text-2xl mx-2">/</span>
          <span className="text-white/60">0{slides.length}</span>
        </div>

        {/* Mobile Dots - Gold Active */}
        <div className="flex md:hidden gap-2 pointer-events-auto mx-auto">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-8 bg-[#FADC58]' : 'w-2 bg-white/40'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows - Subtle Blue/Gold Touch */}
        <div className="hidden md:flex gap-4 pointer-events-auto">
          <button 
            onClick={prev} 
            className="p-4 bg-white/10 backdrop-blur rounded-full hover:bg-[#124090]/30 hover:border-[#3065C5] transition-all border border-white/20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={next} 
            className="p-4 bg-white/10 backdrop-blur rounded-full hover:bg-[#124090]/30 hover:border-[#3065C5] transition-all border border-white/20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}