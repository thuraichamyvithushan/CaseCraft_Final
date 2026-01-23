import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star, ArrowRight } from 'lucide-react';

// Replace these with your actual phone case images
import case1 from "../../assets/cases/case1.webp";
import case2 from "../../assets/cases/case2.webp";
import case3 from "../../assets/cases/case3.webp";
import case4 from "../../assets/cases/case4.webp";
import case5 from "../../assets/cases/case1.webp";
import case6 from "../../assets/cases/case2.webp";
import case7 from "../../assets/cases/case3.webp";
import case8 from "../../assets/cases/case4.webp";

// Reusable Product Card
const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg
            ${product.badge === 'Best Seller' ? 'bg-[#3065C5]' :
              product.badge === 'New' ? 'bg-emerald-500' :
                product.badge === 'Eco' ? 'bg-green-600' :
                  product.badge === 'Trending' ? 'bg-purple-600' : 'bg-[#124090]'}`}>
            {product.badge}
          </div>
        )}

        {/* Wishlist */}
        <button className="
          absolute top-3 right-3 md:top-4 md:right-4 z-10
          p-2 md:p-2.5
          bg-white/80 backdrop-blur
          rounded-full
          hover:bg-white hover:text-[#FADC58]
          shadow-sm md:shadow
          transition-all duration-300
        ">
          <Heart className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Image */}
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />


      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 group-hover:text-[#3065C5] transition-colors line-clamp-2">
            {product.name}
          </h3>
          <span className="text-lg font-bold text-[#124090]">${product.price}</span>
        </div>

        <p className="text-sm text-gray-500 mb-3">{product.desc}</p>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#FADC58] text-[#FADC58]" />
          ))}
          <span className="text-xs text-gray-500 ml-1">(1.2k+)</span>
        </div>
      </div>
    </div>
  );
};

// Main Section
export default function PhoneCaseShowcase() {
  const navigate = useNavigate();
  const phoneCases = [
    { id: 1, name: "Golden Retriever Portrait Case", desc: "Tough Case • Glossy Finish", price: "29.99", badge: "Best Seller", img: case1 },
    { id: 2, name: "Cat Mom Collage Case", desc: "MagSafe • Matte Black", price: "34.99", badge: "New", img: case2 },
    { id: 3, name: "Dog Paw Print Pattern", desc: "Slim Case • Clear", price: "24.99", badge: null, img: case3 },
    { id: 4, name: "Custom Pet Name Case", desc: "Bio Case • Eco-Friendly", price: "32.99", badge: "Eco", img: case4 },
    { id: 5, name: "French Bulldog Cartoon", desc: "Wallet Case • Leather", price: "44.99", badge: "Trending", img: case5 },
    { id: 6, name: "Multi-Pet Family Case", desc: "Up to 6 pets • Tough", price: "36.99", badge: null, img: case6 },
    { id: 7, name: "Minimal Pet Silhouette", desc: "Clear Case • Anti-Yellowing", price: "26.99", badge: "New", img: case7 },
    { id: 8, name: "Rainbow Bridge Memorial", desc: "Soft Touch • In Memory", price: "31.99", badge: null, img: case8 },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#3065C5] font-bold uppercase tracking-wider text-sm mb-3">
            Most Loved This Week
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#124090] mb-5">
            Trending Phone Cases
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#124090] to-[#FADC58] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join 100,000+ happy pet parents showing off their fur babies every day.
          </p>
        </div>

        {/* 8 Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {phoneCases.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-20">
          <button
            onClick={() => navigate('/case-design')}
            className="
            group relative inline-flex items-center gap-3 md:gap-4
            px-6 py-4 md:px-10 md:py-6
            bg-gradient-to-r from-[#FADC58] via-[#C79F2B] to-[#3065C5] text-[#124090]
            text-base md:text-xl font-black uppercase tracking-wider
            rounded-2xl shadow-2xl hover:shadow-[#FADC58]/60
            transform hover:scale-105 hover:-translate-y-1
            transition-all duration-500 overflow-hidden
          ">
            {/* Shine animation */}
            <span className="
              absolute inset-0 bg-white/30 -translate-x-full
              group-hover:translate-x-full
              transition-transform duration-1000 skew-x-12
            "></span>

            <span className="relative z-10 drop-shadow-md">
              Design Your Own Case
            </span>

            <ArrowRight className="
              w-5 h-5 md:w-8 md:h-8
              relative z-10
              group-hover:translate-x-3
              transition-transform duration-300
            " />
          </button>
        </div>

      </div>
    </section>
  );
}