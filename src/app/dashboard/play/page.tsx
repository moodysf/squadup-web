"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  Zap,
  Loader2,
  MapPin,
  Trophy,
  Calendar,
  Check,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

// Firebase & Types
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { SportType } from "@/lib/types";

// --- MAIN PAGE COMPONENT ---
export default function PlayPage() {
  return (
    <div className="max-w-6xl mx-auto p-8 text-white space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter mb-2">
            GAME <span className="text-lime-400">CENTER</span>
          </h1>
          <p className="text-zinc-400">
            Join a pickup game, book a court, or compete in a league.
          </p>
        </div>
      </div>

      <Tabs defaultValue="pickup" className="w-full">
        <TabsList className="bg-zinc-900 border border-zinc-800 h-auto p-1 grid grid-cols-3 w-full md:w-[600px]">
          <TabsTrigger
            value="pickup"
            className="font-bold py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <Zap className="w-4 h-4 mr-2" /> DROP-INS
          </TabsTrigger>
          <TabsTrigger
            value="venues"
            className="font-bold py-3 data-[state=active]:bg-lime-400 data-[state=active]:text-black"
          >
            <MapPin className="w-4 h-4 mr-2" /> BOOK VENUE
          </TabsTrigger>
          <TabsTrigger
            value="leagues"
            className="font-bold py-3 data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
          >
            <Trophy className="w-4 h-4 mr-2" /> LEAGUES
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="pickup">
            <PickupList />
          </TabsContent>
          <TabsContent value="venues">
            <VenueList />
          </TabsContent>
          <TabsContent value="leagues">
            <LeagueList />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

// --- 1. PICKUP SESSIONS COMPONENT ---
function PickupList() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const q = query(
      collection(db, "pickup_sessions"),
      where("date", ">=", new Date()),
    );
    const unsub = onSnapshot(q, (snap) => {
      setSessions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filtered =
    filter === "ALL" ? sessions : sessions.filter((s) => s.sport === filter);

  return (
    <div className="space-y-6">
      {/* Sport Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Badge
          variant={filter === "ALL" ? "default" : "outline"}
          onClick={() => setFilter("ALL")}
          className="cursor-pointer hover:bg-zinc-700"
        >
          All
        </Badge>
        {Object.values(SportType).map((sport) => (
          <Badge
            key={sport}
            variant={filter === sport ? "default" : "outline"}
            onClick={() => setFilter(sport)}
            className={`cursor-pointer border-zinc-700 ${filter === sport ? "bg-blue-600" : "text-zinc-400 hover:text-white"}`}
          >
            {sport}
          </Badge>
        ))}
      </div>

      {loading ? (
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
      ) : filtered.length === 0 ? (
        <div className="text-zinc-500 text-center py-12 border border-dashed border-zinc-800 rounded-xl">
          No active sessions found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((session) => (
            <PickupCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}

function PickupCard({ session }: { session: any }) {
  const [joining, setJoining] = useState(false);
  const current = session.currentPlayers?.length || 0;
  const max = session.maxPlayers || 10;
  const isFull = current >= max;
  const hasJoined =
    auth.currentUser && session.currentPlayers?.includes(auth.currentUser.uid);

  const handleJoin = async () => {
    if (!auth.currentUser) return alert("Sign in first");
    setJoining(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          type: "pickup",
          userId: auth.currentUser.uid,
          userEmail: auth.currentUser.email,
          data: {
            sessionId: session.id,
            sport: session.sport,
            venue: session.venue,
            price: session.price || 10,
          },
        }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (e) {
      console.error(e);
      setJoining(false);
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-blue-500/50 transition-all">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
            {session.sport}
          </Badge>
          <span className="font-bold text-white">${session.price || 10}</span>
        </div>
        <h3 className="text-xl font-bold italic text-white">{session.venue}</h3>
        <div className="flex items-center text-sm text-zinc-400 mt-1">
          <Clock className="w-3 h-3 mr-1 text-blue-500" />{" "}
          {session.date?.seconds
            ? new Date(session.date.seconds * 1000).toLocaleString([], {
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "TBD"}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-xs font-bold uppercase text-zinc-500">
          <span>Roster</span>
          <span className={isFull ? "text-red-500" : "text-blue-500"}>
            {current}/{max}
          </span>
        </div>
        <Progress
          value={(current / max) * 100}
          className="h-2 bg-zinc-800"
          indicatorColor={isFull ? "bg-red-500" : "bg-blue-500"}
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleJoin}
          disabled={isFull || joining || hasJoined}
          className={`w-full font-bold ${hasJoined ? "bg-green-500 text-black" : isFull ? "bg-zinc-800 text-zinc-500" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          {joining ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : hasJoined ? (
            "Joined"
          ) : isFull ? (
            "Full"
          ) : (
            "Join Game"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

// --- 2. VENUE LIST COMPONENT ---
function VenueList() {
  const [venues, setVenues] = useState<any[]>([]);

  useEffect(() => {
    getDocs(collection(db, "venues")).then((snap) =>
      setVenues(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    );
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}

function VenueCard({ venue }: { venue: any }) {
  // 1. FIX: Start with 'undefined' to prevent Server/Client mismatch
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  // 2. FIX: Set the default date only AFTER the component mounts (Client-side)
  useEffect(() => {
    setDate(new Date());
  }, []);

  // Generate Booking Slots (e.g., 8 AM to 10 PM)
  const timeSlots = Array.from({ length: 15 }, (_, i) => {
    const hour = i + 8; // Start at 8:00
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    return {
      value: `${hour.toString().padStart(2, "0")}:00`,
      label: `${displayHour}:00 ${period}`,
    };
  });

  const handleBook = async () => {
    if (!auth.currentUser || !date || !time) return;
    setProcessing(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          type: "booking",
          userId: auth.currentUser.uid,
          userEmail: auth.currentUser.email,
          data: {
            venueId: venue.id,
            venueName: venue.name,
            venuePrice: venue.pricePerHour || 50,
            date: date.toDateString(),
            time,
          },
        }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (e) {
      console.error(e);
      setProcessing(false);
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-lime-400/50 transition flex flex-col">
      <div className="h-40 bg-zinc-800 flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60" />
        <span className="relative z-10 font-black text-4xl text-zinc-700 italic opacity-50 uppercase group-hover:scale-110 transition-transform duration-500">
          {venue.sport}
        </span>
        <Badge className="absolute top-3 right-3 bg-lime-400 text-black font-bold z-20">
          ${venue.pricePerHour || 50}/hr
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="italic text-white text-xl">
          {venue.name}
        </CardTitle>
        <div className="flex items-center text-sm text-zinc-400">
          <MapPin className="w-3 h-3 mr-1 text-lime-400" /> {venue.address}
        </div>
      </CardHeader>

      <CardContent className="mt-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-zinc-950 border border-zinc-800 text-white font-bold hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all">
              Book Pitch
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-[600px] p-0 overflow-hidden">
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="text-2xl italic font-black">
                BOOKING:{" "}
                <span className="text-lime-400">
                  {venue.name.toUpperCase()}
                </span>
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Select a date and time to reserve your spot.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col md:flex-row border-t border-zinc-800">
              {/* LEFT: CALENDAR */}
              <div className="p-4 border-b md:border-b-0 md:border-r border-zinc-800 flex justify-center bg-zinc-900/30">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) =>
                    d < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  className="rounded-md border border-zinc-800 bg-zinc-950 text-white"
                />
              </div>

              {/* RIGHT: TIME SLOTS */}
              <div className="flex-1 p-4 bg-zinc-900/50 max-h-[350px] overflow-y-auto">
                <div className="mb-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  Available Slots {date ? `(${date.toLocaleDateString()})` : ""}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.value}
                      variant={time === slot.value ? "default" : "outline"}
                      onClick={() => setTime(slot.value)}
                      className={`justify-start font-mono text-sm h-10 ${
                        time === slot.value
                          ? "bg-lime-400 text-black hover:bg-lime-500 border-lime-400"
                          : "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      <Clock className="w-3 h-3 mr-2 opacity-50" />
                      {slot.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="p-4 bg-zinc-900 border-t border-zinc-800 flex-col sm:flex-row gap-3 items-center">
              <div className="flex-1 text-sm text-zinc-400 text-center sm:text-left">
                {date && time ? (
                  <>
                    Total:{" "}
                    <span className="text-white font-bold text-lg align-middle ml-1">
                      ${venue.pricePerHour || 50}
                    </span>
                  </>
                ) : (
                  "Please select a time"
                )}
              </div>
              <Button
                onClick={handleBook}
                disabled={processing || !time || !date}
                className="w-full sm:w-auto bg-lime-400 text-black font-bold hover:bg-lime-500 px-8"
              >
                {processing ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  "Confirm & Pay"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

// --- 3. LEAGUE LIST COMPONENT ---
function LeagueList() {
  const [leagues, setLeagues] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "leagues"), orderBy("name"));
    onSnapshot(q, (snap) =>
      setLeagues(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    );
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leagues.map((l) => (
        <LeagueCard key={l.id} league={l} />
      ))}
    </div>
  );
}

function LeagueCard({ league }: { league: any }) {
  const [joining, setJoining] = useState(false);
  const isFull = (league.spots || 0) <= 0;

  const handleJoin = async () => {
    if (!auth.currentUser) return alert("Sign in first");
    setJoining(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          type: "league",
          userId: auth.currentUser.uid,
          userEmail: auth.currentUser.email,
          data: { leagueId: league.id, leagueName: league.name, fee: 150 }, // Hardcoded fee for now or fetch from DB
        }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (e) {
      console.error(e);
      setJoining(false);
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-yellow-400/50 transition flex flex-col">
      <div className="h-32 bg-gradient-to-br from-zinc-800 to-zinc-900 relative p-4">
        <Badge
          className={`absolute top-2 right-2 ${isFull ? "bg-red-500" : "bg-green-500 text-black"}`}
        >
          {isFull ? "FULL" : "OPEN"}
        </Badge>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-black italic text-white uppercase">
            {league.name}
          </h3>
          <Badge
            variant="outline"
            className="border-yellow-400 text-yellow-400 mt-1"
          >
            {league.sport}
          </Badge>
        </div>
      </div>
      <CardContent className="pt-4 space-y-2 flex-1">
        <div className="flex justify-between text-sm text-zinc-400">
          <span>Season</span>
          <span className="text-white font-bold">{league.season}</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-400">
          <span>Prize</span>
          <span className="text-yellow-400 font-bold">{league.prize}</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-400">
          <span>Format</span>
          <span className="text-white font-bold">{league.format}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleJoin}
          disabled={isFull || joining}
          className="w-full bg-yellow-400 text-black font-bold hover:bg-yellow-500"
        >
          {joining ? (
            <Loader2 className="animate-spin" />
          ) : isFull ? (
            "Waitlist"
          ) : (
            "Register Squad"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
