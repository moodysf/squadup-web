"use client";

import Link from "next/link";
import { MapPin, Trophy, Activity, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PlayPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-black italic text-white tracking-tighter">
          GAME<span className="text-lime-400">TIME</span>
        </h1>
        <p className="text-zinc-400 text-lg">What are we playing today?</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* 1. Book Venue */}
        <PlayOption
          href="/dashboard/book"
          icon={MapPin}
          title="Book a Venue"
          desc="Find pitches, courts, and fields available near you."
          color="text-green-400"
          bg="hover:border-green-400/50"
        />

        {/* 2. Join Drop-in */}
        <PlayOption
          href="/dashboard/pickup"
          icon={Activity}
          title="Join Drop-in"
          desc="Find a game that needs players. No squad required."
          color="text-blue-400"
          bg="hover:border-blue-400/50"
        />

        {/* 3. Join League */}
        <PlayOption
          href="/dashboard/leagues"
          icon={Trophy}
          title="Join a League"
          desc="Register your squad or join as a free agent."
          color="text-yellow-400"
          bg="hover:border-yellow-400/50"
        />
      </div>
    </div>
  );
}

function PlayOption({ href, icon: Icon, title, desc, color, bg }: any) {
  return (
    <Link href={href} className="group">
      <Card
        className={`h-full bg-zinc-900 border-zinc-800 transition-all duration-300 ${bg} group-hover:-translate-y-1`}
      >
        <CardContent className="p-8 flex flex-col h-full">
          <div
            className={`w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 ${color}`}
          >
            <Icon className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 italic">{title}</h3>
          <p className="text-zinc-400 mb-8 flex-1">{desc}</p>

          <div
            className={`flex items-center text-sm font-bold uppercase tracking-wider ${color}`}
          >
            Let's Go{" "}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
