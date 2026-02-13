"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import { Calendar, MapPin, Trophy, Activity } from "lucide-react"; // <--- FIXED
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScheduledGame {
  id: string;
  title: string;
  subTitle: string;
  date: Date;
  type: "venue" | "pickup" | "league";
}

export function UpcomingGames() {
  const [games, setGames] = useState<ScheduledGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const now = new Date();
      // ⚠️ IMPORTANT: Replace this with your actual User ID from Firebase Console to see data!
      const user = { uid: "YOUR_REAL_FIREBASE_UID_HERE" };

      try {
        const newGames: ScheduledGame[] = [];

        // --- FETCH BOOKINGS ---
        const bookingsRef = collection(db, "bookings");
        const bookingsQ = query(
          bookingsRef,
          where("requesterId", "==", user.uid),
          where("date", ">", now),
        );
        const bookingsSnap = await getDocs(bookingsQ);

        bookingsSnap.forEach((doc) => {
          const data = doc.data();
          newGames.push({
            id: doc.id,
            title: data.venue?.name || "Venue Booking",
            subTitle: "Personal Booking",
            date: data.date.toDate(),
            type: "venue",
          });
        });

        // --- FETCH PICKUPS ---
        const pickupsRef = collection(db, "pickup_sessions");
        const pickupsQ = query(pickupsRef, where("date", ">", now));
        const pickupsSnap = await getDocs(pickupsQ);

        pickupsSnap.forEach((doc) => {
          const data = doc.data();
          if (data.currentPlayers?.includes(user.uid)) {
            newGames.push({
              id: doc.id,
              title: `Drop-in ${data.sport}`,
              subTitle: data.venueName,
              date: data.date.toDate(),
              type: "pickup",
            });
          }
        });

        newGames.sort((a, b) => a.date.getTime() - b.date.getTime());
        setGames(newGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-white">Loading schedule...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold italic text-white flex items-center gap-2">
        <Calendar className="w-6 h-6 text-zinc-400" />
        UPCOMING ACTION
      </h2>

      {games.length === 0 ? (
        <div className="p-8 border border-dashed border-zinc-800 rounded-lg text-center text-zinc-500">
          No upcoming games. Time to book the pitch!
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}

function GameCard({ game }: { game: ScheduledGame }) {
  const getIcon = () => {
    switch (game.type) {
      case "league":
        return <Trophy className="w-4 h-4 text-yellow-400" />;
      case "pickup":
        return <Activity className="w-4 h-4 text-blue-400" />; // <--- FIXED
      case "venue":
        return <MapPin className="w-4 h-4 text-green-400" />;
    }
  };

  const getBadgeColor = () => {
    switch (game.type) {
      case "league":
        return "border-yellow-400 text-yellow-400";
      case "pickup":
        return "border-blue-400 text-blue-400";
      case "venue":
        return "border-green-400 text-green-400";
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white hover:border-zinc-600 transition-colors">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              {format(game.date, "MMM d")}
            </span>
            <span className="text-2xl font-black italic">
              {format(game.date, "h:mm a")}
            </span>
          </div>
          <Badge
            variant="outline"
            className={`${getBadgeColor()} flex gap-1 items-center`}
          >
            {getIcon()}
            {game.type.toUpperCase()}
          </Badge>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-lg leading-none">{game.title}</h3>
          <p className="text-sm text-zinc-400">{game.subTitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}
