"use client";

import { useState } from "react";
import { MapPin, Clock, Users, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Data (Replace with Firestore 'pickup_sessions' collection later)
const MOCK_SESSIONS = [
  {
    id: "1",
    sport: "Soccer",
    venue: "Downtown City Pitch",
    time: "Tonight, 8:00 PM",
    level: "Competitive",
    price: 15,
    current: 8,
    max: 10,
    host: "Alex M.",
  },
  {
    id: "2",
    sport: "Basketball",
    venue: "Raptors Community Court",
    time: "Tomorrow, 6:00 PM",
    level: "Casual",
    price: 10,
    current: 3,
    max: 10,
    host: "Sarah J.",
  },
  {
    id: "3",
    sport: "Futsal",
    venue: "The Hangar",
    time: "Friday, 9:00 PM",
    level: "All Levels",
    price: 12,
    current: 10,
    max: 10, // FULL
    host: "Mike T.",
  },
];

export default function PickupPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 text-white space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter mb-2">
            DROP-IN <span className="text-blue-400">SESSIONS</span>
          </h1>
          <p className="text-zinc-400">
            Find a game. Join the squad. No commitment.
          </p>
        </div>

        {/* Filter Toggle (Visual Only) */}
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="cursor-pointer hover:bg-zinc-800 border-blue-400 text-blue-400"
          >
            Soccer
          </Badge>
          <Badge
            variant="outline"
            className="cursor-pointer hover:bg-zinc-800 border-zinc-700 text-zinc-500"
          >
            Basketball
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SESSIONS.map((session) => (
          <PickupCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}

function PickupCard({ session }: { session: any }) {
  const [joined, setJoined] = useState(false);
  const isFull = session.current >= session.max;
  const percent = (session.current / session.max) * 100;

  return (
    <Card className="bg-zinc-900 border-zinc-800 relative overflow-hidden group hover:border-blue-400/50 transition-all">
      {/* Top Banner: Sport & Level */}
      <div className="absolute top-0 left-0 w-1 bg-blue-400 h-full" />

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant="secondary"
            className="bg-zinc-800 text-zinc-300 font-bold hover:bg-zinc-700"
          >
            {session.sport.toUpperCase()}
          </Badge>
          <span className="font-bold text-white">${session.price}</span>
        </div>
        <h3 className="text-xl font-bold italic text-white leading-tight">
          {session.venue}
        </h3>
        <div className="flex items-center text-sm text-zinc-400 mt-1">
          <Clock className="w-3 h-3 mr-1 text-blue-400" /> {session.time}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Host Info */}
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${session.host}`}
            />
            <AvatarFallback>HO</AvatarFallback>
          </Avatar>
          <span>
            Hosted by <span className="text-zinc-300">{session.host}</span>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
            <span>Roster</span>
            <span className={isFull ? "text-red-400" : "text-blue-400"}>
              {session.current}/{session.max} Players
            </span>
          </div>
          <Progress
            value={percent}
            className="h-2 bg-zinc-800"
            indicatorColor={isFull ? "bg-red-500" : "bg-blue-400"}
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className={`w-full font-bold transition-all ${
            joined
              ? "bg-green-500 hover:bg-green-600 text-black"
              : isFull
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={isFull && !joined}
          onClick={() => setJoined(!joined)}
        >
          {joined ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" /> Joined
            </>
          ) : isFull ? (
            "Session Full"
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" /> Join Game
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
