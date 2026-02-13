"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // <--- Import Router
import { collection, getDocs, addDoc } from "firebase/firestore"; // <--- Import addDoc
import { db, auth } from "@/lib/firebase"; // <--- Import Auth
import { MapPin, Loader2, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

interface Venue {
  id: string;
  name: string;
  address: string;
  sport: string;
  pricePerHour: number;
}

export default function BookVenuePage() {
  const router = useRouter();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  // Fetch Logic (Reused)
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const snap = await getDocs(collection(db, "venues"));
        setVenues(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Venue));
      } catch (e) {
        console.error(e);
      }
    };
    fetchVenues();
  }, []);

  // --- THE REAL BOOKING LOGIC ---
  const handleBook = async () => {
    if (!selectedVenue || !selectedDate || !auth.currentUser) return;
    setIsBooking(true);

    try {
      await addDoc(collection(db, "bookings"), {
        venueId: selectedVenue.id,
        venueName: selectedVenue.name,
        venueAddress: selectedVenue.address,
        date: selectedDate, // Firestore handles JS Date objects
        userId: auth.currentUser.uid,
        status: "confirmed",
        createdAt: new Date(),
      });

      // Redirect to dashboard to see the new booking
      router.push("/dashboard");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-black italic mb-2">BOOK A PITCH</h1>
      <p className="text-zinc-400 mb-8">
        Select a venue and time to reserve your spot.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <Card
            key={venue.id}
            className="bg-zinc-900 border-zinc-800 hover:border-lime-400/50 transition group"
          >
            <div className="h-40 bg-zinc-800 flex items-center justify-center relative">
              <span className="font-black text-4xl text-zinc-700 italic opacity-50 uppercase">
                {venue.sport}
              </span>
              <Badge className="absolute top-2 right-2 bg-lime-400 text-black font-bold">
                ${venue.pricePerHour || 50}/hr
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="italic">{venue.name}</CardTitle>
              <div className="flex items-center text-xs text-zinc-400">
                <MapPin className="w-3 h-3 mr-1" /> {venue.address}
              </div>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-zinc-950 border border-zinc-800 hover:bg-lime-400 hover:text-black font-bold"
                    onClick={() => setSelectedVenue(venue)}
                  >
                    Select Time
                  </Button>
                </DialogTrigger>

                <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirm Booking</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                      You are booking{" "}
                      <span className="text-white font-bold">{venue.name}</span>
                      .
                    </DialogDescription>
                  </DialogHeader>

                  <div className="py-4 flex flex-col items-center gap-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border border-zinc-800 bg-zinc-950"
                    />
                    <div className="text-sm text-zinc-400">
                      Selected:{" "}
                      <span className="text-lime-400 font-bold">
                        {selectedDate?.toDateString()}
                      </span>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      onClick={handleBook}
                      disabled={isBooking}
                      className="w-full bg-lime-400 text-black font-bold hover:bg-lime-500"
                    >
                      {isBooking && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Confirm & Pay
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
