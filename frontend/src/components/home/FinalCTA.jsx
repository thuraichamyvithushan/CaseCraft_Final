import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="relative py-16 md:py-28 lg:py-36 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">

      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#FADC58]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#3065C5]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <Heart className="w-32 h-32 text-[#FADC58]/5 absolute top-20 left-20 animate-ping" />
          <Heart className="w-24 h-24 text-[#3065C5]/5 absolute bottom-32 right-32 animate-ping delay-1000" />
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FADC58] to-[#C79F2B] text-[#124090] px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wider shadow-2xl mb-8 animate-bounce">
          <Sparkles className="w-6 h-6" />
          Your Memories Deserve This
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#124090] leading-tight">
          Ready to Make<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FADC58] via-[#C79F2B] to-[#3065C5]">
            Magic Happen?
          </span>
        </h2>

        {/* Subtext */}
        <p className="mt-8 text-2xl md:text-3xl text-gray-600 font-medium max-w-3xl mx-auto">
          Join 100,000+ happy customers who turned their favorite photo into a stunning custom phone case they use every day.
        </p>

        {/* Mega CTA Button */}
        <div className="mt-16 relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#FADC58] via-[#C79F2B] to-[#3065C5] rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />

          <Link
            to="/case-design"
            className="
              relative inline-flex items-center gap-3 sm:gap-6 
              bg-gradient-to-r from-[#FADC58] to-[#C79F2B] text-[#124090] 
              px-6 sm:px-16 py-4 sm:py-8 
              rounded-full 
              text-xl sm:text-3xl md:text-4xl 
              font-black 
              shadow-2xl 
              hover:shadow-[#FADC58]/60 
              hover:scale-105 
              transition-all duration-500 
              overflow-hidden 
              group
            "
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-6">
              Start Designing Now
              <ArrowRight className="w-5 h-5 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:translate-x-2 sm:group-hover:translate-x-4" />
            </span>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
          </Link>
        </div>

        {/* Trust Line */}
        <p className="mt-12 text-lg text-gray-500">
          <span className="text-[#FADC58] font-bold">100% Happiness Guarantee</span> • Free proof • Ships in 3–7 days
        </p>

      </div>
    </section>
  );
}