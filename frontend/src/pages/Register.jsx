import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import { User, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, Check, X } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false, password: false });
  const [validationErrors, setValidationErrors] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Name validation
  const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (name.length > 50) return "Name must be less than 50 characters";
    return "";
  };

  // Email validation with disposable email check
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // List of common disposable/temporary email domains
    const disposableDomains = [
      'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com',
      '10minutemail.com', 'temp-mail.org', 'fakeinbox.com', 'trashmail.com',
      'getnada.com', 'maildrop.cc', 'yopmail.com', 'emailondeck.com',
      'sharklasers.com', 'guerrillamailblock.com', 'spam4.me', 'tempr.email'
    ];

    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";

    // Check for disposable email
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && disposableDomains.includes(domain)) {
      return "Temporary email addresses are not accepted. Please use an original email.";
    }

    return "";
  };

  // Password validation with requirements
  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  // Password strength checker 
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^a-zA-Z0-9]/.test(password)
    };

    if (password.length >= 6) strength++;
    if (checks.length) strength++;
    if (checks.lowercase && checks.uppercase) strength++;
    if (checks.number) strength++;
    if (checks.special) strength++;

    if (strength <= 2) return { strength: 1, label: "Weak", color: "bg-rose-500", checks };
    if (strength <= 3) return { strength: 2, label: "Fair", color: "bg-amber-500", checks };
    if (strength <= 4) return { strength: 3, label: "Good", color: "bg-blue-500", checks };
    return { strength: 4, label: "Strong", color: "bg-emerald-500", checks };
  };

  const passwordStrength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time validation
    if (touched[name]) {
      if (name === "name") {
        setValidationErrors({ ...validationErrors, name: validateName(value) });
      } else if (name === "email") {
        setValidationErrors({ ...validationErrors, email: validateEmail(value) });
      } else if (name === "password") {
        setValidationErrors({ ...validationErrors, password: validatePassword(value) });
      }
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });

    if (field === "name") {
      setValidationErrors({ ...validationErrors, name: validateName(form.name) });
    } else if (field === "email") {
      setValidationErrors({ ...validationErrors, email: validateEmail(form.email) });
    } else if (field === "password") {
      setValidationErrors({ ...validationErrors, password: validatePassword(form.password) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(form.name);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);

    setValidationErrors({ name: nameError, email: emailError, password: passwordError });
    setTouched({ name: true, email: true, password: true });

    if (nameError || emailError || passwordError) {
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await registerUser(form);
      login(data);
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response) {
        const errorMessage = err.response.data?.message || `Error: ${err.response.status} ${err.response.statusText}`;
        setError(errorMessage);
      } else if (err.request) {
        setError("Unable to connect to server. Please check if the backend is running on port 5000.");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fast password generator
  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setForm({ ...form, password });
    setTouched({ ...touched, password: true });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#124090]/10 to-transparent -z-10" />

      <div className="w-full max-w-md">
        <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 sm:p-10">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black text-[#124090] tracking-tight">Create Account</h1>
            <p className="mt-3 text-slate-500 font-medium">Start crafting your custom masterpieces</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-slate-600 flex items-center gap-2 px-1">
                <User className="w-4 h-4 text-[#FFC107]" /> Full Name
              </label>
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  className={`w-full rounded-2xl border-2 bg-slate-50/50 px-5 py-4 text-slate-700 transition-all focus:bg-white outline-none ${validationErrors.name && touched.name
                    ? "border-rose-100 focus:border-rose-400"
                    : "border-slate-100 focus:border-[#FFC107]"
                    }`}
                  required
                />
                {touched.name && !validationErrors.name && form.name && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <Check className="h-5 w-5 text-emerald-500" />
                  </div>
                )}
              </div>
              {validationErrors.name && touched.name && (
                <p className="px-1 flex items-center gap-1 text-xs font-bold text-rose-500 uppercase tracking-wider">
                  <X className="h-3 w-3" />
                  {validationErrors.name}
                </p>
              )}
            </div>

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
                <button
                  type="button"
                  onClick={generatePassword}
                  className="text-xs font-bold text-[#124090] hover:text-[#FFC107] transition-colors"
                >
                  Generate Strong
                </button>
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

              {/* Password Requirements Checklist (Simplified/Modernized) */}
              {form.password && touched.password && (
                <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Strength: {passwordStrength.label}</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`h-1 w-6 rounded-full transition-all ${step <= passwordStrength.strength ? passwordStrength.color : "bg-slate-200"
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                    {[
                      { key: 'length', text: '8+ chars' },
                      { key: 'lowercase', text: 'Lowercase' },
                      { key: 'uppercase', text: 'Uppercase' },
                      { key: 'number', text: 'Number' },
                      { key: 'special', text: 'Symbol' }
                    ].map((req) => (
                      <div
                        key={req.key}
                        className={`flex items-center gap-1.5 text-[10px] font-bold ${passwordStrength.checks?.[req.key] || (req.key === 'lowercase' && passwordStrength.checks?.lowercase) || (req.key === 'uppercase' && passwordStrength.checks?.uppercase)
                          ? "text-emerald-600" : "text-slate-400"
                          }`}
                      >
                        <div className={`h-1.5 w-1.5 rounded-full ${passwordStrength.checks?.[req.key] || (req.key === 'lowercase' && passwordStrength.checks?.lowercase) || (req.key === 'uppercase' && passwordStrength.checks?.uppercase)
                          ? "bg-emerald-500" : "bg-slate-300"
                          }`} />
                        {req.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-[#124090] hover:text-[#FFC107] transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <p className="mt-8 text-center text-xs text-slate-400 font-medium">
          By creating an account, you agree to our <a href="#" className="underline hover:text-slate-600">Terms of Service</a> and <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Register;