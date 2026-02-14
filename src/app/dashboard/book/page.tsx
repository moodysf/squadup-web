"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { MapPin, Loader2, Check } from "lucide-react";
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

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

export default function BookVenuePage() {
  const router = useRouter();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      const snap = await getDocs(collection(db, "venues"));
      setVenues(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Venue));
    };
    fetchVenues();
  }, []);

  const handleStripeCheckout = async () => {
    if (!selectedVenue || !selectedDate || !selectedTime || !auth.currentUser)
      return;
    setIsProcessing(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          userId: auth.currentUser.uid,
          userEmail: auth.currentUser.email,
          data: {
            venueId: selectedVenue.id,
            venueName: selectedVenue.name,
            venuePrice: selectedVenue.pricePerHour || 50,
            date: selectedDate.toDateString(),
            time: selectedTime,
          },
        }),
      });

      const { url } = await response.json();
      if (url) window.location.href = url; // Redirect to Stripe
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Payment initialization failed.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-black italic mb-2">BOOK A PITCH</h1>
      <p className="text-zinc-400 mb-8">Select a venue, date, and time.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <Card
            key={venue.id}
            className="bg-zinc-900 border-zinc-800 hover:border-lime-400/50 transition"
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
                    Book Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Select Date & Time</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                      Booking{" "}
                      <span className="text-white font-bold">{venue.name}</span>
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid md:grid-cols-2 gap-4 py-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border border-zinc-800 bg-zinc-950"
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase">
                        Available Slots
                      </label>
                      <div className="grid grid-cols-2 gap-2 h-[280px] overflow-y-auto pr-2">
                        {TIME_SLOTS.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            className={`text-xs ${selectedTime === time ? "bg-lime-400 text-black hover:bg-lime-500" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"}`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                            {selectedTime === time && (
                              <Check className="w-3 h-3 ml-1" />
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <DialogFooter className="flex-col gap-2 sm:flex-row">
                    <div className="flex-1 text-sm text-zinc-400 flex items-center">
                      {selectedDate && selectedTime ? (
                        <span>
                          Total:{" "}
                          <span className="text-white font-bold">
                            ${venue.pricePerHour || 50}
                          </span>
                        </span>
                      ) : (
                        "Select date & time"
                      )}
                    </div>
                    <Button
                      onClick={handleStripeCheckout}
                      disabled={isProcessing || !selectedTime || !selectedDate}
                      className="bg-lime-400 text-black font-bold hover:bg-lime-500"
                    >
                      {isProcessing && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Pay with Stripe
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
