import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { fetchPhoneModels } from '../../api/phoneModelApi.js';

export default function PhoneModelSelector() {
  const [activeBrand, setActiveBrand] = useState("Apple");
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadModels = async () => {
      try {
        const data = await fetchPhoneModels();
        setModels(data);
      } catch (error) {
        console.error("Failed to load phone models", error);
      } finally {
        setLoading(false);
      }
    };
    loadModels();
  }, []);

  const handleModelClick = (modelName) => {
    navigate('/case-design', { state: { initialModel: modelName } });
  };

  // Extract unique categories (brands) from models
  // Default to Apple, Samsung, Google if no models, or just use what's there
  const availableBrands = ["Apple", "Samsung", "Google"];
  // You could also do: const uniqueBrands = [...new Set(models.map(m => m.category || 'Apple'))];
  // But sticking to the known categories for tabs is safer for UI consistency unless we want dynamic tabs.
  // The user prompt implied 3 categories, so let's stick to these 3 for now, or maybe make it dynamic if they add more.
  // Let's stick to the static list for UI layout stability, but filter models dynamically.

  const filteredModels = models.filter(m => (m.category || 'Apple') === activeBrand);

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">

        {/* Top Headline + Trust */}
        <div className="text-center px-4 sm:px-6 md:px-0 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-snug">
            Design a unique phone case with your own photo today
          </h2>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg md:text-xl text-gray-600">
            From $14.95 • Fast & reliable shipping
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-current' : 'fill-transparent'}`} />
              ))}
            </div>
            <span className="text-gray-700 font-medium">4.98</span>
            <span className="text-gray-500">(12,847 reviews)</span>
          </div>
        </div>

        {/* Main Selector */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
              Choose your brand and model
            </h3>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Left: Brand Tabs */}
              <div className="lg:col-span-1">
                <div className="space-y-2">
                  {availableBrands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setActiveBrand(brand)}
                      className={`
    w-full text-left
    px-4 py-3 md:px-6 md:py-4
    rounded-xl font-semibold
    text-base md:text-lg
    transition-all duration-300
    ${activeBrand === brand
                          ? 'bg-[#124090] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
  `}
                    >
                      {brand}
                    </button>

                  ))}

                </div>
              </div>

              {/* Right: Model Grid */}
              <div className="lg:col-span-3">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#124090]"></div>
                  </div>
                ) : filteredModels.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No models found for {activeBrand}.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filteredModels.map((model) => (
                      <button
                        key={model._id}
                        onClick={() => handleModelClick(model.name)}
                        className="
        group
        w-full
        cursor-pointer
        bg-gray-50 hover:bg-[#124090] hover:text-white
        px-4 py-3 md:px-5 md:py-4
        rounded-xl
        text-center font-medium
        text-gray-800
        border border-gray-200 hover:border-transparent
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1
    "
                      >
                        {model.name}
                      </button>

                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}