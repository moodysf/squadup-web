// src/app/dashboard/squads/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Plus, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MY_SQUADS = [
  {
    id: "squad_1",
    name: "Zulu FC",
    sport: "Soccer",
    role: "Captain",
    members: 12,
    wins: 8,
    losses: 2,
  },
  {
    id: "squad_2",
    name: "Dunkin' Demons",
    sport: "Basketball",
    role: "Member",
    members: 5,
    wins: 3,
    losses: 5,
  },
];

export default function SquadsPage() {
  return (
    <div className="max-w-6xl mx-auto p-8 text-white space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter">
            MY <span className="text-violet-500">LOCKER ROOM</span>
          </h1>
          <p className="text-zinc-400">
            Manage your rosters and upcoming matches.
          </p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white font-bold">
          <Plus className="w-4 h-4 mr-2" /> Create Squad
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MY_SQUADS.map((squad) => (
          <Link href={`/dashboard/squads/${squad.id}`} key={squad.id}>
            <Card className="bg-zinc-900 border-zinc-800 group hover:border-violet-500/50 transition-all cursor-pointer h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge
                      variant="outline"
                      className="border-zinc-700 text-zinc-500 mb-2"
                    >
                      {squad.sport.toUpperCase()}
                    </Badge>
                    <CardTitle className="text-2xl font-black italic text-white">
                      {squad.name}
                    </CardTitle>
                  </div>
                  {squad.role === "Captain" && (
                    <Badge className="bg-violet-500/20 text-violet-300 border border-violet-500/50">
                      Captain
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="text-center">
                    <div className="text-xl font-black text-green-400">
                      {squad.wins}
                    </div>
                    <div className="text-[10px] text-zinc-600">WINS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-black text-red-400">
                      {squad.losses}
                    </div>
                    <div className="text-[10px] text-zinc-600">LOSS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-black text-zinc-300">
                      {squad.members}
                    </div>
                    <div className="text-[10px] text-zinc-600">ROSTER</div>
                  </div>
                </div>
                <div className="flex items-center text-sm font-bold text-zinc-500 group-hover:text-violet-400 transition-colors">
                  Manage Roster <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
