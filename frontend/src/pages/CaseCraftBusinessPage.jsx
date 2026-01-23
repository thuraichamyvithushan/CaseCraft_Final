import React, { useState } from "react";
import { 
 ArrowRight, 
  Zap, 
  Store, 
  Package, 
  Droplets, 
  Rocket, 
  HeadphonesIcon, 
  ChevronDown, 
  Mail, 
  Phone, 
  Sparkles,
  CheckCircle2,
  Users,
  TrendingUp,
  Clock,
  Shield,
  MapPin,
  QrCode,
  Smartphone,
  CreditCard
} from "lucide-react";
import { Link } from "react-router-dom";

// Replace with your real images
import machineHero from "../assets/vendingmachine-hero.png";
import FullSizeVideo from "../components/home/FullSizeVideo";

const CaseCraftBusinessPage = () => {
  const [activeTab, setActiveTab] = useState("investor");
  const [openFaq, setOpenFaq] = useState(null);

  const investorFaqs = [
    {
      q: "What is included in the Kickstarter Package?",
      a: "• Phone case printing vending machine\n• 1,000 standard phone cases\n• 1 × box of ink (prints up to 2,000 cases)\n• Spare accessories\n• Inbuilt cashless card reader\n• Launch Kit with setup tips, installation guidance, and maintenance videos"
    },
    { q: "How many cases does the machine hold?", a: "Up to 1,000 blank cases internally, with easy front-loading restock access." },
    { q: "What is the Launch Kit?", a: "A complete digital + physical toolkit: step-by-step videos, marketing templates, maintenance schedules, and location tips." },
    { q: "How long does the initial installation take?", a: "Most operators are fully operational in 2–4 hours." },
    { q: "Does setup include Point of Sale onboarding?", a: "Yes — full merchant account setup and tap-to-pay integration included." },
    { q: "Do I need technical experience to run the machine?", a: "No — designed for anyone. Restocking and basic cleaning are the only regular tasks." },
    { q: "Is there weekly maintenance required?", a: "Only 10–15 minutes: quick print head wipe and ink check." },
    { q: "When do I receive payments?", a: "Daily or weekly direct deposit — you choose." },
    { q: "How do I track my machine?", a: "Real-time cloud dashboard: sales, inventory, uptime, alerts — from any device." },
    { q: "Can I finance the purchase?", a: "Yes — flexible 12–60 month financing available." }
  ];

  const customerFaqs = [
    {
      q: "How does the phone case printing machine work?",
      a: "Customers select their phone model, scan the QR code on the machine, and upload their photo. The machine then prints their custom phone case on the spot using a high-end UV ink-jet printer. The entire process is fully automated, with each phone case printed in approximately 3 minutes."
    },
    {
      q: "What phone models are supported?",
      a: "We support all popular models including iPhone (6–16 series), Samsung Galaxy (S & A series), Google Pixel, and more. New models added regularly."
    },
    {
      q: "How do customers pay?",
      a: "Tap-to-pay only — Apple Pay, Google Pay, credit/debit cards. Fast, secure, contactless."
    },
    { q: "Is the print quality good?", a: "Excellent — full-color, scratch-resistant, fade-proof UV printing that lasts years." },
    { q: "Can I use any photo?", a: "Yes — any photo from your phone gallery or camera roll. Pets, family, travel, memes — anything!" },
    { q: "How long does it take?", a: "About 3 minutes from upload to finished case in your hand." },
    { q: "Are the cases protective?", a: "Yes — premium tough cases with raised edges and shock absorption." }
  ];

  // Determine which FAQ list to show
  const currentFaqs = activeTab === "investor" ? investorFaqs : customerFaqs;

  const packageFeatures = [
    { icon: Zap, title: "Setup & Software", desc: "Fully configured system, cloud dashboard access, and step-by-step onboarding." },
    { icon: Package, title: "Phone Case Inventory", desc: "1,000 premium blank cases for iPhone, Samsung, Google Pixel & more." },
    { icon: Droplets, title: "High-Capacity Ink", desc: "Professional ink kit — enough for up to 2,000 stunning prints." },
    { icon: Rocket, title: "Launch Ready", desc: "Proven turnkey model — designed for immediate revenue from day one." },
    { icon: HeadphonesIcon, title: "Ongoing Support", desc: "Dedicated training, 24/7 technical help, and marketing guidance." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#124090]/5 to-white">

      {/* Hero */}
      <section className="relative py-32 md:py-40 overflow-hidden text-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 w-full h-full bg-gradient-to-b from-[#FADC58]/30 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#124090]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#FADC58] to-[#C79F2B] text-[#124090] px-12 py-6 rounded-full text-2xl font-black uppercase tracking-wider shadow-2xl mb-10">
            <Store className="w-10 h-10" />
            Become a Business Owner Today
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-[#124090] leading-tight max-w-6xl mx-auto">
            Plug-and-Play<br />
            <span className="bg-gradient-to-r from-[#FADC58] to-[#C79F2B] bg-clip-text text-transparent">
              Phone Case Printing Business
            </span>
          </h1>

          <p className="mt-10 text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            We offer an exciting turnkey opportunity with a fully automated vending machine — fast setup, low overheads, and proven customer demand.
          </p>

          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you have a location or need help finding one — we’ve got flexible options for every goal.
          </p>

          <div className="mt-16 flex flex-col sm:flex-row justify-center gap-8">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-6 bg-gradient-to-r from-[#FADC58] via-[#C79F2B] to-[#124090] text-white px-16 py-8 rounded-full text-3xl font-black shadow-2xl hover:shadow-[#FADC58]/60 hover:scale-110 transition-all duration-500"
            >
              Get Started Now
              <ArrowRight className="w-10 h-10 group-hover:translate-x-4 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

         <FullSizeVideo/>

      {/* Why Partner */}
<section className="py-24 md:py-32 bg-gradient-to-b from-[#124090] via-[#0f3a7a] to-[#0b305f]">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-5xl md:text-7xl font-black text-center text-[#FADC58] mb-20 drop-shadow-2xl">
      Why Partner With Case Craft?
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
      {[
        { icon: TrendingUp, text: "Proven business model with real-world performance" },
        { icon: Users, text: "High-demand product with strong margins" },
        { icon: Zap, text: "Fully automated vending solution" },
        { icon: Shield, text: "Minimal staffing required" },
        { icon: Clock, text: "Fast setup & easy operation" },
        { icon: MapPin, text: "Perfect for malls, airports, events & high-traffic locations" }
      ].map((item, i) => (
        <div
          key={i}
          className="group flex items-start gap-6 p-10 bg-white/5 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-[#FADC58]/20 hover:scale-105 transition-all duration-500 border border-[#FADC58]/30 hover:border-[#FADC58]/60"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#FADC58] to-[#C79F2B] rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0 ring-4 ring-[#FADC58]/40">
            <item.icon className="w-9 h-9 text-[#124090]" />
          </div>
          <p className="text-xl font-medium text-gray-100 leading-relaxed group-hover:text-white transition-colors duration-300">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Kickstarter Package */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-6xl md:text-8xl font-black text-[#124090] mb-12">
            Kickstarter Package
          </h2>

          <div className="relative mx-auto max-w-6xl mb-20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FADC58]/40 via-[#C79F2B]/30 to-[#124090]/20 rounded-3xl blur-3xl"></div>
            <img
              src={machineHero}
              alt="Case Craft Vending Machine"
              className="relative rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-12">
            {packageFeatures.map((feature, i) => (
              <div key={i} className="group bg-white/90 backdrop-blur rounded-3xl p-10 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-500 border border-gray-100">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-[#FADC58] to-[#C79F2B] rounded-3xl flex items-center justify-center shadow-xl">
                  <feature.icon className="w-14 h-14 text-[#124090]" />
                </div>
                <h4 className="text-2xl font-black text-[#124090] mb-4">{feature.title}</h4>
                <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="mt-20 inline-flex items-center gap-6 bg-gradient-to-r from-[#FADC58] via-[#C79F2B] to-[#124090] text-white px-16 py-8 rounded-full text-3xl font-black shadow-2xl hover:shadow-[#FADC58]/60 hover:scale-110 transition-all duration-500 group"
          >
            Contact Us To Find Out More
            <ArrowRight className="w-10 h-10 group-hover:translate-x-4 transition-transform" />
          </Link>
        </div>
      </section>

      {/* FAQ with Tabs */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-6xl md:text-7xl font-black text-center text-[#124090] mb-12">
            Frequently Asked Questions
          </h2>

          {/* Tab Buttons */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-gray-100 rounded-full p-2 shadow-xl">
              <button
                onClick={() => setActiveTab("investor")}
                className={`px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 flex items-center gap-3 ${
                  activeTab === "investor"
                    ? "bg-gradient-to-r from-[#FADC58] to-[#C79F2B] text-[#124090] shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Store className="w-6 h-6" />
                Investor FAQ
              </button>
              <button
                onClick={() => setActiveTab("customer")}
                className={`px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 flex items-center gap-3 ${
                  activeTab === "customer"
                    ? "bg-gradient-to-r from-[#FADC58] to-[#C79F2B] text-[#124090] shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Smartphone className="w-6 h-6" />
                Customer FAQ
              </button>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-8">
            {currentFaqs.map((faq, i) => (
              <div
                key={i}
                className="group bg-gradient-to-r from-[#FADC58]/5 to-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#FADC58]/30 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-12 py-10 flex items-center justify-between text-left hover:bg-[#FADC58]/5 transition-colors"
                >
                  <span className="text-2xl md:text-3xl font-bold text-[#124090] pr-10">
                    {String(i + 1).padStart(2, "0")} {faq.q}
                  </span>
                  <ChevronDown className={`w-10 h-10 text-[#124090] transition-transform duration-500 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>

                {openFaq === i && (
                  <div className="px-12 pb-12">
                    <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-24 text-center space-y-8">
            <p className="text-2xl text-gray-700">Still have questions?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <a href="mailto:hello@caseCraft.com" className="group flex items-center gap-5 text-2xl font-bold text-[#124090] hover:text-[#C79F2B] transition">
                <Mail className="w-10 h-10 group-hover:scale-110 transition-transform" />
                hello@caseCraft.com
              </a>
              <a href="tel:+1234567890" className="group flex items-center gap-5 text-2xl font-bold text-[#124090] hover:text-[#C79F2B] transition">
                <Phone className="w-10 h-10 group-hover:scale-110 transition-transform" />
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseCraftBusinessPage;