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
import { FaFacebook, FaInstagram, FaTwitter, } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

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
      description: "Our newly upgraded website, casecraft.com.au, offers an enhanced custom phone case design experience.",
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
      <div className="relative min-h-[90vh] md:min-h-screen py-12 md:py-32 flex items-center justify-center overflow-hidden 
             bg-gradient-to-br from-[#124090] via-[#0b305f] to-[#124090] rounded-b-[30px] sm:rounded-b-[40px] md:rounded-b-[80px] shadow-2xl">
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
            <div className="inline-block mb-4 md:mb-8 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-[#FADC58]/20 backdrop-blur-md border border-[#FADC58]/40">
              <p className="text-xs md:text-sm font-bold text-[#FADC58] tracking-wider uppercase">Custom Phone Case Specialists</p>
            </div>

            <h1 className="text-5xl md:text-9xl lg:text-[12rem] font-black mb-6 md:mb-8 leading-none tracking-tighter">
              <span className="block text-white/10 uppercase">ABOUT</span>
              <span className="block text-white">CaseCraft</span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed mb-8 md:mb-12">
              Australia's Proudly Homegrown Leader in Custom Phone Case Vending Machines & Personalized Case Solutions
            </p>

            <div className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-[#FADC58] to-[#C79F2B] text-[#124090] rounded-full font-black text-lg md:text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(250,220,88,0.4)]">
              <span className="text-xl md:text-2xl"></span>
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
      <div className="relative py-16 md:py-32 overflow-hidden bg-white">
        {/* Animated Background Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#124090]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FADC58]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

        <div className={`relative z-10 max-w-5xl mx-auto px-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-1 bg-gradient-to-r from-[#124090] to-[#FADC58] rounded-full mb-12"></div>

            <h2 className="text-3xl md:text-6xl font-black text-[#124090] leading-tight mb-12 uppercase tracking-tighter">
              A New Era of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#124090] via-[#C79F2B] to-[#FADC58]">Self-Expression</span>
            </h2>

            <p className="text-xl md:text-4xl text-gray-600 leading-tight font-medium max-w-4xl tracking-tight">
              Welcome to <span className="font-black text-[#124090]">CaseCraft</span>, where we've redefined how Australians preserve their memories. Born from a passion for innovation, we blend technology with creativity to turn your favorite moments into premium, tangible keepsakes.
            </p>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl">
              {[
                { label: "Founded In", value: "Australia" },
                { label: "Printing Time", value: "4-5 Mins" },
                { label: "Quality", value: "Ultra HD" },
                { label: "Support", value: "24/7" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</span>
                  <span className="text-lg font-black text-[#124090]">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Partner */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-[#124090] via-[#0f3a7a] to-[#0b305f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-4xl md:text-8xl font-black text-[#ffffff] mb-6 uppercase tracking-tight">
              Why Partner With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#909eb7] to-[#C79F2B]">Case Craft?</span>
            </h2>
            <div className="w-24 h-1 bg-[#FADC58] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
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
                className={`group flex items-start gap-6 p-8 bg-white rounded-[32px] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 hover:border-[#FADC58]/50 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#124090] to-[#0b305f] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0">
                  <item.icon className="w-7 h-7 md:w-8 md:h-8 text-[#FADC58]" />
                </div>
                <p className="text-lg font-bold text-gray-700 leading-relaxed pt-2">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kickstarter Package */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-8xl font-black text-[#124090] mb-8 md:mb-12">
            Kickstarter Package
          </h2>

          <div className="relative mx-auto max-w-5xl mb-24 md:mb-32 group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FADC58] via-[#C79F2B] to-[#124090] rounded-[40px] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            <img
              src={machineHero}
              alt="Case Craft Vending Machine"
              className="relative rounded-2xl md:rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-12">
            {packageFeatures.map((feature, i) => (
              <div key={i} className="group bg-white/90 backdrop-blur rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-500 border border-gray-100">
                <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 md:mb-8 bg-gradient-to-br from-[#FADC58] to-[#C79F2B] rounded-2xl md:rounded-3xl flex items-center justify-center shadow-xl">
                  <feature.icon className="w-8 h-8 md:w-14 md:h-14 text-[#124090]" />
                </div>
                <h4 className="text-xl md:text-2xl font-black text-[#124090] mb-3 md:mb-4">{feature.title}</h4>
                <p className="text-sm md:text-gray-700 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-24">
            <Link
              to="/contact"
              className="inline-flex items-center gap-6 bg-gradient-to-r from-[#FADC58] via-[#e6c64d] to-[#C79F2B] text-[#124090] px-12 py-6 rounded-full text-2xl font-black shadow-[0_0_50px_rgba(250,220,88,0.3)] hover:shadow-[0_0_70px_rgba(250,220,88,0.5)] hover:scale-105 transition-all duration-500 group"
            >
              Contact Us To Find Out More
              <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story*/}
      <section className="relative py-16 md:py-32 bg-[#124090] overflow-hidden">
        {/* Decorative mask for transition */}
        <div className="absolute top-0 left-0 w-full h-32 "></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24">
            <h2 className="text-5xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-6">
              OUR <span className="text-[#FADC58]">STORY</span>
            </h2>
            <div className="w-40 md:w-64 h-2 md:h-3 bg-[#FADC58] rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="space-y-8 md:space-y-12">
              <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-medium">
                At CaseCraft, we believe that every memory deserves to be celebrated. From our state-of-the-art custom phone case vending machines located in the heart of Adelaide and Sydney to our enhanced online design platform, we're dedicated to making self-expression effortlessly and meaningful.
              </p>
              <p className="text-lg md:text-2xl text-white/60 leading-relaxed italic font-medium">
                Our journey began with revolutionary vending machines, allowing customers to create vibrant, durable phone cases using any photo in just 4-5 minutes.
              </p>
            </div>

            <div className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 lg:translate-y-0 lg:translate-x-10"}`}>
              <div className="absolute -inset-4 bg-gradient-to-br from-[#FADC58]/20 to-transparent rounded-[40px] blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-3xl p-8 md:p-16 rounded-[40px] border border-white/10 shadow-2xl">
                <p className="text-xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                  Now, we've expanded our vision with an upgraded online experience, giving you more ways to design the perfect custom phone case from anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FADC58]/5 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24">
            <h2 className="text-6xl md:text-9xl font-black text-[#124090] uppercase tracking-tighter leading-none mb-6">
              WHAT WE <span className="text-[#FADC58]">DO</span>
            </h2>
            <div className="w-48 md:w-64 h-3 bg-[#FADC58] rounded-full"></div>
          </div>

          <div className="space-y-16 md:space-y-32">
            {whatWeDo.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row gap-8 md:gap-16 items-start transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Large Number - Now Static in Flexbox for Stability */}
                <div className="text-8xl md:text-[10rem] font-black text-[#124090]/10 leading-none select-none flex-shrink-0">
                  {item.number}
                </div>

                <div className="flex-1 space-y-6">
                  <h3 className="text-3xl md:text-5xl font-black text-[#124090] uppercase tracking-tight italic">
                    {item.title}
                  </h3>
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium max-w-4xl">
                    {item.description}
                  </p>

                  {/* Gold Highlight Box */}
                  <div className="inline-block p-6 md:p-8 bg-[#124090]/5 border border-[#124090]/40 rounded-3xl">
                    <p className="text-lg md:text-xl text-[#7a7c9a] font-black italic tracking-tight">
                      {item.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CaseCraft - High Impact Grid */}
      <section className="py-16 md:py-32 bg-[#124090] relative overflow-hidden">
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FADC58]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="text-[#FADC58] font-black tracking-widest uppercase text-sm mb-4">THE DIFFERENCE</span>
            <h2 className="text-4xl md:text-8xl font-black text-white mb-8 uppercase tracking-tighter">
              WHY CHOOSE <br />
              <span className="text-[#FADC58]">CASECRAFT?</span>
            </h2>
            <div className="w-24 h-1 bg-[#FADC58] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-10 md:p-12 bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/10 hover:border-[#FADC58]/30 transition-all duration-700 hover:bg-white/10 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="text-7xl md:text-8xl flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 filter drop-shadow-[0_0_15px_rgba(250,220,88,0.3)]">
                    {feature.icon}
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-2xl md:text-4xl font-black text-white group-hover:text-[#FADC58] transition-colors uppercase tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-lg md:text-xl text-blue-100/60 leading-relaxed font-medium italic">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission - Immersive Impact */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-white">
        {/* Complex Mesh Gradient Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-[#FADC58]/20 rounded-full blur-[160px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-[#124090]/10 rounded-full blur-[160px]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <span className="inline-block px-8 py-3 rounded-full bg-[#124090]/5 border border-[#124090]/10 text-[#124090] font-black uppercase tracking-widest text-sm mb-12">
              OUR CORE PURPOSE
            </span>

            <h2 className="text-5xl md:text-9xl font-black text-[#124090] mb-12 uppercase tracking-tighter leading-none">
              OUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#124090] via-[#C79F2B] to-[#FADC58]">MISSION</span>
            </h2>

            <p className="text-2xl md:text-5xl font-black text-[#124090] leading-tight max-w-5xl mx-auto uppercase tracking-tighter">
              To empower every Australian to <span className="text-[#C79F2B]">capture life's beauty</span> and wear their memories with pride.
            </p>

            <div className="mt-16 w-24 h-1 bg-gradient-to-r from-[#124090] to-[#FADC58] mx-auto rounded-full"></div>

            <p className="mt-16 text-xl md:text-2xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
              Whether through our instant vending machines or our intuitive online platform, we make the extraordinary accessible to everyone, effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Join the Community - Social Redesign */}
      <section className="py-16 md:py-32 bg-[#124090] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(250,220,88,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,220,88,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-12 uppercase tracking-tighter leading-none">
              JOIN THE <br />
              <span className="text-[#FADC58]">COMMUNITY</span>
            </h2>

            <p className="text-xl md:text-3xl text-blue-100/60 leading-relaxed max-w-4xl mx-auto mb-16 font-medium italic">
              We're more than a brand—we're a movement of Aussies celebrating life. Connect with thousands of creators across our social platforms.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-24">
              {[
                { name: "Instagram", icon: FaInstagram, color: "hover:bg-pink-500", shadow: "hover:shadow-pink-500/20" },
                { name: "Facebook", icon: FaFacebook, color: "hover:bg-blue-600", shadow: "hover:shadow-blue-600/20" },
                { name: "TikTok", icon: SiTiktok, color: "hover:bg-black", shadow: "hover:shadow-black/20" },
                { name: "Twitter", icon: FaTwitter, color: "hover:bg-sky-500", shadow: "hover:shadow-sky-500/20" }
              ].map((social, i) => (
                <button
                  key={i}
                  className={`px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-full font-black text-xl transition-all duration-300 flex items-center gap-4 ${social.color} ${social.shadow} group hover:-translate-y-2`}
                >
                  <social.icon className="w-6 h-6 group-hover:scale-120 transition-transform duration-500" />
                  {social.name}
                </button>
              ))}
            </div>

            <div className="inline-block px-12 py-10 bg-white/5 backdrop-blur-2xl rounded-[48px] border-2 border-[#FADC58]/20 shadow-2xl transition-all duration-500 hover:border-[#FADC58]/50">
              <p className="text-2xl md:text-4xl text-white font-black italic tracking-tight">
                Thank you for choosing <span className="text-[#FADC58] tracking-tighter">CaseCraft</span>. <br />
                <span className="text-lg md:text-2xl text-blue-100/60 not-italic font-bold">Where your memories become extraordinary. 🤍</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
