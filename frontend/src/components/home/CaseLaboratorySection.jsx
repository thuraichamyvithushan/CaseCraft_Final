import React from 'react';
import { ArrowRight, Sparkles, Zap, QrCode, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

// Replace with your actual image paths
import diyMachine from "../../assets/img2.jpeg";
import vendingMachine from "../../assets/vending-machine2.png";

export default function CaseLaboratorySection() {
  return (
    <section className="relative py-10 md:py-20 overflow-hidden bg-gradient-to-br from-[#3065C5] via-[#124090] to-[#FADC58]">

      {/* Subtle Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FADC58]/20 to-transparent blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C79F2B]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-white z-10">

        {/* Hero Intro */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold uppercase tracking-wider shadow-2xl mb-6 md:mb-8">
            <Zap className="w-5 h-5 text-[#FADC58]" />
            Design it. Print it. Done in minutes.
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight">
            Case Craft
          </h2>
          <p className="mt-4 md:mt-6 text-lg md:text-2xl max-w-4xl mx-auto">
            Experience the original <span className="font-bold text-[#FADC58]">phone case printing vending service</span>, offering premium, instant customization across Australia.
          </p>

        </div>

        {/* DIY Experience */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-22">
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-6  group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src={diyMachine}
                alt="Case Laboratory DIY Phone Case Printing Machine"
                className="rounded-3xl shadow-2xl w-full object-cover border-8 border-white/20 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FADC58] to-[#C79F2B] rounded-2xl flex items-center justify-center shadow-xl">
                <QrCode className="w-8 h-8 text-[#124090]" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black leading-tight">
                Your Phone.<br />Your Design.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FADC58] to-[#C79F2B]">
                  Printed Live
                </span>
              </h3>
            </div>

            <p className="text-xl leading-relaxed text-gray-100">
              Our revolutionary on-demand vending machine lets anyone create a premium custom phone case in just 3 minutes — no design skills needed.
            </p>

            <ul className="space-y-5">
              {[
                "Scan QR code → upload any photo from your phone",
                "Watch it print live in stunning quality",
                "Premium cases with scratch-proof, vibrant print",
                "Perfect for pets, family photos, travel memories, or milestones"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FADC58] to-[#C79F2B] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#124090]" />
                  </div>
                  <span className="text-lg text-gray-100">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>



      </div>
    </section>
  );
}