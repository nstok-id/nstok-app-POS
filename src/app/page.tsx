"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { SplashScreen } from "@/components/SplashScreen";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [isReadyToRedirect, setIsReadyToRedirect] = useState(false);

  const handleSplashComplete = () => {
    setIsReadyToRedirect(true);
    if (isAuthenticated && user) {
      if (!user.hasCompletedOnboarding) {
        router.replace("/business-select");
      } else {
        router.replace("/pos");
      }
    } else {
      router.replace("/login");
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-950">
      <SplashScreen onComplete={handleSplashComplete} minDurationMs={1800} />
    </main>
  );
}
