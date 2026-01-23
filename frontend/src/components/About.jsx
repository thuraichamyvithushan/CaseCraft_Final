import { useEffect, useState } from "react";
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

import machineHero from "../assets/vendingmachine-hero.png";
import { Link } from "react-router-dom";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: "🇦🇺",
      title: "Proudly Australian",
      description: "As a local company, we're committed to delivering products that resonate with the Aussie spirit—bold, creative, and built to last.",
    },
    {
      icon: "📸",
      title: "Preserve Your Memories",
      description: "We're here to help you transform your favourite moments into tangible keepsakes through stunning custom phone cases, available via our vending machines or online store.",
    },
    {
      icon: "✨",
      title: "Unmatched Quality",
      description: "With cutting-edge technology, intuitive interfaces, and a focus on vibrant, durable prints, CaseCraft ensures a seamless experience and a premium product every time.",
    },
    {
      icon: "🎁",
      title: "Perfect for Gifting",
      description: "Our personalised phone cases make thoughtful, one-of-a-kind gifts that capture the moments that matter most.",
    },
  ];

  const whatWeDo = [
    {
      title: "Offline Innovation",
      description: "Our CaseCraft vending machines, found in prime locations like City Cross in Rundle Mall, Westfield Warringah Mall, and more, provide a fast, user-friendly experience for creating personalised phone cases on the spot.",
      details: "Simply scan a QR code, upload your image, and watch your custom case come to life in minutes!",
      number: "01",
    },
    {
      title: "Online Customisation",
      description: "Our newly upgraded website, snapshell.com.au, offers an enhanced custom phone case design experience.",
      details: "Create your perfect case from anywhere with more options, templates, and premium finishes.",
      number: "02",
    },
    {
      title: "Gift-Ready Solutions",
      description: "Looking for the perfect gift? CaseCraft's custom phone cases are designed to make every occasion memorable.",
      details: "A personalised photo case is a heartfelt way to celebrate birthdays, anniversaries, or just because.",
      number: "03",
    },
  ];

   const packageFeatures = [
      { icon: Zap, title: "Setup & Software", desc: "Fully configured system, cloud dashboard access, and step-by-step onboarding." },
      { icon: Package, title: "Phone Case Inventory", desc: "1,000 premium blank cases for iPhone, Samsung, Google Pixel & more." },
      { icon: Droplets, title: "High-Capacity Ink", desc: "Professional ink kit — enough for up to 2,000 stunning prints." },
      { icon: Rocket, title: "Launch Ready", desc: "Proven turnkey model — designed for immediate revenue from day one." },
      { icon: HeadphonesIcon, title: "Ongoing Support", desc: "Dedicated training, 24/7 technical help, and marketing guidance." }
    ];

  return (
    <div className="min-h-screen bg-transparent ">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#124090] via-[#0b305f] to-[#124090] rounded-b-[40px] md:rounded-b-[80px] shadow-2xl">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Animated gradient orb - Gold */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FADC58]/20 rounded-full blur-3xl animate-pulse"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center ">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-block mb-8 px-6 py-2 rounded-full bg-[#FADC58]/20 backdrop-blur-md border border-[#FADC58]/40">
              <p className="text-sm font-bold text-[#FADC58] tracking-wider uppercase">Custom Phone Case Specialists</p>
            </div>

            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-black mb-8 leading-none tracking-tighter">
              <span className="block text-white/10 uppercase">ABOUT</span>
              <span className="block text-white">CaseCraft</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed mb-12">
              Australia's Proudly Homegrown Leader in Custom Phone Case Vending Machines & Personalized Case Solutions
            </p>

            <div className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FADC58] to-[#C79F2B] text-[#124090] rounded-full font-black text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(250,220,88,0.4)]">
              <span className="text-2xl"></span>
              <span>Made in Australia</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-2 backdrop-blur-sm">
            <div className="w-1 h-3 bg-[#FADC58] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className={`max-w-4xl mx-auto px-6 py-32 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <p className="text-2xl md:text-4xl text-gray-300 leading-relaxed text-center font-medium">
          Welcome to <span className="font-black text-white bg-clip-text bg-gradient-to-r from-[#FADC58] to-[#C79F2B] text-transparent">CaseCraft</span>, Australia's proudly homegrown leader in custom phone case vending machines and personalised case solutions. Born right here in Australia, we're passionate about helping you capture and preserve your most cherished moments through innovative, high-quality custom phone cases.
        </p>
      </div>

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

      {/* Our Story Section */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>

        <div className="relative max-w-6xl mx-auto px-6">
          <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-4 uppercase">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FADC58] to-[#C79F2B]">Story</span>
            </h2>
            <div className="w-48 h-3 bg-gradient-to-r from-[#FADC58] to-[#C79F2B] rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-medium">
                At CaseCraft, we believe that every memory deserves to be celebrated. From our state-of-the-art custom phone case vending machines located in the heart of Adelaide and Sydney to our enhanced online design platform, we're dedicated to making self-expression effortless and meaningful.
              </p>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed italic">
                Our journey began with revolutionary vending machines, allowing customers to create vibrant, durable phone cases using any photo in just 4-5 minutes.
              </p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#FADC58]/20 to-[#3065C5]/20 rounded-3xl blur-3xl group-hover:opacity-100 transition duration-700"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-[40px] p-12 border border-white/10 shadow-2xl transform group-hover:scale-105 transition duration-700">
                <p className="text-xl md:text-2xl text-white leading-relaxed font-bold">
                  Now, we've expanded our vision with an upgraded online experience, giving you more ways to design the perfect custom phone case from anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="py-32 bg-white/5 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-4 uppercase">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FADC58] to-[#C79F2B]">Do</span>
            </h2>
            <div className="w-48 h-3 bg-gradient-to-r from-[#FADC58] to-[#C79F2B] rounded-full"></div>
          </div>

          <div className="space-y-24">
            {whatWeDo.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row gap-12 items-start transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="text-8xl md:text-[10rem] font-black text-white/5 leading-none select-none">
                  {item.number}
                </div>
                <div className="flex-1 space-y-6">
                  <h3 className="text-4xl md:text-5xl font-black text-white">{item.title}</h3>
                  <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-medium">
                    {item.description}
                  </p>
                  <p className="text-lg md:text-xl text-[#FADC58] font-bold italic bg-[#FADC58]/10 px-6 py-3 rounded-2xl inline-block border border-[#FADC58]/30">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose CaseCraft */}
      <div className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`mb-20 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-4 uppercase leading-tight">
              Why Choose <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FADC58] to-[#C79F2B]">CaseCraft?</span>
            </h2>
            <div className="w-48 h-3 bg-gradient-to-r from-[#FADC58] to-[#C79F2B] rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: `${(index + 7) * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[40px] border border-white/10 group-hover:bg-[#FADC58]/5 group-hover:border-[#FADC58]/40 transition-all duration-500 shadow-2xl"></div>
                <div className="relative p-10 flex items-start gap-8">
                  <div className="text-6xl flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(250,220,88,0.3)]">
                    {feature.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-[#FADC58] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FADC58] via-[#C79F2B] to-[#3065C5] rounded-[60px] md:rounded-[120px] mx-4 md:mx-8"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center text-[#124090]">
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="inline-block mb-8 text-8xl animate-bounce">⚡</div>
            <h2 className="text-6xl md:text-9xl font-black mb-12 uppercase tracking-tighter">Our Mission</h2>
            <p className="text-2xl md:text-4xl leading-tight font-black uppercase">
              At CaseCraft, our mission is simple: to empower you to express your individuality and preserve your memories in any moment you choose.
            </p>
            <div className="mt-12 h-1 w-32 bg-[#124090]/50 mx-auto rounded-full"></div>
            <p className="mt-12 text-xl md:text-2xl text-[#124090]/80 font-medium max-w-3xl mx-auto">
              Whether you're visiting one of our vending machines or designing online, we're here to make every experience fun, fast, and unforgettable.
            </p>
          </div>
        </div>
      </div>

      {/* Join the Community */}
      <div className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 uppercase leading-none">
              Join the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FADC58] to-[#3065C5]">Community</span>
            </h2>

            <p className="text-xl md:text-3xl text-gray-400 leading-relaxed mb-16 font-medium">
              We're more than just a brand—we're a community of Aussies who love to celebrate life's moments through personalised phone cases. Follow us on Instagram and TikTok to see real customer creations.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-20">
              <button className="px-10 py-5 bg-gradient-to-r from-[#3065C5] to-[#124090] text-white rounded-full font-black text-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(48,101,197,0.4)] transition-all duration-300 flex items-center gap-3">
                <span>📸</span> Instagram
              </button>
              <button className="px-10 py-5 bg-white text-[#124090] rounded-full font-black text-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center gap-3">
                <span>🎵</span> TikTok
              </button>
              <button className="px-10 py-5 border-4 border-[#FADC58] text-[#FADC58] rounded-full font-black text-xl hover:bg-[#FADC58] hover:text-[#124090] transition-all duration-300">
                🌐 Visit Website
              </button>
            </div>

            <div className="inline-block px-12 py-8 bg-white/5 backdrop-blur-xl rounded-[40px] border-2 border-[#FADC58]/30 shadow-2xl">
              <p className="text-xl md:text-3xl text-white font-black italic">
                Thank you for choosing <span className="text-[#FADC58]">CaseCraft</span>, where your memories become extraordinary. 💙
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;