"use client";

import Link from "next/link";
import { Trophy, Calendar, Users, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock Data for Internal Dashboard
const ACTIVE_LEAGUES = [
  {
    id: "l1",
    name: "Premier Metro League",
    sport: "Soccer",
    season: "Winter 2026",
    format: "7v7",
    prize: "$5,000",
    fee: "$1,200/team",
    spots: 2,
    status: "Open",
  },
  {
    id: "l2",
    name: "Downtown Hoops",
    sport: "Basketball",
    season: "Q1 Split",
    format: "5v5",
    prize: "$2,500",
    fee: "$800/team",
    spots: 4,
    status: "Open",
  },
  {
    id: "l3",
    name: "Corporate Volleyball",
    sport: "Volleyball",
    season: "Spring 2026",
    format: "6v6",
    prize: "Trophy + Merch",
    fee: "$600/team",
    spots: 0,
    status: "Full",
  },
];

export default function DashboardLeaguesPage() {
  return (
    <div className="max-w-6xl mx-auto p-8 text-white space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter mb-2">
            LEAGUE <span className="text-yellow-400">REGISTRATION</span>
          </h1>
          <p className="text-zinc-400">
            Compete for the cup. Rise through the divisions.
          </p>
        </div>
        <Button
          variant="outline"
          className="border-zinc-700 text-zinc-300 hover:text-white"
        >
          View My Active Leagues
        </Button>
      </div>

      <Tabs defaultValue="open" className="w-full">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger
            value="open"
            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black font-bold"
          >
            Open Registration
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-zinc-800 text-zinc-400"
          >
            Coming Soon
          </TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACTIVE_LEAGUES.map((league) => (
              <LeagueCard key={league.id} league={league} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="upcoming">
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl text-zinc-500">
            Summer 2026 Season details coming soon.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LeagueCard({ league }: { league: any }) {
  const isFull = league.spots === 0;

  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:border-yellow-400/50 transition-all flex flex-col h-full">
      {/* Card Header Image Area */}
      <div className="h-32 bg-gradient-to-br from-zinc-800 to-zinc-900 relative p-6">
        <div className="absolute top-4 right-4">
          <Badge
            className={
              isFull
                ? "bg-red-500 text-white"
                : "bg-green-500 text-black font-bold"
            }
          >
            {isFull ? "REGISTRATION CLOSED" : `${league.spots} SPOTS LEFT`}
          </Badge>
        </div>
        <Trophy className="w-12 h-12 text-zinc-700 absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity rotate-12" />
        <div className="relative z-10">
          <Badge
            variant="outline"
            className="border-yellow-400/30 text-yellow-400 mb-2"
          >
            {league.sport}
          </Badge>
          <h3 className="text-2xl font-black italic text-white leading-none uppercase">
            {league.name}
          </h3>
        </div>
      </div>

      <CardContent className="flex-1 pt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <span className="text-zinc-500 text-xs font-bold uppercase">
              Season
            </span>
            <div className="font-bold text-white flex items-center">
              <Calendar className="w-3 h-3 mr-2 text-zinc-400" />{" "}
              {league.season}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-zinc-500 text-xs font-bold uppercase">
              Format
            </span>
            <div className="font-bold text-white flex items-center">
              <Users className="w-3 h-3 mr-2 text-zinc-400" /> {league.format}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-zinc-500 text-xs font-bold uppercase">
              Entry Fee
            </span>
            <div className="font-bold text-white flex items-center">
              <DollarSign className="w-3 h-3 mr-2 text-zinc-400" /> {league.fee}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-zinc-500 text-xs font-bold uppercase">
              Prize Pool
            </span>
            <div className="font-bold text-yellow-400 flex items-center">
              <Trophy className="w-3 h-3 mr-2" /> {league.prize}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 border-t border-zinc-800/50 p-4 bg-zinc-950/30">
        <Button
          className="w-full font-bold bg-yellow-400 text-black hover:bg-yellow-500"
          disabled={isFull}
        >
          {isFull ? "Join Waitlist" : "Register Squad"}{" "}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
