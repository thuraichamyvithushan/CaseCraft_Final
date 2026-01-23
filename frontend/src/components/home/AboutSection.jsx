import React from 'react';
import { ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import vendingmachine from "../../assets/vendingmachine.png"

export default function AboutSection() {
  return (
    <section className="relative py-12 md:py-24 overflow-hidden bg-gradient-to-br from-[#124090] via-[#0b305f] to-[#124090]">

      {/* Background Glows - Gold themed */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-10 w-96 h-96 bg-[#FADC58]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-[#C79F2B]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-[#3065C5]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div className="space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#FADC58]/20 text-[#FADC58] px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 shadow-xl border border-[#FADC58]/30">
                <HeartHandshake className="w-5 h-5" />
                Made for You, with Care
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white leading-tight">
                We Turn Your Photos Into<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FADC58] to-[#C79F2B]">
                  Everyday Magic
                </span>
              </h2>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
              Since 2020, we’ve helped over <span className="text-[#FADC58] font-bold">100,000+</span> customers keep their favorite memories close — right on their phone.
            </p>

            <p className="text-lg text-gray-400 leading-relaxed">
              Every custom phone case is printed with love using eco-friendly inks and premium materials. Your happiness (and your photo looking perfect) is our obsession.
            </p>

            {/* Glass Stats - Fully Mobile Responsive with Laptop Font Adjustment */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
  {[
    { number: "100K+", label: "Cases Created", gradient: "from-[#FADC58] to-[#C79F2B]" },
    { number: "4.9★", label: "Average Rating", gradient: "from-[#FADC58] to-[#C79F2B]" },
    { number: "24hr", label: "Proof Turnaround", gradient: "from-[#3065C5] to-[#3065C5]" }
  ].map((stat, i) => (
    <div key={i} className="relative group">
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-20 rounded-3xl blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center hover:bg-white/20 transition-all">
        <div className={`text-4xl sm:text-5xl lg:text-4xl xl:text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
          {stat.number}
        </div>
        <div className="text-gray-300 text-sm mt-2 font-medium">{stat.label}</div>
      </div>
    </div>
  ))}
</div>

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 sm:gap-4 bg-gradient-to-r from-[#FADC58] to-[#C79F2B] text-[#124090] px-4 sm:px-10 py-3 sm:py-6 rounded-full text-base sm:text-xl font-bold shadow-2xl hover:shadow-[#FADC58]/60 hover:scale-105 transition-all duration-300"
            >
              Our Story & Promise
              <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-1 sm:group-hover:translate-x-3" />
            </Link>

          </div>

          {/* Right: 3 Floating Images - Custom Phone Cases */}
          <div className="relative h-auto lg:h-[750px] mt-16 lg:mt-0 flex flex-col gap-8 lg:block">

            {/* Image 1 — Back Left (Biggest) */}
            <div className="relative lg:absolute lg:top-10 lg:left-0 w-full lg:w-96 group">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#FADC58]/40 to-[#3065C5]/30 rounded-3xl blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
              <img
                src="https://thedairy.com/cdn/shop/files/The-Dairy-Custom-Case-Accessories-Desktop.jpg?v=1745388557&width=900"
                alt="Happy customer holding personalized custom phone case"
                className="relative rounded-3xl shadow-2xl w-full object-cover border-8 border-white/10 group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Image 2 — Center (Floating Forward) */}
            <div className="relative lg:absolute lg:top-32 lg:right-20 w-full lg:w-80 group ml-auto lg:ml-0">
              <div className="absolute -inset-6 bg-gradient-to-tl from-[#C79F2B]/40 to-[#FADC58]/30 rounded-3xl blur-3xl opacity-70 group-hover:opacity-90 transition-opacity" />
              <img
                src={vendingmachine}
                alt="Close-up of custom phone case with personal photo"
                className="relative rounded-3xl shadow-2xl h-[400px] w-full object-cover border-8 border-white/10 group-hover:scale-110 transition-transform duration-700 rotate-2 lg:rotate-6 hover:rotate-3"
              />
            </div>

            {/* Image 3 — Front Right (Smallest, Tilted) */}
            <div className="relative lg:absolute lg:bottom-10 lg:left-32 w-full lg:w-72 group">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#3065C5]/40 to-[#124090]/30 rounded-3xl blur-3xl opacity-70 group-hover:opacity-90 transition-opacity" />
              <img
                src="https://thedairy.com/cdn/shop/files/The-Dairy-Phone-Cases-Social.png?v=1729709834"
                alt="Person proudly showing off their custom printed phone case"
                className="relative rounded-3xl shadow-2xl w-full object-cover border-8 border-white/10 group-hover:scale-110 transition-transform duration-700 -rotate-2 lg:-rotate-12 hover:-rotate-6"
              />
              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-[#FADC58] to-[#C79F2B] text-[#124090] px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 animate-bounce">
                <Sparkles className="w-6 h-6" />
                Real Memories
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}