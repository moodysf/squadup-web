"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Trophy,
  MapPin,
  Zap,
  ArrowRight,
  Calendar,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function DashboardHome() {
  const [user, setUser] = useState<any>(null);
  const [upcomingGame, setUpcomingGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Fetch the next upcoming booking
        const q = query(
          collection(db, "bookings"),
          where("userId", "==", currentUser.uid),
          orderBy("date", "asc"), // Get the soonest one
          limit(1),
        );

        try {
          const snapshot = await getDocs(q);
          if (!snapshot.empty) {
            const data = snapshot.docs[0].data();
            // Convert Firestore Timestamp to JS Date
            setUpcomingGame({
              id: snapshot.docs[0].id,
              ...data,
              date: data.date.toDate(),
            });
          }
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8 text-white space-y-8">
      {/* ... (Welcome Banner & 3 Cards - keep these exactly as they were) ... */}

      {/* ... HEADER ... */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter">
            READY TO <span className="text-lime-400">PLAY?</span>
          </h1>
          <p className="text-zinc-400">
            Welcome back,{" "}
            {user?.displayName ? user.displayName.split(" ")[0] : "Captain"}.
          </p>
        </div>
        <Link href="/dashboard/book">
          <Button className="bg-lime-400 text-black hover:bg-lime-500 font-bold px-8">
            <Zap className="w-4 h-4 mr-2" /> Book Now
          </Button>
        </Link>
      </div>

      {/* ... GRID CARDS (Paste your working grid code here) ... */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/squads">
          <Card className="bg-zinc-900 border-zinc-800 hover:border-violet-500/50 transition-all cursor-pointer h-full group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400 group-hover:text-white">
                MY SQUADS
              </CardTitle>
              <Users className="h-4 w-4 text-violet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Manage Roster</div>
              <p className="text-xs text-zinc-500 mt-1">
                View stats and invite players
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/leagues">
          <Card className="bg-zinc-900 border-zinc-800 hover:border-yellow-400/50 transition-all cursor-pointer h-full group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400 group-hover:text-white">
                ACTIVE LEAGUES
              </CardTitle>
              <Trophy className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Season 2026</div>
              <p className="text-xs text-zinc-500 mt-1">
                Check standings and schedule
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/book">
          <Card className="bg-zinc-900 border-zinc-800 hover:border-lime-400/50 transition-all cursor-pointer h-full group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400 group-hover:text-white">
                BOOK A PITCH
              </CardTitle>
              <MapPin className="h-4 w-4 text-lime-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Find Courts</div>
              <p className="text-xs text-zinc-500 mt-1">
                Reserve spots near you
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Upcoming Action Section - UPDATED LOGIC */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold italic flex items-center gap-2">
          <Calendar className="w-5 h-5 text-zinc-500" /> UPCOMING ACTION
        </h2>

        {loading ? (
          <div className="h-32 bg-zinc-900 animate-pulse rounded-xl" />
        ) : upcomingGame ? (
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-lime-400/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-zinc-800 rounded-lg flex flex-col items-center justify-center text-center leading-none">
                <span className="text-xs font-bold text-red-500 uppercase block mb-1">
                  {upcomingGame.date.toLocaleString("default", {
                    month: "short",
                  })}
                </span>
                <span className="text-2xl font-black text-white block">
                  {upcomingGame.date.getDate()}
                </span>
              </div>
              <div>
                <Badge
                  variant="outline"
                  className="mb-2 bg-lime-400/10 text-lime-400 border-lime-400/20"
                >
                  CONFIRMED
                </Badge>
                <h3 className="text-xl font-bold text-white">
                  {upcomingGame.venueName}
                </h3>
                <div className="flex items-center text-zinc-400 text-sm mt-1">
                  <MapPin className="w-3 h-3 mr-1" />{" "}
                  {upcomingGame.venueAddress}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-zinc-300">
                  Start Time
                </div>
                <div className="text-zinc-500 text-xs">12:00 PM (TBD)</div>
              </div>
              <Button className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold">
                View Ticket
              </Button>
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-zinc-800 rounded-xl p-12 text-center bg-zinc-900/30">
            <p className="text-zinc-500 mb-4">No upcoming games scheduled.</p>
            <Link href="/dashboard/book">
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800"
              >
                Find a Match <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
