"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Trophy, MapPin, Users, ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-lime-400 selection:text-black">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-lime-400 fill-lime-400/20" />
            <span className="text-2xl font-bold tracking-tighter">SQUADUP</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#leagues" className="hover:text-white transition-colors">
              Leagues
            </a>
            <a href="#admin" className="hover:text-white transition-colors">
              Organizers
            </a>
          </div>
          <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-lime-400 transition-colors">
            Get the App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-lime-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-lime-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              NOW LIVE IN TORONTO
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              PLAY LIKE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
                A PRO.
              </span>
            </h1>
            <p className="text-lg text-neutral-400 mb-8 max-w-md leading-relaxed">
              Join local leagues, book premium venues, and manage your squad—all
              in one app. The ultimate concierge for recreational sports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 bg-lime-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-lime-300 transition-transform hover:scale-105 active:scale-95">
                Download for iOS
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 transition-colors">
                Organizer Login
              </button>
            </div>
          </motion.div>

          {/* Phone Mockup Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
              <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
              <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-full h-full bg-neutral-900 flex flex-col items-center justify-center relative">
                {/* This is where your App Screenshot goes */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black flex items-center justify-center">
                  <Shield className="w-24 h-24 text-lime-400 opacity-20" />
                  <p className="absolute bottom-10 text-neutral-500 text-xs uppercase tracking-widest">
                    SquadUp iOS
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">EVERYTHING YOU NEED</h2>
            <p className="text-neutral-400">
              Built for Captains, League Commissioners, and Athletes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MapPin className="text-lime-400" />}
              title="Venue Booking"
              desc="Access exclusive courts and fields across the GTA. Book instantly."
            />
            <FeatureCard
              icon={<Trophy className="text-purple-400" />}
              title="League Management"
              desc="Automated schedules, live standings, and seamless payments."
            />
            <FeatureCard
              icon={<Users className="text-blue-400" />}
              title="Squad Roster"
              desc="Manage your team, track stats, and split fees automatically."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-lime-400" />
            <span className="font-bold text-lg">SQUADUP</span>
          </div>
          <p className="text-neutral-500 text-sm">
            © 2026 SquadUp Inc. Toronto, Canada.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-lime-400/30 transition-colors group">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-neutral-400 leading-relaxed">{desc}</p>
    </div>
  );
}
