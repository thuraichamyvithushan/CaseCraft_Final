import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { saveOrder } from "../api/orderApi.js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Trash2,
  Lock,
  ChevronRight,
  TrendingUp
} from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePaymentForm = ({ amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    try {
      const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000/api" : "/api");

      const { data } = await axios.post(
        `${BASE_URL}/create-payment-intent`,
        {
          amount: Math.round(amount * 100),
          currency: "usd",
        }
      );

      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        setMessage("Payment successful!");
        onPaymentSuccess();
      }
    } catch (err) {
      console.error(err);
      setMessage("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6 p-4 rounded-2xl bg-[#124090]/5 border border-[#124090]/10">
      <div className="space-y-3">
        <label className="text-sm font-semibold text-[#124090]">Card Details</label>
        <div className="p-4 bg-white rounded-xl border border-slate-200 focus-within:border-[#FFC107] transition-colors shadow-sm">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#124090',
                  '::placeholder': { color: '#94a3b8' },
                },
              }
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#FFC107] px-6 py-4 text-white font-bold text-lg shadow-lg hover:bg-[#FFC107]/90 active:scale-95 disabled:opacity-60 transition-all"
      >
        <Lock className="w-5 h-5" />
        {loading ? "Processing..." : `Pay Securely $${amount}`}
      </button>

      {message && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2">
          <p className="text-sm text-red-600 font-medium">{message}</p>
        </div>
      )}

      <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
        <Lock className="w-3 h-3" />
        <span>Encrypted and Secure Payment</span>
      </div>
    </form>
  );
};

const Checkout = () => {
  const { items, clear, removeItem, total } = useCart();
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!items || items.length === 0) navigate("/");
  }, [items, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) || 1 : value,
    }));
  };

  const adjustedTotal = total * form.quantity;

  const handlePaymentSuccess = async () => {
    if (!isAuthenticated) {
      setStatus("Please login to place your order.");
      navigate("/login");
      return;
    }

    try {
      const payloadItems = items.map((i) => ({
        productName: i.productName,
        productId: i.productId,
        designImage: i.designImage,
        templateImage: i.templateImage || "",
        userCustomImage: i.userCustomImage || "",
        customText: i.customText || "",
        price: i.price || 0,
        quantity: form.quantity,
        category: i.category || "phone_case"
      }));

      await saveOrder(
        {
          items: payloadItems,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          total: adjustedTotal,
        },
        token
      );

      clear();
      navigate("/success");
    } catch (error) {
      console.error(error);
      setStatus(error.response?.data?.message || "Unable to place order after payment");
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#124090]/10 to-transparent -z-10" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-16">
        <div className="mb-10 lg:mb-16">
          <div className="flex items-center gap-2 text-[#FFC107] font-bold text-sm uppercase tracking-wider mb-2">
            <ShoppingBag className="w-4 h-4" />
            <span>Secure Checkout</span>
          </div>
          <h1 className="text-4xl font-black text-[#124090] lg:text-6xl tracking-tight">Complete Your Order</h1>
          <p className="mt-4 text-slate-500 max-w-xl">
            Join thousands of happy customers who design their world with CaseCraft.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 sm:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#124090] text-white font-bold">1</div>
                <div>
                  <h2 className="text-2xl font-bold text-[#124090]">Shipping Information</h2>
                  <p className="text-sm text-slate-400">Where should we send your masterpiece?</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                      <User className="w-4 h-4" /> Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Jane Doe"
                      value={form.fullName}
                      onChange={handleChange}
                      className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-5 py-4 text-slate-700 transition-all focus:border-[#FFC107] focus:bg-white outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-5 py-4 text-slate-700 transition-all focus:border-[#FFC107] focus:bg-white outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 00000 00000"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-5 py-4 text-slate-700 transition-all focus:border-[#FFC107] focus:bg-white outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      value={form.quantity}
                      onChange={handleChange}
                      className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-5 py-4 text-slate-700 transition-all focus:border-[#FFC107] focus:bg-white outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Comprehensive Address
                  </label>
                  <textarea
                    name="address"
                    placeholder="Provide detailed shipping address..."
                    value={form.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-5 py-4 text-slate-700 transition-all focus:border-[#FFC107] focus:bg-white outline-none resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 sm:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#124090] text-white font-bold">2</div>
                <div>
                  <h2 className="text-2xl font-bold text-[#124090]">Secure Payment</h2>
                  <p className="text-sm text-slate-400">Complete your transaction safely</p>
                </div>
              </div>

              {status && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100">
                  <p className="text-sm text-red-600 font-medium">{status}</p>
                </div>
              )}

              <div className="grid gap-8 lg:grid-cols-1">
                <Elements stripe={stripePromise}>
                  <StripePaymentForm amount={adjustedTotal} onPaymentSuccess={handlePaymentSuccess} />
                </Elements>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-[#124090]">Order Summary</h2>
                  <span className="bg-[#124090]/10 text-[#124090] px-3 py-1 rounded-full text-xs font-bold">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((cartItem, idx) => (
                    <div
                      key={`${cartItem.productId}-${idx}`}
                      className="group flex gap-4 p-3 rounded-2xl border border-slate-50 hover:border-[#124090]/10 hover:bg-[#124090]/5 transition-all"
                    >
                      <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-slate-100">
                        <img
                          src={cartItem.designImage}
                          alt={cartItem.productName}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between py-1">
                        <div>
                          <p className="font-bold text-[#124090] text-sm leading-tight line-clamp-2">
                            {cartItem.productName}
                          </p>
                          <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                            Qty: {(cartItem.quantity || 1) * form.quantity}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-black text-[#FFC107] text-lg">$ {cartItem.price || 0}</p>
                          <button
                            onClick={() => removeItem(idx)}
                            className="p-2 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t-2 border-dashed border-slate-100 pt-8 space-y-4">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-700">$ {adjustedTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Shipping</span>
                    <span className="font-bold text-[#FFC107]">FREE</span>
                  </div>
                  <div className="flex justify-between items-end pt-2">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Grand Total</p>
                      <p className="text-4xl font-black text-[#124090] tracking-tighter">$ {adjustedTotal}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#124090] rounded-[32px] p-6 text-white overflow-hidden relative shadow-2xl shadow-[#124090]/40">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <p className="text-sm font-bold">100% Secure Checkout</p>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    We use military-grade encryption to ensure your personal & payment data is completely safe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}} />
    </div>
  );
};

export default Checkout;
