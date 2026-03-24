import { Link } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";

const Success = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-[#124090]/10 to-transparent -z-10" />

      <div className="w-full max-w-2xl text-center">
        <div className="bg-white rounded-[40px] p-8 sm:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center">
          {/* Success Icon */}
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-[#FFC107]/20 rounded-full blur-2xl transform scale-150 animate-pulse" />
            <div className="relative h-24 w-24 bg-[#FFC107] rounded-full flex items-center justify-center shadow-xl shadow-[#FFC107]/30">
              <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Text Content */}
          <h1 className="text-4xl sm:text-5xl font-black text-[#124090] tracking-tight mb-6">
            Order Received!
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-md mx-auto mb-10 leading-relaxed">
            Your custom design is now in our hands. Our team will review it shortly to ensure the highest print quality.
          </p>

          {/* Info Card */}
          <div className="w-full bg-[#124090]/5 rounded-3xl p-6 mb-12 flex items-start gap-4 text-left">
            <div className="h-10 w-10 bg-[#124090] rounded-xl flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-[#124090]">What's next?</h3>
              <p className="text-sm text-slate-500 mt-1">
                You'll receive an email confirmation with tracking details as soon as your masterpiece ships.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#124090] px-8 py-4 text-white font-bold transition-all hover:bg-[#124090]/90 active:scale-95 shadow-lg shadow-[#124090]/20"
            >
              <Home className="w-5 h-5" />
              Return Home
            </Link>
            <Link
              to="/designer"
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#FFC107] px-8 py-4 text-white font-bold transition-all hover:bg-[#FFC107]/90 active:scale-95 shadow-lg shadow-[#FFC107]/20"
            >
              <ArrowRight className="w-5 h-5" />
              Design Another
            </Link>
          </div>
        </div>

        {/* Support Link */}
        <p className="mt-8 text-slate-400 font-medium">
          Need help? <Link to="/contact" className="text-[#124090] font-bold hover:underline">Contact our support team</Link>
        </p>
      </div>
    </div>
  );
};

export default Success;

