"use client";

import React, { useEffect, useState } from "react";
import { Store, ShieldCheck, Sparkles } from "lucide-react";

interface SplashScreenProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export function SplashScreen({
  onComplete,
  minDurationMs = 1800,
}: SplashScreenProps) {
  const [progress, setProgress] = useState(10);
  const [statusText, setStatusText] = useState("Menginisialisasi modul POS...");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1. Stage Progress Sequence
    const timer1 = setTimeout(() => {
      setProgress(40);
      setStatusText("Memeriksa sesi & isolasi workspace...");
    }, minDurationMs * 0.25);

    const timer2 = setTimeout(() => {
      setProgress(75);
      setStatusText("Menyiapkan katalog & mesin kasir...");
    }, minDurationMs * 0.6);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText("Selamat datang di &Stok!");
    }, minDurationMs * 0.85);

    // 2. Trigger Fade-out and onComplete
    const finishTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 350); // duration of fade out
    }, minDurationMs);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(finishTimer);
    };
  }, [minDurationMs, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-slate-950 text-slate-100 font-sans select-none transition-opacity duration-300 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Bar Spacer */}
      <div className="w-full flex items-center justify-between max-w-sm pt-4 opacity-40">
        <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OmniPOS Engine</span>
        </div>
        <div className="text-[11px] font-mono text-zinc-400">v2.0</div>
      </div>

      {/* Center Branding Content */}
      <div className="relative flex flex-col items-center text-center space-y-6 my-auto">
        {/* Animated Glowing Logo */}
        <div className="relative">
          {/* Outer Pulsing Rings */}
          <div className="absolute -inset-3 bg-emerald-500/20 rounded-3xl blur-md animate-ping opacity-30" />
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-3xl opacity-40 blur-sm" />

          {/* Logo Card */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-emerald-500/40 shadow-2xl flex items-center justify-center text-emerald-400 transition-transform duration-500 scale-100 hover:scale-105">
            <Store className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-white drop-shadow-sm">
            &Stok
          </h1>
          <p className="text-xs sm:text-sm font-medium text-zinc-400 tracking-wide max-w-xs">
            Multi-Business OmniPOS & Isolated Tenant System
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-72 space-y-2.5 pt-4">
          <div className="h-1.5 w-full bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(16,185,129,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status Label */}
          <div className="flex items-center justify-between text-[11px] font-medium text-zinc-400">
            <span className="animate-pulse">{statusText}</span>
            <span className="font-mono text-emerald-400">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Security Badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/80 text-[11px] text-zinc-400 mb-4 shadow-lg backdrop-blur-sm">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Enterprise Multi-Tenant & Dual Persistence</span>
      </div>
    </div>
  );
}
