import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

// Import your two optimized images
import heroDesktop from "../../assets/phonehero.png";
import heroMobile from "../../assets/phonehero.png";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen md:min-h-[90vh] flex items-center overflow-hidden bg-gray-900 text-white">

      {/* Responsive Background Image */}
      <picture className="absolute inset-0 z-0">
        <source media="(max-width: 767px)" srcSet={heroMobile} />
        <source media="(min-width: 768px)" srcSet={heroDesktop} />
        <img
          src={heroDesktop}
          alt="Custom phone cases with pet photos"
          className="w-full h-full object-cover"
        />
      </picture>

      {/* Dark Gradient Overlay – Enhanced for text contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>

      {/* Content – Left Aligned */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-24">
        <div className="max-w-xl lg:max-w-6xl">

          {/* Accent Tagline - Lighter Blue */}
          <p className="font-serif italic text-2xl md:text-4xl text-[#3065C5] mb-2 md:mb-4 md:-rotate-2 inline-block font-bold">
            Phone Case Print Specialists
          </p>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] uppercase text-white">
            YOUR PIC<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0c337c] via-[#C79F2B] to-[#FADC58]">
              ON YOUR PHONE
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 md:mt-8 text-lg md:text-xl lg:text-xl text-gray-200 font-medium leading-relaxed">
            Premium custom phone cases featuring your dog, cat, or any pet.
            Crystal-clear print • Tough protection • Fast shipping • 100% happiness guaranteed.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4">
            {/* Primary CTA - Gold Gradient */}
            <Link to="/case-design" className="w-full sm:w-auto">
              <button
                className="group bg-gradient-to-r from-[#FADC58] to-[#C79F2B] text-[#124090] px-5 py-3 md:px-8 md:py-5 rounded-full font-bold text-base md:text-lg shadow-2xl hover:shadow-[#FADC58]/60 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 w-full"
              >
                Design Your Case Now
                <ArrowRight
                  className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300"
                />
              </button>
            </Link>

            {/* Secondary CTA - Blue Border → Gold Fill on Hover */}
            <a href="#gallery" className="w-full sm:w-auto">
              <button
                className="group bg-transparent backdrop-blur-sm border-2 border-[#3065C5] px-5 py-3 md:px-8 md:py-5 rounded-full font-bold text-base md:text-lg 
                  hover:bg-gradient-to-r hover:from-[#FADC58] hover:to-[#C79F2B] hover:text-[#124090] hover:border-[#FADC58]
                  transition-all duration-400 flex items-center justify-center gap-2 md:gap-3 w-full"
              >
                View Gallery
                <ShoppingBag
                  className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300"
                />
              </button>
            </a>
          </div>

          {/* Trust Signals */}
          <div className="mt-10 md:mt-14 flex flex-wrap items-center gap-4 md:gap-6">
            {/* Card 1 - Cases Printed */}
            <div className="flex items-center gap-2 px-5 py-3 
                  backdrop-blur-md bg-white/10 border border-[#3065C5]/30 
                  rounded-full shadow-xl shadow-black/50
                  hover:bg-[#3065C5]/10 hover:border-[#FADC58] 
                  transition-all duration-300">
              <span className="text-[#FADC58] font-bold text-lg">80,000+</span>
              <span className="text-gray-300 text-sm md:text-base">cases printed</span>
            </div>

            {/* Card 2 - Free Shipping */}
            <div className="flex items-center gap-2 px-5 py-3 
                  backdrop-blur-md bg-white/10 border border-[#3065C5]/30 
                  rounded-full shadow-xl shadow-black/50
                  hover:bg-[#3065C5]/10 hover:border-[#FADC58] 
                  transition-all duration-300">
              <span className="text-[#3065C5] font-bold text-lg">Free</span>
              <span className="text-gray-300 text-sm md:text-base">shipping $40+</span>
            </div>

            {/* Card 3 - Reviews */}
            <div className="flex items-center gap-2 px-5 py-3 
                  backdrop-blur-md bg-white/10 border border-[#3065C5]/30 
                  rounded-full shadow-xl shadow-black/50
                  hover:bg-[#3065C5]/10 hover:border-[#FADC58] 
                  transition-all duration-300">
              <span className="text-[#FADC58] font-bold text-lg">4.9/5</span>
              <span className="text-gray-300 text-sm md:text-base">from 12k+ reviews</span>
            </div>
          </div>

        </div>
      </div>

      {/* Optional subtle floating accent */}
      <div className="hidden lg:block absolute right-10 bottom-10 text-white/5 pointer-events-none">
        <span className="text-9xl font-black">CASES</span>
      </div>
    </section>
  );
}