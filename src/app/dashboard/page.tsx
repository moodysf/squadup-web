"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation"; // <--- Import Params
import {
  Users,
  Trophy,
  MapPin,
  Zap,
  ArrowRight,
  Calendar,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // <--- Import Alert
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

// --- 1. THE MAIN CONTENT COMPONENT ---
function DashboardContent() {
  const [user, setUser] = useState<any>(null);
  const [upcomingGame, setUpcomingGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // URL Params for Payment Status
  const searchParams = useSearchParams();
  const paymentSuccess = searchParams.get("success");
  const paymentCanceled = searchParams.get("canceled");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const now = new Date();

          // Fetch Bookings & Pickups (Parallel)
          const bookingsQ = query(
            collection(db, "bookings"),
            where("userId", "==", currentUser.uid),
            where("date", ">=", now),
          );

          const pickupQ = query(
            collection(db, "pickup_sessions"),
            where("currentPlayers", "array-contains", currentUser.uid),
            where("date", ">=", now),
          );

          const [bookingsSnap, pickupSnap] = await Promise.all([
            getDocs(bookingsQ),
            getDocs(pickupQ),
          ]);

          let allEvents: any[] = [];

          bookingsSnap.forEach((doc) => {
            const d = doc.data();
            const dateObj =
              d.date instanceof Timestamp ? d.date.toDate() : new Date(d.date);
            allEvents.push({
              id: doc.id,
              type: "BOOKING",
              title: d.venueName,
              sub: d.venueAddress,
              date: dateObj,
              status: "Confirmed",
            });
          });

          pickupSnap.forEach((doc) => {
            const d = doc.data();
            const dateObj =
              d.date instanceof Timestamp ? d.date.toDate() : new Date(d.date);
            allEvents.push({
              id: doc.id,
              type: "PICKUP",
              title: `Drop-in ${d.sport}`,
              sub: d.venue,
              date: dateObj,
              status: "Joined",
            });
          });

          allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

          if (allEvents.length > 0) {
            setUpcomingGame(allEvents[0]);
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8 text-white space-y-8">
      {/* PAYMENT ALERTS */}
      {paymentSuccess && (
        <Alert className="bg-green-900/20 border-green-900 text-green-400 mb-6">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your booking has been confirmed. Get ready to play.
          </AlertDescription>
        </Alert>
      )}
      {paymentCanceled && (
        <Alert className="bg-red-900/20 border-red-900 text-red-400 mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Canceled</AlertTitle>
          <AlertDescription>
            The transaction was canceled. No charges were made.
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter">
            READY TO <span className="text-lime-400">PLAY?</span>
          </h1>
          <p className="text-zinc-400">
            Welcome back, {user?.displayName || "Captain"}.
          </p>
        </div>
        <Link href="/dashboard/play">
          <Button className="bg-lime-400 text-black hover:bg-lime-500 font-bold px-8">
            <Zap className="w-4 h-4 mr-2" /> Book Now
          </Button>
        </Link>
      </div>

      {/* Grid Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/squads">
          <Card className="bg-zinc-900 border-zinc-800 hover:border-violet-500/50 cursor-pointer h-full group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400 group-hover:text-white">
                MY SQUADS
              </CardTitle>
              <Users className="h-4 w-4 text-violet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Manage Roster</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/leagues">
          <Card className="bg-zinc-900 border-zinc-800 hover:border-yellow-400/50 cursor-pointer h-full group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400 group-hover:text-white">
                ACTIVE LEAGUES
              </CardTitle>
              <Trophy className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Season 2026</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/play">
          <Card className="bg-zinc-900 border-zinc-800 hover:border-lime-400/50 cursor-pointer h-full group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400 group-hover:text-white">
                GAME CENTER
              </CardTitle>
              <MapPin className="h-4 w-4 text-lime-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Find Games</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Upcoming Action */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold italic flex items-center gap-2">
          <Calendar className="w-5 h-5 text-zinc-500" /> UPCOMING ACTION
        </h2>

        {loading ? (
          <div className="h-32 bg-zinc-900 animate-pulse rounded-xl" />
        ) : upcomingGame ? (
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-lime-400/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-zinc-800 rounded-lg flex flex-col items-center justify-center text-center leading-none border border-zinc-700">
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
                <div className="flex gap-2 mb-1">
                  <Badge
                    variant="outline"
                    className="bg-lime-400/10 text-lime-400 border-lime-400/20"
                  >
                    {upcomingGame.type}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-zinc-400 border-zinc-700"
                  >
                    {upcomingGame.date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {upcomingGame.title}
                </h3>
                <div className="flex items-center text-zinc-400 text-sm mt-1">
                  <MapPin className="w-3 h-3 mr-1" /> {upcomingGame.sub}
                </div>
              </div>
            </div>
            <Button className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold">
              View Ticket
            </Button>
          </div>
        ) : (
          <div className="border border-dashed border-zinc-800 rounded-xl p-12 text-center bg-zinc-900/30">
            <p className="text-zinc-500 mb-4">No upcoming games found.</p>
            <Link href="/dashboard/play">
              <Button
                variant="outline"
                className="border-zinc-700 text-white hover:bg-zinc-800"
              >
                Find a Game <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// --- 2. THE PAGE WRAPPER (Prevents the Crash) ---
export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen bg-zinc-950">
          <Loader2 className="w-8 h-8 animate-spin text-lime-400" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
