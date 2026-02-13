"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Shield, Zap, Smartphone } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="flex flex-col bg-zinc-950 text-white selection:bg-lime-400 selection:text-black">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 space-y-8 mt-12 mb-24 pt-10">
        {/* Season Badge */}
        <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 backdrop-blur">
          <span className="flex h-2 w-2 rounded-full bg-lime-400 mr-2 animate-pulse"></span>
          Season 2026 is Live
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter max-w-5xl leading-[0.9]">
          MANAGE YOUR SQUAD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500">
            LIKE A PRO.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-medium">
          The all-in-one platform for pickup games, league management, and venue
          booking. Stop using spreadsheets. Start winning.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 w-full justify-center">
          {/* 1. GET STARTED (Sign Up) */}
          <Link href="/register">
            <Button className="h-14 px-10 text-lg font-bold bg-lime-400 text-black hover:bg-lime-500 rounded-full transition-transform hover:scale-105">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          {/* 2. DOWNLOAD FOR iOS */}
          <Link href="https://apps.apple.com" target="_blank">
            <Button
              variant="outline"
              className="h-14 px-10 text-lg font-bold border-zinc-700 text-white hover:bg-zinc-800 hover:text-white rounded-full"
            >
              <Smartphone className="mr-2 w-5 h-5" /> Download for iOS
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div
          id="features"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl w-full text-left"
        >
          <FeatureCard
            icon={Zap}
            title="Instant Booking"
            desc="Find open pitches and courts near you. Book in seconds."
          />
          <FeatureCard
            icon={Shield}
            title="Squad Management"
            desc="Rosters, payments, and stats. Keep your team in sync."
          />
          <FeatureCard
            icon={Trophy}
            title="League Play"
            desc="Join competitive leagues, track standings, and climb the leaderboard."
          />
        </div>
      </main>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80 hover:border-lime-400/30 transition-all duration-300 group">
      <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 text-lime-400 group-hover:scale-110 transition-transform group-hover:bg-zinc-800/80 group-hover:text-lime-300">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-2xl font-black italic mb-3 text-white tracking-tight uppercase font-sans">
        {title}
      </h3>
      <p className="text-zinc-400 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
