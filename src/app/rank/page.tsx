"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SportType } from "@/lib/types"; // <--- IMPORT

interface RankedSquad {
  id: string;
  name: string;
  sport: string;
  wins: number;
  losses: number;
}

export default function PublicRankPage() {
  const [allSquads, setAllSquads] = useState<RankedSquad[]>([]);
  const [filteredSquads, setFilteredSquads] = useState<RankedSquad[]>([]);
  const [sportFilter, setSportFilter] = useState("ALL");

  useEffect(() => {
    const fetchRanks = async () => {
      try {
        const q = query(
          collection(db, "squads"),
          orderBy("wins", "desc"),
          limit(50),
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as RankedSquad,
        );
        setAllSquads(data);
        setFilteredSquads(data);
      } catch (err) {
        console.error("Failed to load rankings", err);
      }
    };
    fetchRanks();
  }, []);

  // Filter Logic
  useEffect(() => {
    if (sportFilter === "ALL") {
      setFilteredSquads(allSquads);
    } else {
      setFilteredSquads(allSquads.filter((s) => s.sport === sportFilter));
    }
  }, [sportFilter, allSquads]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black italic tracking-tighter mb-4">
            GLOBAL <span className="text-yellow-400">LEADERBOARD</span>
          </h1>
          <p className="text-xl text-zinc-400">
            The top squads ruling the city this season.
          </p>
        </div>

        {/* Dynamic Filter Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <Tabs
            defaultValue="ALL"
            onValueChange={setSportFilter}
            className="w-full max-w-3xl"
          >
            <TabsList className="bg-zinc-900 border border-zinc-800 h-auto flex-wrap justify-center p-2 gap-2">
              <TabsTrigger
                value="ALL"
                className="font-bold data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
              >
                ALL
              </TabsTrigger>

              {/* Map through SportType enum */}
              {Object.values(SportType).map((sport) => (
                <TabsTrigger
                  key={sport}
                  value={sport}
                  className="font-bold data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                >
                  {sport.toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 px-6 py-2 text-sm font-bold text-zinc-500 uppercase tracking-wider">
            <div className="col-span-1">Rank</div>
            <div className="col-span-6">Squad</div>
            <div className="col-span-3 text-center">Record</div>
            <div className="col-span-2 text-right">Win %</div>
          </div>

          {filteredSquads.length === 0 ? (
            <div className="text-center py-10 text-zinc-600 bg-zinc-900/50 rounded-xl border border-zinc-800">
              No squads found for this filter.
            </div>
          ) : (
            filteredSquads.map((squad, index) => {
              const total = squad.wins + squad.losses;
              const pct =
                total > 0 ? Math.round((squad.wins / total) * 100) : 0;
              return (
                <div
                  key={squad.id}
                  className="grid grid-cols-12 gap-4 items-center bg-zinc-900 border border-zinc-800 p-4 rounded-xl hover:border-yellow-400/50 transition-all"
                >
                  <div className="col-span-1 text-xl font-black text-zinc-600 italic">
                    {index + 1}
                  </div>
                  <div className="col-span-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">
                        {squad.name}
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs border-zinc-700 text-zinc-500"
                      >
                        {squad.sport}
                      </Badge>
                    </div>
                  </div>
                  <div className="col-span-3 text-center font-mono">
                    <span className="text-green-400 font-bold">
                      {squad.wins}W
                    </span>
                    <span className="text-zinc-600 mx-1">-</span>
                    <span className="text-red-400 font-bold">
                      {squad.losses}L
                    </span>
                  </div>
                  <div className="col-span-2 text-right font-black text-xl text-white">
                    {pct}%
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
