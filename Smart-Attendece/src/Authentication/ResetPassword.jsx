// src/pages/ResetPassword.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase.js";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [checkingLink, setCheckingLink] = useState(true);
  const [sessionValid, setSessionValid] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const resetMessages = () => {
    setErrorMsg("");
    setSuccessMsg("");
  };

  // 🔍 Check that the reset link created a valid Supabase session
  useEffect(() => {
    async function checkSession() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session) {
          setSessionValid(false);
          setErrorMsg(
            "This password reset link is invalid or has expired. Please request a new one."
          );
        } else {
          setSessionValid(true);
        }
      } catch (err) {
        console.error("Reset link check failed:", err);
        setSessionValid(false);
        setErrorMsg(
          "Unable to verify the reset link. Please request a new password reset email."
        );
      } finally {
        setCheckingLink(false);
      }
    }

    checkSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!password || !confirmPassword) {
      setErrorMsg("Please enter and confirm your new password.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Password should be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      setSuccessMsg("Password updated successfully. You can now log in.");
      // Optional redirect after a short delay
      setTimeout(() => {
        navigate("/"); // or "/login" if you have a specific login route
      }, 1500);
    } catch (err) {
      console.error("Error updating password:", err);
      setErrorMsg(
        err.message || "Something went wrong while updating your password."
      );
    } finally {
      setLoading(false);
    }
  };

  // While checking/reset link validity
  if (checkingLink) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 text-center">
          <p className="text-sm text-slate-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  // If the link is invalid/expired
  if (!sessionValid) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 text-center space-y-4">
          <h1 className="text-lg font-semibold text-slate-900">
            Password Reset Link Error
          </h1>
          {errorMsg && (
            <p className="text-sm text-red-600 leading-relaxed">{errorMsg}</p>
          )}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full bg-blue-600 text-white hover:bg-blue-500"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Normal reset form when session is valid
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-[26px] bg-white shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_24px_80px_rgba(15,23,42,0.25)] overflow-hidden">
        <div className="px-6 py-7 sm:px-8 sm:py-9">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Set New Password
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter your new password below to complete the reset.
            </p>
          </div>

          {(errorMsg || successMsg) && (
            <div className="mb-4 text-sm space-y-2">
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

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 w-full text-center text-xs text-slate-500 hover:text-slate-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
