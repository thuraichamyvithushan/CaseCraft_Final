import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, MessageCircle, Sparkles } from 'lucide-react';

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Can I use multiple images on one phone case?",
      answer: "Absolutely! Our automatic printing system allows you to create beautiful layouts. You can choose your favorite photos and arrange them into a stunning design right on-site at our vending machine."
    },
    {
      question: "Do I get to see a preview before it prints?",
      answer: "Yes! Our intuitive interface allows you to see a real-time preview of your design. You can adjust the photo, crop, add text, and ensure everything is perfect before the printing process starts."
    },
    {
      question: "How long does the printing process take?",
      answer: "The entire process is incredibly fast. Once your design is finalized at our vending machine, your custom case is printed and ready in just 4–5 minutes — providing instant results on the spot."
    },
    {
      question: "Can I design cases for different phone models?",
      answer: "Yes! Our systems at the vending locations support a wide variety of phone models (iPhone, Samsung, Google Pixel, etc.). You can create multiple unique designs for different devices during your visit."
    },
    {
      question: "Where can I find your vending machines?",
      answer: "We have multiple locations across Australia, including major shopping centers in NSW and SA. You can use our Store Locator to find the machine nearest to you and start designing instantly."
    }
  ];

  return (
    <section className="py-10 md:py-20 bg-gradient-to-b from-white to-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#0a214f]/5 text-[#0a214f] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-[#C79F2B]/30">
            <Sparkles className="w-4 h-4 text-[#C79F2B]" />
            Common Questions
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-[#0a214f] leading-tight">
            Got Questions?<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FADC58] to-[#C79F2B]">We’ve Got Answers</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className={`
                group rounded-3xl overflow-hidden cursor-pointer transition-all duration-400 border-2
                ${openIndex === index
                  ? 'bg-[#0a214f] text-white border-[#C79F2B] shadow-2xl shadow-[#C79F2B]/20'
                  : 'bg-white border-transparent hover:border-[#0a214f]/20 hover:shadow-xl'
                }
              `}
            >
              {/* Question */}
              <div className="px-8 py-6 flex justify-between items-center">
                <h3 className={`font-bold text-xl md:text-2xl transition-colors ${openIndex === index ? 'text-white' : 'text-[#0a214f] group-hover:text-[#C79F2B]'
                  }`}>
                  {faq.question}
                </h3>
                <div className={`
                  p-3 rounded-full transition-all duration-300
                  ${openIndex === index
                    ? 'bg-[#C79F2B] text-[#0a214f] rotate-180'
                    : 'bg-[#0a214f]/10 text-[#0a214f] group-hover:bg-[#C79F2B] group-hover:text-white'
                  }
                `}>
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </div>

              {/* Answer */}
              <div className={`grid transition-all duration-500 ease-in-out ${openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}>
                <div className="overflow-hidden">
                  <p className="px-8 pb-8 text-lg leading-relaxed text-white/90">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-[#0a214f]/80 text-lg md:text-xl mb-6">
            Still unsure?
          </p>

          <Link to="/contact">
            <button
              className="
        group inline-flex items-center gap-2
        bg-[#0a214f] text-white px-5 py-3 md:px-10 md:py-5 rounded-full text-base md:text-xl font-bold shadow-2xl
        hover:bg-[#C79F2B] hover:text-[#0a214f] hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
              Chat With Us — We Reply in Minutes
            </button>
          </Link>
        </div>


      </div>
    </section>
  );
}