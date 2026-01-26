import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, Check, X } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [validationErrors, setValidationErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };



  // Password validation
  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time validation
    if (touched[name]) {
      if (name === "email") {
        setValidationErrors({ ...validationErrors, email: validateEmail(value) });
      } else if (name === "password") {
        setValidationErrors({ ...validationErrors, password: validatePassword(value) });
      }
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });

    if (field === "email") {
      setValidationErrors({ ...validationErrors, email: validateEmail(form.email) });
    } else if (field === "password") {
      setValidationErrors({ ...validationErrors, password: validatePassword(form.password) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);

    setValidationErrors({ email: emailError, password: passwordError });
    setTouched({ email: true, password: true });

    if (emailError || passwordError) {
      return;
    }

    setError("");
    setLoading(true);
    try {
      const data = await loginUser(form);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#124090]/10 to-transparent -z-10" />

      <div className="w-full max-w-md">
        <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 sm:p-10">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black text-[#124090] tracking-tight">Welcome Back</h1>
            <p className="mt-3 text-slate-500 font-medium">Please enter your details to sign in</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-slate-600 flex items-center gap-2 px-1">
                <Mail className="w-4 h-4 text-[#FFC107]" /> Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  className={`w-full rounded-2xl border-2 bg-slate-50/50 px-5 py-4 text-slate-700 transition-all focus:bg-white outline-none ${validationErrors.email && touched.email
                    ? "border-rose-100 focus:border-rose-400"
                    : "border-slate-100 focus:border-[#FFC107]"
                    }`}
                  required
                />
                {touched.email && !validationErrors.email && form.email && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <Check className="h-5 w-5 text-emerald-500" />
                  </div>
                )}
              </div>
              {validationErrors.email && touched.email && (
                <p className="px-1 flex items-center gap-1 text-xs font-bold text-rose-500 uppercase tracking-wider">
                  <X className="h-3 w-3" />
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label htmlFor="password" className="text-sm font-bold text-slate-600 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#FFC107]" /> Password
                </label>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur("password")}
                  className={`w-full rounded-2xl border-2 bg-slate-50/50 px-5 py-4 text-slate-700 transition-all focus:bg-white outline-none ${validationErrors.password && touched.password
                    ? "border-rose-100 focus:border-rose-400"
                    : "border-slate-100 focus:border-[#FFC107]"
                    }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-[#124090] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {validationErrors.password && touched.password && (
                <p className="px-1 flex items-center gap-1 text-xs font-bold text-rose-500 uppercase tracking-wider">
                  <X className="h-3 w-3" />
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-rose-500 flex-shrink-0" />
                <p className="text-sm font-bold text-rose-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#FFC107] px-6 py-4 text-white font-black text-lg shadow-xl shadow-[#FFC107]/20 hover:bg-[#FFC107]/90 active:scale-95 disabled:opacity-60 transition-all"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-10 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold tracking-widest">or</span></div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-sm font-medium text-slate-500">
                Don't have an account?{" "}
                <Link to="/register" className="font-bold text-[#124090] hover:text-[#FFC107] transition-colors">
                  Create Account
                </Link>
              </p>
              <Link to="/forgot-password" size="sm" className="text-xs font-bold text-slate-400 hover:text-[#124090] transition-colors">
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <p className="mt-8 text-center text-xs text-slate-400 font-medium">
          By signing in, you agree to our <a href="#" className="underline hover:text-slate-600">Terms of Service</a> and <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Login;