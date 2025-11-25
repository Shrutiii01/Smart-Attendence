// src/pages/Signup.jsx
import React, { useState } from "react";
import authIllustration from "./img2/img2.png"; // change path if your image is elsewhere
import { supabase } from "../../supabase/supabase.js";

export default function Signup() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const isLogin = mode === "login";

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [wantsUpdates, setWantsUpdates] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const resetMessages = () => {
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!email || !password) {
      setErrorMsg("Please fill in email and password.");
      return;
    }

    if (!isLogin && !acceptTerms) {
      setErrorMsg("Please accept the Terms & Policies to continue.");
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        // LOGIN FLOW
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // You can redirect using react-router if needed:
        // navigate("/dashboard");
        setSuccessMsg("Logged in successfully!");
      } else {
        // SIGNUP FLOW
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              company,
              wants_updates: wantsUpdates,
            },
          },
        });

        if (error) throw error;

        // Depending on your Supabase settings, email confirmation might be required
        setSuccessMsg(
          "Account created! Please check your email to verify your account."
        );
      }
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    resetMessages();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin, // or your dashboard route
        },
      });
      if (error) throw error;
      // Supabase will redirect on success
    } catch (err) {
      setErrorMsg(err.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl rounded-[26px] bg-white shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_24px_80px_rgba(15,23,42,0.25)] overflow-hidden flex flex-col lg:flex-row">
        {/* LEFT PANEL */}
        <div className="lg:w-1/2 bg-blue-600 text-white p-8 sm:p-10 flex flex-col justify-between gap-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
              {isLogin ? "Welcome Back to" : "Welcome to"} SmartAttend
            </h1>
            <p className="mt-4 text-sm sm:text-base text-blue-100 max-w-sm">
              Streamline your attendance, manage leaves efficiently, and boost
              team productivity with our all-in-one workforce solution.
            </p>
          </div>

          <div className="mt-6">
            <div className="rounded-[28px] bg-[#FFEFD0] px-6 py-5">
              <div className="rounded-[22px] bg-[#FDE5B5] overflow-hidden">
                <img
                  src={authIllustration}
                  alt="SmartAttend illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:w-1/2 bg-white px-6 sm:px-10 py-8 sm:py-10 flex flex-col justify-center">
          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  resetMessages();
                }}
                className={`px-5 py-1.5 text-sm font-medium rounded-full transition ${
                  isLogin
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  resetMessages();
                }}
                className={`px-5 py-1.5 text-sm font-medium rounded-full transition ${
                  !isLogin
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
              {isLogin ? "Sign In" : "Create your account"}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              {isLogin
                ? "Enter your details to access your dashboard."
                : "Enter your details to get started with SmartAttend."}
            </p>
          </div>

          {/* Status messages */}
          {(errorMsg || successMsg) && (
            <div className="mb-4 text-xs sm:text-sm">
              {errorMsg && (
                <div className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-red-700 border border-red-100">
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="rounded-lg bg-emerald-50 px-3 py-2 text-emerald-700 border border-emerald-100">
                  {successMsg}
                </div>
              )}
            </div>
          )}

          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="mx-auto mb-6 flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 sm:px-6 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition w-full max-w-xs disabled:opacity-60"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white border border-slate-200 text-[11px] font-bold text-[#4285F4]">
              G
            </span>
            <span>{loading ? "Please wait..." : "Continue with Google"}</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6 text-[11px] text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            <span>or use email</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Carter"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Your Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <div className="space-y-2 pt-1">
              <label className="flex items-start gap-2 text-[11px] text-slate-500">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 accent-blue-600"
                />
                <span>
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                  >
                    Terms
                  </button>
                  ,{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </button>{" "}
                  , and{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                  >
                    Code of Conduct
                  </button>
                  .
                </span>
              </label>

              <label className="flex items-start gap-2 text-[11px] text-slate-500">
                <input
                  type="checkbox"
                  checked={wantsUpdates}
                  onChange={(e) => setWantsUpdates(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 accent-blue-600"
                />
                <span>Send me important event updates on email.</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/40 hover:bg-blue-500 transition disabled:opacity-60"
            >
              {loading
                ? isLogin
                  ? "Signing in..."
                  : "Creating account..."
                : isLogin
                ? "Login"
                : "Create Account"}
            </button>
          </form>

          {/* Bottom toggle text */}
          <div className="mt-4 text-center text-[11px] sm:text-xs text-slate-500">
            {isLogin ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    resetMessages();
                  }}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    resetMessages();
                  }}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
