"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Shield, Zap } from "lucide-react";

export default function MarketingPage() {
  return (
    // Removed "min-h-screen" because the Layout handles height now
    <div className="flex flex-col bg-zinc-950 text-white selection:bg-lime-400 selection:text-black">
      {/* --- DELETED NAVBAR SECTION FROM HERE --- */}

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 space-y-8 mt-12 mb-24 pt-10">
        <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 backdrop-blur">
          <span className="flex h-2 w-2 rounded-full bg-lime-400 mr-2 animate-pulse"></span>
          Season 2026 is Live
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight max-w-4xl">
          MANAGE YOUR SQUAD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-600">
            LIKE A PRO.
          </span>
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          The all-in-one platform for pickup games, league management, and venue
          booking. Stop using spreadsheets. Start winning.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link href="/register">
            <Button className="h-12 px-8 text-lg bg-white text-black hover:bg-zinc-200 rounded-full font-bold">
              Get Started
            </Button>
          </Link>
          <Button
            variant="outline"
            className="h-12 px-8 text-lg border-zinc-800 text-white hover:bg-zinc-900 rounded-full"
          >
            Download for iOS
          </Button>
        </div>

        {/* Feature Grid */}
        <div
          id="features"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl w-full text-left"
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

      {/* --- DELETED FOOTER SECTION (It's now global in layout.tsx) --- */}
    </div>
  );
}

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
    <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-lime-400/50 transition duration-300 group">
      <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4 text-lime-400 group-hover:scale-110 transition">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  );
}
