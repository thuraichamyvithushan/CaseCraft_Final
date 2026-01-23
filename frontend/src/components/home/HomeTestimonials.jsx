import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

import tesimg from "../../assets/custom/phonecase3.png"
import tesimg2 from "../../assets/custom/Phonecase2.png"
import tesimg3 from "../../assets/custom/phonecase5.png"
import tesimg4 from "../../assets/custom/phonecase6.png"

export default function HomeTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Emma Rodriguez",
      memory: "Family Vacation Photo",
      text: "I cried when I opened the package. The print quality is incredible — the colors are so vibrant and sharp. It feels like that moment is always with me now!",
      model: "iPhone 15 Pro Max Tough Case",
      img: tesimg2
    },
    {
      id: 2,
      name: "Tyler & Sarah Kim",
      memory: "Wedding Portrait",
      text: "We got matching cases with our wedding photo and everyone asks where we got them. The MagSafe works perfectly and the image still looks brand new after months of daily use.",
      model: "MagSafe Clear Case",
      img: tesimg3
    },
    {
      id: 3,
      name: "Jessica Miller",
      memory: "Graduation Day",
      text: "I drop my phone all the time and this case has saved it multiple times. The raised edges actually protect the screen and camera — and my graduation photo still looks flawless.",
      model: "Heavy Duty Armor Case",
      img: tesimg
    },
    {
      id: 4,
      name: "David Park",
      memory: "Best Friend Portrait",
      text: "Best gift I ever gave my partner. They use this case every day with our favorite photo together. The quality is amazing and it brings a smile every time they pick up their phone.",
      model: "Soft Touch Premium Case",
      img: tesimg4
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex(prev => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[currentIndex];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-[#032a6e] via-[#03152b] to-[#01050d]">

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#FADC58]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#3065C5]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#FADC58] font-bold uppercase tracking-widest text-sm mb-3">
            100,000+ Happy Customers
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
            Real Stories.<br />Real Memories.
          </h2>
        </div>

        {/* Glassmorphic Testimonial Card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden max-w-5xl mx-auto">

          <div className="grid md:grid-cols-2">

            {/* Left: Photo */}
            <div className="relative h-96 md:h-full overflow-hidden">
              <img
                key={currentIndex}
                src={t.img}
                alt={t.memory}
                className="w-full h-full object-cover transition-opacity duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Quote Icon */}
              <div className="absolute top-8 left-8 bg-white/20 backdrop-blur p-4 rounded-2xl shadow-xl">
                <Quote className="w-10 h-10 text-[#FADC58] fill-current" />
              </div>

              {/* Verified Badge */}
              <div className="absolute bottom-8 left-8 bg-emerald-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                Verified Buyer
              </div>
            </div>

            {/* Right: Content */}
            <div className="p-10 md:p-16 flex flex-col justify-center text-white">

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-7 h-7 fill-[#FADC58] text-[#FADC58]" />
                ))}
              </div>

              {/* Review */}
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-10 text-gray-100">
                "{t.text}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-white/20 pt-8">
                <h4 className="text-2xl font-bold">{t.name}</h4>
                <p className="text-lg text-gray-300 mt-1">Custom case featuring their {t.memory.toLowerCase()}</p>
                <p className="text-sm font-bold text-[#FADC58] uppercase tracking-wider mt-4">
                  {t.model}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12">
                <div className="flex gap-4">
                  <button
                    onClick={prev}
                    className="p-3 sm:p-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all group flex items-center justify-center"
                  >
                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={next}
                    className="p-3 sm:p-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FADC58] text-[#124090] hover:bg-[#C79F2B] transition-all group shadow-xl flex items-center justify-center"
                  >
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`
                        h-2 rounded-full transition-all duration-300
                        ${i === currentIndex
                          ? 'w-8 sm:w-12 bg-[#FADC58]'
                          : 'w-3 sm:w-4 bg-white/40'
                        }
                      `}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}