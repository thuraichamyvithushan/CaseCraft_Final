import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Search, MapPin, Navigation, Info, Store, Clock, Award } from "lucide-react";
import cover1 from "../assets/cover1.webp";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in React/Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map center changes
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
};

const StoreLocator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([-33.8688, 151.2093]); // Sydney default
  const [mapZoom, setMapZoom] = useState(11);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statsVisible, setStatsVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [locationsVisible, setLocationsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setMapLoaded(true), 500);
    setTimeout(() => setStatsVisible(true), 200);
    setTimeout(() => setSearchVisible(true), 400);
    setTimeout(() => setLocationsVisible(true), 600);
  }, []);

  // Location data with coordinates
  const shoppingLocations = {
    sa: [
      {
        name: "City Cross, Rundle Mall (Near the food court)",
        lat: -34.9232,
        lng: 138.6006,
        address: "City Cross, Rundle Mall, Adelaide SA 5000"
      },
      {
        name: "Brickworks Marketplace (In front of Woolworths)",
        lat: -34.9444,
        lng: 138.6006,
        address: "Brickworks Marketplace, Torrensville SA 5031"
      },
    ],
    nsw: [
      {
        name: "UTS (BUILDING 5 COURTARD)",
        lat: -33.8832,
        lng: 151.2016,
        address: "UTS Building 5, Ultimo NSW 2007"
      },
      {
        name: "Westfield Eastgardens (Level 3, lift outside Hoyts)",
        lat: -33.9394,
        lng: 151.2306,
        address: "Westfield Eastgardens, Eastgardens NSW 2036"
      },
      {
        name: "Westfield Hornsby (Level 3, opposite NRMA / Chemist Warehouse)",
        lat: -33.7025,
        lng: 151.0994,
        address: "Westfield Hornsby, Hornsby NSW 2077"
      },
      {
        name: "Westfield Parramatta (Level 1 lift lobby, near Medibank)",
        lat: -33.8167,
        lng: 151.0000,
        address: "Westfield Parramatta, Parramatta NSW 2150"
      },
      {
        name: "Westfield Sydney (QVBNext to the reception)",
        lat: -33.8688,
        lng: 151.2093,
        address: "Westfield Sydney, Sydney NSW 2000"
      },
      {
        name: "Westfield Warringah (Level 2 & Behind McDonald's)",
        lat: -33.7833,
        lng: 151.2667,
        address: "Westfield Warringah, Brookvale NSW 2100"
      },
      {
        name: "Wwestfield Miranda (Foot Locker & Cotton On)",
        lat: -34.0333,
        lng: 151.1000,
        address: "Westfield Miranda, Miranda NSW 2228"
      },
      {
        name: "Castle Towers (Station tunnel, near McDonald's)",
        lat: -33.7333,
        lng: 151.0000,
        address: "Castle Towers, Castle Hill NSW 2154"
      },
      {
        name: "Westpoint Blacktown (at G floor food core)",
        lat: -33.7667,
        lng: 150.9167,
        address: "Westpoint Blacktown, Blacktown NSW 2148"
      },
      {
        name: "Tramsheds (On the top floor)",
        lat: -33.8833,
        lng: 151.1833,
        address: "Tramsheds, Forest Lodge NSW 2037"
      },
      {
        name: "Balgowlah Village Centre (B1 to Ground Floor)",
        lat: -33.8000,
        lng: 151.2667,
        address: "Balgowlah Village Centre, Balgowlah NSW 2093"
      },
      {
        name: "Pemulwuy Marketplace (At Woolworths entrance)",
        lat: -33.8167,
        lng: 150.9167,
        address: "Pemulwuy Marketplace, Pemulwuy NSW 2145"
      },
      {
        name: "Forestway Shopping Centre",
        lat: -33.7333,
        lng: 151.1833,
        address: "Forestway Shopping Centre, Frenchs Forest NSW 2086"
      },
      {
        name: "Stanhope Village (Near the food court)",
        lat: -33.7333,
        lng: 150.9167,
        address: "Stanhope Village, Stanhope Gardens NSW 2768"
      },
      {
        name: "Emerton Village (At Woolworths entrance)",
        lat: -33.7500,
        lng: 150.8500,
        address: "Emerton Village, Emerton NSW 2770"
      },
      {
        name: "Ed.Square Shopping Centre (B1 parking to G Floor)",
        lat: -33.8833,
        lng: 150.8833,
        address: "Ed.Square Shopping Centre, Edmondson Park NSW 2174"
      },
    ],
  };

  // Handle location click
  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setMapCenter([location.lat, location.lng]);
    setMapZoom(16);
  };

  // Get filtered locations
  const getFilteredLocations = () => {
    let locations = [];
    if (selectedState === "sa") {
      locations = shoppingLocations.sa;
    } else if (selectedState === "nsw") {
      locations = shoppingLocations.nsw;
    } else {
      locations = [...shoppingLocations.sa, ...shoppingLocations.nsw];
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      locations = locations.filter(loc =>
        loc.name.toLowerCase().includes(query) ||
        loc.address.toLowerCase().includes(query)
      );
    }

    return locations;
  };

  const filteredLocations = getFilteredLocations();
  const totalLocations = shoppingLocations.sa.length + shoppingLocations.nsw.length;

  return (
    <div className="min-h-screen pt-0 pb-6 md:pb-8 relative overflow-hidden bg-white">

      {/* Animated gradient orbs (Blue & Gold) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#124090]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#FADC58]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C79F2B]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] mb-8 sm:mb-12 md:mb-16 overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: `url(${cover1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
          }}></div>
          {/* Blue Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#124090]/90 via-[#1e3a8a]/80 to-[#124090]/90"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-center text-center">
            <div className="w-full">
              <p className={`text-sm sm:text-base md:text-lg lg:text-xl italic font-serif text-[#FADC58] mb-3 sm:mb-4 tracking-wide transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`} style={{ transitionDelay: '0ms' }}>
                <Store className="inline-block w-4 h-4 mr-2 mb-1" />
                Store Locator
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black mb-2 leading-tight px-2 text-white">
                <span className={`inline-block transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`} style={{ transitionDelay: '200ms' }}>
                  FIND US
                </span>
                <br />
                <span className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FADC58] via-[#e6c64d] to-[#C79F2B] transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                  }`} style={{ transitionDelay: '400ms' }}>
                  NEAR YOU
                </span>
              </h1>
              <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-blue-100/90 max-w-3xl mx-auto mt-4 sm:mt-6 leading-relaxed font-light transition-all duration-700 px-4 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`} style={{ transitionDelay: '600ms' }}>
                Discover CaseCraft vending machine locations across NSW & SA. Create your custom phone case in just 4-5 minutes!
              </p>
            </div>
          </div>
          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-16 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className={`relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group transform ${statsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
              }`} style={{ transitionDelay: '100ms' }}>
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#124090]/10 to-transparent rounded-bl-full animate-pulse"></div>
              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl font-black text-[#124090] mb-1 transition-all duration-700 transform group-hover:scale-110">{totalLocations}</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Total Locations</div>
              </div>
            </div>
            <div className={`relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group transform ${statsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
              }`} style={{ transitionDelay: '200ms' }}>
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#FADC58]/20 to-transparent rounded-bl-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl font-black text-[#C79F2B] mb-1 transition-all duration-700 transform group-hover:scale-110">{shoppingLocations.nsw.length}</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">NSW Locations</div>
              </div>
            </div>
            <div className={`relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group transform ${statsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
              }`} style={{ transitionDelay: '300ms' }}>
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#124090]/10 to-transparent rounded-bl-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl font-black text-[#124090] mb-1 transition-all duration-700 transform group-hover:scale-110">{shoppingLocations.sa.length}</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">SA Locations</div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className={`mb-6 sm:mb-8 transition-all duration-700 ${searchVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
            }`} style={{ transitionDelay: '400ms' }}>
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#FADC58]/10 to-transparent rounded-bl-full"></div>

              {/* Search Input */}
              <div className="relative mb-4 sm:mb-6">
                <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 group-hover:text-[#C79F2B] group-hover:scale-110">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C79F2B] focus:border-[#C79F2B] transition-all duration-300 text-sm sm:text-base text-gray-900 placeholder-gray-400 font-medium"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={() => setSelectedState(null)}
                  className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 ${selectedState === null
                      ? "bg-gradient-to-r from-[#124090] to-[#3065C5] border-transparent text-white shadow-lg"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#FADC58] hover:text-[#124090]"
                    }`}
                >
                  All Locations
                </button>
                <button
                  onClick={() => setSelectedState("nsw")}
                  className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 ${selectedState === "nsw"
                      ? "bg-gradient-to-r from-[#FADC58] to-[#C79F2B] border-transparent text-[#124090] shadow-lg"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#FADC58] hover:text-[#124090]"
                    }`}
                >
                  NSW ({shoppingLocations.nsw.length})
                </button>
                <button
                  onClick={() => setSelectedState("sa")}
                  className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 ${selectedState === "sa"
                      ? "bg-gradient-to-r from-[#FADC58] to-[#C79F2B] border-transparent text-[#124090] shadow-lg"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#FADC58] hover:text-[#124090]"
                    }`}
                >
                  SA ({shoppingLocations.sa.length})
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8 transition-all duration-700 ease-in-out">
            {/* Locations Grid */}
            <div className={`transition-all duration-700 ${locationsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`} style={{ transitionDelay: "600ms" }}>
              <div className="mb-3 sm:mb-5 flex items-center justify-between">
                <h2 className={`text-xl sm:text-2xl font-black text-[#124090] transition-all duration-500 uppercase tracking-tight flex items-center gap-2 ${locationsVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`} style={{ transitionDelay: "700ms" }}>
                  <MapPin className="w-6 h-6 text-[#C79F2B]" />
                  {filteredLocations.length} Locations Found
                </h2>
              </div>

              <div className="space-y-3 sm:space-y-4 max-h-[600px] sm:max-h-[700px] md:max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {filteredLocations.length === 0 ? (
                  <div className={`relative bg-gray-50 rounded-2xl p-12 border border-gray-200 text-center transition-all duration-700 ${locationsVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`} style={{ transitionDelay: "800ms" }}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-md flex items-center justify-center animate-bounce">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">No locations found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  filteredLocations.map((location, idx) => {
                    const isSelected = selectedLocation?.name === location.name;
                    const isSA = shoppingLocations.sa.some(loc => loc.name === location.name);

                    return (
                      <div
                        key={idx}
                        onClick={() => handleLocationClick(location)}
                        className={`group relative bg-white rounded-xl sm:rounded-2xl p-5 border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${isSelected
                            ? "border-[#FADC58] shadow-xl bg-orange-50/10 ring-1 ring-[#FADC58]/50"
                            : "border-transparent hover:border-[#FADC58]/30 shadow-md"
                          }`}
                        style={{
                          animationDelay: `${800 + (idx * 50)}ms`,
                          opacity: locationsVisible ? 1 : 0,
                          transform: locationsVisible ? 'translateY(0) translateX(0)' : 'translateY(20px) translateX(-20px)',
                          transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${800 + (idx * 50)}ms`
                        }}
                      >
                        {/* Gradient accent */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${isSelected ? 'from-[#FADC58]/20' : 'from-[#124090]/5'
                          } to-transparent rounded-bl-full transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

                        <div className="relative z-10 flex items-start gap-4">
                          {/* Icon */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 ${isSelected
                              ? "bg-gradient-to-br from-[#FADC58] to-[#C79F2B] scale-110 rotate-3"
                              : "bg-gradient-to-br from-white to-gray-50 border border-gray-100 group-hover:from-[#FADC58] group-hover:to-[#C79F2B] group-hover:border-transparent group-hover:scale-110 group-hover:rotate-3"
                            }`}>
                            <Store className={`w-6 h-6 transition-all duration-300 ${isSelected ? "text-[#124090]" : "text-[#124090] group-hover:text-[#124090]"}`} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className={`text-base sm:text-lg font-bold transition-all duration-300 ${isSelected
                                  ? "text-[#124090]"
                                  : "text-gray-900 group-hover:text-[#124090]"
                                }`}>
                                {location.name}
                              </h3>
                              {isSelected && (
                                <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-[#124090] text-white">
                                  SELECTED
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-3 font-medium">{location.address}</p>

                            {/* Badge */}
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${isSA
                                  ? "bg-blue-50 text-blue-700 border border-blue-100"
                                  : "bg-purple-50 text-purple-700 border border-purple-100"
                                }`}>
                                {isSA ? "SA" : "NSW"}
                              </span>
                              <span className="text-xs text-gray-400 font-medium group-hover:text-[#C79F2B] transition-colors flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                Click to view map
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Map Section */}
            <div className="transition-all duration-700 ease-in-out opacity-100 translate-x-0 scale-100"
              style={{
                transitionDelay: "100ms",
                animation: "fadeInMap 0.8s ease-out 0.1s both"
              }}>
              <div className="lg:sticky lg:top-8">
                <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl border-4 border-white overflow-hidden h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] group transition-all duration-500 animate-fade-in ring-1 ring-gray-200">
                  {/* Map Header */}
                  <div className="relative z-10 p-4 border-b border-gray-100 bg-white/95 backdrop-blur-sm flex justify-between items-center shadow-sm">
                    <h3 className="text-base sm:text-lg font-black text-[#124090] flex items-center gap-2">
                      <Navigation className="w-5 h-5 text-[#C79F2B]" />
                      Interactive Map
                    </h3>
                    {selectedLocation && (
                      <button
                        onClick={() => {
                          setMapCenter([-33.8688, 151.2093]);
                          setMapZoom(11);
                          setSelectedLocation(null);
                        }}
                        className="px-3 py-1 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500 rounded-lg text-xs font-bold transition-all duration-300"
                      >
                        Reset View
                      </button>
                    )}
                  </div>

                  {/* Map Container */}
                  <div className="w-full h-[calc(100%-60px)] relative z-0">
                    {!mapLoaded && (
                      <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center z-10">
                        <span className="text-gray-400 font-medium">Loading Map...</span>
                      </div>
                    )}

                    <MapContainer
                      center={mapCenter}
                      zoom={mapZoom}
                      style={{ height: "100%", width: "100%" }}
                      scrollWheelZoom={true}
                    >
                      <MapController center={mapCenter} zoom={mapZoom} />
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {filteredLocations.map((location, idx) => {
                        const isSelected = selectedLocation?.name === location.name;
                        return (
                          <Marker
                            key={idx}
                            position={[location.lat, location.lng]}
                            eventHandlers={{
                              click: () => handleLocationClick(location),
                              mouseover: (e) => e.target.openPopup(),
                            }}
                          >
                            <Popup className="custom-popup">
                              <div className="p-2 min-w-[200px]">
                                <h3 className="font-bold text-[#124090] mb-1 text-base">
                                  {location.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                  {location.address}
                                </p>
                                {isSelected && (
                                  <div className="inline-block px-2 py-1 bg-[#FADC58] text-[#124090] rounded text-xs font-bold">
                                    Selected Location
                                  </div>
                                )}
                              </div>
                            </Popup>
                          </Marker>
                        );
                      })}
                    </MapContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info CTA */}
          <div className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
            }`} style={{ transitionDelay: "1000ms" }}>
            <div className="relative bg-gradient-to-br from-[#124090] to-[#1e3a8a] rounded-xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 border border-[#124090] overflow-hidden group hover:scale-[1.01] transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-bl-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FADC58]/10 rounded-tr-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#FADC58] to-[#C79F2B] flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 text-[#124090]" />
                </div>

                <h3 className="text-2xl sm:text-4xl font-black text-white mb-4">
                  Visit Us & <span className="text-[#FADC58]">Create Magic</span>
                </h3>

                <p className="text-base sm:text-xl text-blue-100/90 leading-relaxed max-w-2xl mx-auto mb-8 font-light">
                  Visit any of our vending machine locations to create your custom phone case in just 4-5 minutes! Simply scan the QR code, upload your image, and watch your personalized case come to life.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white font-bold text-sm">
                    <Clock className="w-4 h-4 text-[#FADC58]" />
                    Ready in 5 Minutes
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-[#FADC58]" />
                    High Quality Print
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;

// Helper component for icon
function Sparkles({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  )
}
