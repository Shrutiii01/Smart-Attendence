// src/pages/Login.jsx
import React, { useState } from "react";
import authIllustration from "./img2/img2.png";
import { supabase } from "../../supabase/supabase.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      setErrorMsg("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setSuccessMsg("Login successful!");
      // ✅ Redirect to EmployeeDashboard after successful login
      navigate("/employee-dashboard");
    } catch (err) {
      setErrorMsg(err.message || "Error logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    resetMessages();

    if (!email) {
      setErrorMsg("Please enter your email first.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // 👇 change this to whatever route you will handle password update on
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccessMsg(
        "Password reset link sent to your email. Please check your inbox."
      );
    } catch (err) {
      setErrorMsg(
        err.message || "Error sending reset link. Please try again later."
      );
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
            <h1 className="text-3xl font-bold leading-snug">
              Welcome to SmartAttend
            </h1>
            <p className="mt-4 text-sm text-blue-100 max-w-sm">
              Login to track attendance, apply leave, and access your dashboard.
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
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-slate-900">Login</h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter your credentials to continue.
            </p>
          </div>

          {/* Status messages */}
          {(errorMsg || successMsg) && (
            <div className="mb-4 text-sm">
              {errorMsg && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-red-700 border border-red-100">
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

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="mt-1 text-xs font-medium text-blue-600 hover:text-blue-500"
                  disabled={loading}
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition disabled:opacity-60"
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
