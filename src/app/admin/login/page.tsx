"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // The user is signed in. Firebase auth state will be automatically persisted in indexedDB/localStorage by the SDK.
      // We also need to set a cookie so the Next.js middleware can read it on the server and allow access.
      // In a real production app with advanced security, you would use Firebase Admin SDK to verify the token,
      // but for this MVP, setting a simple cookie indicator is a fast way to sync state for the middleware.
      const token = await userCredential.user.getIdToken();
      document.cookie = `admin_token=${token}; path=/; max-age=3600; SameSite=Strict; Secure`;

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="flex flex-col items-center">
          <Image
            src="/img/1.png"
            alt="Winbarg Homes Logo"
            width={160}
            height={56}
            className="h-14 w-auto object-contain mb-4"
          />
          <h2 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
            Admin Portal
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Sign in to manage the website content
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email Address</label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12"
              placeholder="admin@winbarghomes.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#1A3D7C] hover:bg-[#15305F] text-white font-bold text-base"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
