import React from "react";
import { ArrowRight, Sparkles, QrCode, Store } from "lucide-react";
import { Link } from "react-router-dom";

export default function ChooseExperience() {
  return (
    <section className="py-16 md:py-32 bg-gradient-to-b from-white via-[#FADC58]/5 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[#124090] font-bold uppercase tracking-widest text-sm mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C79F2B]" />
            Choose Your Path
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-[#124090] leading-tight">
            What Will You Build Today?
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* Create Your Own Case (Customer Path) */}
          <div className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700">
            {/* Gradient Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FADC58]/10 via-[#C79F2B]/10 to-[#124090]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Floating Accent */}
            <div className="absolute -top-12 -right-12 w-52 h-52 bg-gradient-to-br from-[#FADC58] to-[#C79F2B] rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700" />

            <div className="relative p-10 md:p-16">
              {/* Icon */}
              <div className="w-24 h-24 bg-gradient-to-br from-[#FADC58] to-[#C79F2B] rounded-3xl flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <QrCode className="w-14 h-14 text-[#124090]" />
              </div>

              <h3 className="text-4xl md:text-5xl font-black text-[#124090] mb-6">
                Create Your Own<br />
                Custom Case
              </h3>

              <p className="text-xl text-gray-700 mb-12 leading-relaxed">
                Turn your favorite photo into a premium phone case — printed live in minutes. Perfect for pets, family, memories, or that viral moment.
              </p>

              {/* Features */}
              <div className="space-y-6 mb-14">
                {[
                  "Upload any photo via QR code",
                  "Watch it print live in HD quality",
                  "Premium tough or slim cases",
                  "Scratch-proof, fade-proof print"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#FADC58] to-[#C79F2B] rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-[#124090]" />
                    </div>
                    <span className="text-lg font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                to="/case-design"
                className="group/btn inline-flex items-center gap-5 bg-gradient-to-r from-[#FADC58] via-[#C79F2B] to-[#124090] text-white px-12 py-7 rounded-full text-2xl font-black shadow-2xl hover:shadow-[#FADC58]/60 hover:scale-110 transition-all duration-500"
              >
                Start Creating Now
                <ArrowRight className="w-9 h-9 group-hover/btn:translate-x-4 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Own a Business (Investor Path) */}
          <div className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700">
            {/* Gradient Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#124090]/10 via-[#C79F2B]/10 to-[#FADC58]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Floating Accent */}
            <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-gradient-to-tr from-[#124090] to-[#C79F2B] rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700" />

            <div className="relative p-10 md:p-16">
              {/* Icon */}
              <div className="w-24 h-24 bg-gradient-to-br from-[#124090] to-[#C79F2B] rounded-3xl flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <Store className="w-14 h-14 text-white" />
              </div>

              <h3 className="text-4xl md:text-5xl font-black text-[#124090] mb-6">
                Own a Phone Case<br />
                Printing Business
              </h3>

              <p className="text-xl text-gray-700 mb-12 leading-relaxed">
                Launch a fully automated, high-margin vending business with our turnkey phone case printing machines.
              </p>

              {/* Features */}
              <div className="space-y-6 mb-14">
                {[
                  "Proven turnkey business model",
                  "Fully automated — no staff needed",
                  "High profit margins per sale",
                  "We help with location & setup",
                  
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#124090] to-[#C79F2B] rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                to="/case-laboratory/business"
                className="group/btn inline-flex items-center gap-5 bg-gradient-to-r from-[#124090] via-[#C79F2B] to-[#FADC58] text-white px-12 py-7 rounded-full text-2xl font-black shadow-2xl hover:shadow-[#124090]/60 hover:scale-110 transition-all duration-500"
              >
                Start Your Business
                <ArrowRight className="w-9 h-9 group-hover/btn:translate-x-4 transition-transform duration-300" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}