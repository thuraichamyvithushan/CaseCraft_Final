import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/logo2.png";
import {
  Heart,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  ChevronRight
} from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#02225b] via-[#0f3a7a] to-[#0b305f] text-white overflow-hidden">

      {/* Background Glows - Gold themed */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#FADC58]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C79F2B]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand & Love Message */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="CaseCraft Logo"  className="h-24"/>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              We don’t just make phone cases — we help you keep your best memory with you, every single day.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-[#FADC58] hover:text-[#124090] hover:scale-110 transition-all duration-300 shadow-lg">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-[#FADC58] hover:text-[#124090] hover:scale-110 transition-all duration-300 shadow-lg">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-[#FADC58] hover:text-[#124090] hover:scale-110 transition-all duration-300 shadow-lg">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-[#FADC58] mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Explore
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Home", to: "/" },
                { label: "Custom Phone Cases", to: "/custom-mobilecase" },
                { label: "Become a Owner", to: "/CaseCraftBusinessPage" },
                { label: "Start Design", to: "/case-design" },
                { label: "About US", to: "/about" }
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="group flex items-center gap-3 text-gray-300 hover:text-[#FADC58] transition-all duration-300"
                  >
                    <ChevronRight className="w-4 h-4 text-[#FADC58] opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xl font-bold text-[#FADC58] mb-6">Need Help?</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#FADC58] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Email Us</p>
                  <a href="mailto:hello@casecraft.com" className="hover:text-[#FADC58] transition">hello@casecraft.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#FADC58] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Call or Text</p>
                  <a href="tel:+61123456789" className="hover:text-[#FADC58] transition">+(61) 123-567-890</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FADC58] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">We’re Online Only</p>
                  <p className="text-sm">Shipping worldwide from AUSTRALIA</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-[#FADC58] mb-4">
              Get First Dibs on New Drops
            </h4>
            <p className="text-gray-300 mb-6">
              Be the first to know about new collections, restocks, and exclusive discounts.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="
                  w-full
                  px-4 py-3 md:px-6 md:py-4
                  rounded-full
                  bg-white/10 backdrop-blur
                  border border-[#FADC58]/30
                  text-white placeholder-gray-400
                  text-sm md:text-base
                  focus:outline-none focus:ring-2 focus:ring-[#FADC58] focus:border-[#FADC58]
                  transition-all duration-300
                "
              />

              <button
                className="
                  w-full
                  bg-gradient-to-r from-[#FADC58] to-[#C79F2B]
                  text-[#124090]
                  py-3 md:py-4
                  rounded-full
                  font-bold
                  text-sm md:text-base
                  shadow-lg md:shadow-xl
                  hover:shadow-[#FADC58]/60
                  hover:scale-105
                  flex items-center justify-center
                  gap-2 md:gap-3
                  transition-all duration-300
                "
              >
                Subscribe Now
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-4">
              We respect your inbox. Unsubscribe anytime. No spam, ever.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {year} <span className="text-[#FADC58] font-bold">CaseCraft</span>. Keep your best memory with you.
            </p>
            <div className="flex items-center gap-8 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-[#FADC58] transition">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-[#FADC58] transition">Terms of Service</Link>
              <Link to="/shipping" className="hover:text-[#FADC58] transition">Shipping Info</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;