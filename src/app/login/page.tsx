"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase"; // Ensure this path matches your file
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Google Login Handler
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard"); // Redirects on success
    } catch (err: any) {
      console.error(err);
      setError("Google Sign-In failed. Please try again.");
    }
    setLoading(false);
  };

  // 2. Email Login Handler
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      // Firebase error codes are ugly, let's make them readable
      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0D0D14] p-4">
      <div className="w-full max-w-md bg-[#1A1A24] p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Neon Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D0FF00] opacity-10 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2 italic tracking-tighter">
            SQUAD<span className="text-[#D0FF00]">UP</span>
          </h1>
          <p className="text-gray-400 text-sm">Welcome back, Captain.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {/* Google Button (Primary) */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white text-black font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 mb-6"
        >
          {loading ? (
            <span className="text-sm">CONNECTING...</span>
          ) : (
            <>
              {/* Google G Logo SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase">
            Or with Email
          </span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full bg-[#0D0D14] border border-gray-700 text-white p-3 rounded-lg focus:border-[#D0FF00] focus:outline-none transition-colors"
              placeholder="coach@squadup.cc"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full bg-[#0D0D14] border border-gray-700 text-white p-3 rounded-lg focus:border-[#D0FF00] focus:outline-none transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-transparent border border-[#D0FF00] text-[#D0FF00] font-bold py-3 rounded-lg hover:bg-[#D0FF00] hover:text-black transition-colors mt-2"
          >
            LOG IN
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          Don't have an account? <br /> Download the iOS app to create one.
        </p>
      </div>
    </main>
  );
}
