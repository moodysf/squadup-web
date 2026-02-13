"use client";

import Link from "next/link";
import { Trophy, Calendar, Users, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PUBLIC_LEAGUES = [
  {
    id: "l1",
    name: "Premier Metro League",
    sport: "Soccer",
    season: "Winter 2026",
    prize: "$5,000",
    status: "Registration Open",
    image: "bg-emerald-900", // Placeholder for real image logic
  },
  {
    id: "l2",
    name: "Downtown Hoops",
    sport: "Basketball",
    season: "Q1 Split",
    prize: "$2,500",
    status: "Filling Fast",
    image: "bg-orange-900",
  },
  {
    id: "l3",
    name: "Corporate Volleyball",
    sport: "Volleyball",
    season: "Spring 2026",
    prize: "Trophy + Merch",
    status: "Waitlist Only",
    image: "bg-blue-900",
  },
];

export default function PublicLeaguesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Banner */}
      <div className="bg-zinc-900/50 border-b border-white/5 py-20">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-yellow-400 text-black font-bold hover:bg-yellow-500">
            SEASON 2026
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">
            CHASE THE <span className="text-yellow-400">GLORY</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Join the city's most competitive leagues. Track stats, climb the
            ranks, and win real prizes.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button className="h-12 px-8 bg-white text-black font-bold rounded-full hover:bg-zinc-200">
                Register a Squad
              </Button>
            </Link>
            <Link href="/rank">
              <Button
                variant="outline"
                className="h-12 px-8 border-zinc-700 text-white rounded-full hover:bg-zinc-800"
              >
                View Standings
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* League Grid */}
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {PUBLIC_LEAGUES.map((league) => (
            <Card
              key={league.id}
              className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:border-yellow-400/50 transition-all"
            >
              <div
                className={`h-48 ${league.image} relative p-6 flex flex-col justify-end`}
              >
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-black/50 backdrop-blur text-white border-0 font-bold"
                  >
                    {league.sport}
                  </Badge>
                </div>
                <h3 className="text-3xl font-black italic text-white leading-none uppercase relative z-10">
                  {league.name}
                </h3>
              </div>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-zinc-800 pb-4">
                  <span className="text-zinc-500 font-bold uppercase">
                    Prize Pool
                  </span>
                  <span className="text-yellow-400 font-black text-lg">
                    {league.prize}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-zinc-400">
                    <Calendar className="w-4 h-4 mr-3 text-zinc-600" />
                    {league.season}
                  </div>
                  <div className="flex items-center text-zinc-400">
                    <ShieldCheck className="w-4 h-4 mr-3 text-zinc-600" />
                    Pro Refs & Stats
                  </div>
                  <div className="flex items-center text-zinc-400">
                    <Users className="w-4 h-4 mr-3 text-zinc-600" />
                    {league.status}
                  </div>
                </div>

                <Link href="/login" className="block mt-4">
                  <Button className="w-full bg-zinc-950 border border-zinc-800 text-white font-bold hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all group-hover:translate-y-0">
                    Join League <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
