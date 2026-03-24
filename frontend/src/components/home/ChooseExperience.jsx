import React from "react";
import { ArrowRight, Sparkles, QrCode, Store } from "lucide-react";
import { Link } from "react-router-dom";

export default function ChooseExperience() {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-white via-[#FADC58]/5 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[#124090] font-bold uppercase tracking-widest text-sm mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C79F2B]" />
            Choose Your Path
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-[#124090] leading-tight">
            What Will You Build Today?
          </h2>
        </div>

        {/* How It Works Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            {
              step: "01",
              title: "Select Your Device",
              text: "Choose your specific phone model from our wide range of supported devices.",
              icon: <Store className="w-8 h-8 text-[#124090]" />
            },
            {
              step: "02",
              title: "Choose Case Type",
              text: "Pick the perfect case style - from slim & clear to tough & protective.",
              icon: <QrCode className="w-8 h-8 text-[#124090]" />
            },
            {
              step: "03",
              title: "Upload & Customize",
              text: "Upload your favorite photo, add text, or use our stickers to make it yours.",
              icon: <Sparkles className="w-8 h-8 text-[#124090]" />
            },
            {
              step: "04",
              title: "We Print & Ship",
              text: "We print your design in high quality and ship it straight to your door.",
              icon: <ArrowRight className="w-8 h-8 text-[#124090]" />
            }
          ].map((item, index) => (
            <div key={index} className="relative group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-6xl text-[#124090]">
                {item.step}
              </div>

              <div className="w-16 h-16 bg-gradient-to-br from-[#FADC58] to-[#C79F2B] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              <h3 className="text-xl font-black text-[#124090] mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}

        </div>

        <div className="text-center mt-16">
          <Link
            to="/case-design"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#124090] to-[#3065C5] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-[#124090]/40 hover:scale-105 transition-all duration-300"
          >
            Start Designing Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}