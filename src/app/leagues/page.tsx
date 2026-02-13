"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  Calendar,
  Users,
  ShieldCheck,
  ArrowRight,
  Loader2,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"; // <--- Real Data
import { db } from "@/lib/firebase";

export default function PublicLeaguesPage() {
  const [leagues, setLeagues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH REAL DATA
  useEffect(() => {
    // Optionally add where("status", "==", "Open") if you only want to show active ones
    const q = query(collection(db, "leagues"), orderBy("name"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leaguesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeagues(leaguesData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      {/* Hero Banner */}
      <div className="bg-zinc-900/50 border-b border-white/5 py-20 relative overflow-hidden">
        {/* Decorative Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime-400/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-yellow-400 text-black font-bold hover:bg-yellow-500">
            SEASON 2026
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6 text-white">
            CHASE THE <span className="text-lime-400">GLORY</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Join the city's most competitive leagues. Track stats, climb the
            ranks, and win real prizes.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button className="h-12 px-8 bg-lime-400 text-black font-bold rounded-full hover:bg-lime-500">
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
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-lime-400" />
          </div>
        ) : leagues.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {leagues.map((league) => (
              <Card
                key={league.id}
                className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:border-lime-400/50 transition-all flex flex-col"
              >
                {/* Image Placeholder area */}
                <div className="h-48 bg-gradient-to-br from-zinc-800 to-zinc-950 relative p-6 flex flex-col justify-end group-hover:from-zinc-800 group-hover:to-zinc-900 transition-colors">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/50 backdrop-blur text-white border-0 font-bold">
                      {league.sport}
                    </Badge>
                  </div>
                  <h3 className="text-3xl font-black italic text-white leading-none uppercase relative z-10">
                    {league.name}
                  </h3>
                </div>

                <CardContent className="pt-6 space-y-4 flex-1">
                  <div className="flex justify-between items-center text-sm border-b border-zinc-800 pb-4">
                    <span className="text-zinc-500 font-bold uppercase">
                      Prize Pool
                    </span>
                    <span className="text-lime-400 font-black text-lg">
                      {league.prize}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-zinc-400">
                      <Calendar className="w-4 h-4 mr-3 text-zinc-600" />
                      {league.season}
                    </div>
                    <div className="flex items-center text-zinc-400">
                      <Users className="w-4 h-4 mr-3 text-zinc-600" />
                      {league.spots === 0
                        ? "Full"
                        : `${league.spots || 0} spots left`}
                    </div>
                    <div className="flex items-center text-zinc-400">
                      <DollarSign className="w-4 h-4 mr-3 text-zinc-600" />
                      {league.fee}
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <Link
                      href={league.spots === 0 ? "#" : "/login"}
                      className="block"
                    >
                      <Button
                        disabled={league.spots === 0}
                        className="w-full bg-zinc-950 border border-zinc-800 text-white font-bold hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all"
                      >
                        {league.spots === 0 ? "Waitlist Only" : "Join League"}{" "}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl text-zinc-500">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-zinc-700" />
            <h3 className="text-xl font-bold text-white mb-2">
              No Active Leagues
            </h3>
            <p>Check back soon for the Summer 2026 season.</p>
          </div>
        )}
      </div>
    </div>
  );
}
