"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MapPin, ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Venue {
  id: string;
  name: string;
  address: string;
  sport: string;
  image?: string;
  pricePerHour?: number;
}

export default function PublicVenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "venues"));
        const fetchedVenues = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Venue[];
        setVenues(fetchedVenues);
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="bg-zinc-900/50 border-b border-white/5 py-16">
        <div className="container max-w-7xl mx-auto px-4 text-center md:text-left">
          <h1 className="text-5xl font-black italic tracking-tighter mb-4">
            FIND YOUR <span className="text-lime-400">PITCH</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Browse top-rated courts and fields. Sign in to book instantly.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20 text-zinc-500 animate-pulse">
            Loading venues...
          </div>
        ) : venues.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500 mb-4">No venues found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function VenueCard({ venue }: { venue: Venue }) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:border-lime-400/50 transition-all">
      <div className="h-48 bg-zinc-800 relative flex items-center justify-center">
        {venue.image ? (
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl font-black text-zinc-700 uppercase italic opacity-50">
            {venue.sport}
          </span>
        )}
        <Badge className="absolute top-4 right-4 bg-lime-400 text-black font-bold">
          ${venue.pricePerHour || 50}/hr
        </Badge>
      </div>

      <CardHeader>
        <h3 className="text-2xl font-bold italic text-white">{venue.name}</h3>
        <div className="flex items-center text-zinc-400 text-sm">
          <MapPin className="w-4 h-4 mr-1" /> {venue.address}
        </div>
      </CardHeader>

      <CardFooter>
        <Link href="/login" className="w-full">
          <Button className="w-full bg-white text-black font-bold hover:bg-lime-400">
            Sign In to Book <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
