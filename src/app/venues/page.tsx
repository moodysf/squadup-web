"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MapPin, ArrowRight, Filter, Search, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { SportType } from "@/lib/types"; // Ensure you have this enum file

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
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState<string>("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const snap = await getDocs(collection(db, "venues"));
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Venue[];
        setVenues(data);
        setFilteredVenues(data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = venues;

    if (selectedSport !== "All") {
      result = result.filter((v) => v.sport === selectedSport);
    }

    if (search) {
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(search.toLowerCase()) ||
          v.address.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredVenues(result);
  }, [selectedSport, search, venues]);

  // Count venues by sport for the "Category Cards"
  const getCount = (sport: string) =>
    venues.filter((v) => v.sport === sport).length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* HEADER HERO */}
      <div className="relative bg-zinc-900 border-b border-zinc-800 pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">
            FIND YOUR <span className="text-lime-400">HOME COURT</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Access hundreds of premium courts and fields across the city. No
            membership required.
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500" />
            <Input
              placeholder="Search by name, location, or sport..."
              className="pl-12 h-12 bg-zinc-800/50 border-zinc-700 text-white rounded-full focus:ring-lime-400 focus:border-lime-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* CATEGORY GRID (Matches your mockup) */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-zinc-400 mb-6 uppercase tracking-wider">
          Browse by Sport
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <CategoryCard
            sport="Soccer"
            count={getCount("Soccer")}
            img="/img/soccer.jpg"
            onClick={() => setSelectedSport("Soccer")}
          />
          <CategoryCard
            sport="Basketball"
            count={getCount("Basketball")}
            img="/img/basketball.jpg"
            onClick={() => setSelectedSport("Basketball")}
          />
          <CategoryCard
            sport="Tennis"
            count={getCount("Tennis")}
            img="/img/tennis.jpg"
            onClick={() => setSelectedSport("Tennis")}
          />
          <CategoryCard
            sport="Volleyball"
            count={getCount("Volleyball")}
            img="/img/volleyball.jpg"
            onClick={() => setSelectedSport("Volleyball")}
          />
        </div>

        {/* MAIN LIST HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-3xl font-black italic text-white">
              AVAILABLE VENUES
            </h2>
            <p className="text-zinc-500">
              Showing {filteredVenues.length} results
            </p>
          </div>

          {/* SPORT FILTER TAGS */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Badge
              variant={selectedSport === "All" ? "default" : "outline"}
              className={`cursor-pointer ${selectedSport === "All" ? "bg-lime-400 text-black hover:bg-lime-500" : "text-zinc-400 hover:text-white"}`}
              onClick={() => setSelectedSport("All")}
            >
              All
            </Badge>
            {Object.values(SportType).map((sport) => (
              <Badge
                key={sport}
                variant={selectedSport === sport ? "default" : "outline"}
                className={`cursor-pointer ${selectedSport === sport ? "bg-lime-400 text-black hover:bg-lime-500" : "text-zinc-400 hover:text-white"}`}
                onClick={() => setSelectedSport(sport)}
              >
                {sport}
              </Badge>
            ))}
          </div>
        </div>

        {/* VENUE LIST */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 bg-zinc-900 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : filteredVenues.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500 mb-4">
              No venues found matching your filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedSport("All");
                setSearch("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 1. CATEGORY CARD (Like the mockup)
function CategoryCard({
  sport,
  count,
  img,
  onClick,
}: {
  sport: string;
  count: number;
  img: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="relative h-32 md:h-40 rounded-xl overflow-hidden cursor-pointer group border border-zinc-800 hover:border-lime-400 transition-all"
    >
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-zinc-800 group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="absolute bottom-4 left-4 z-10">
        <h3 className="text-lg font-bold text-white leading-none">{sport}</h3>
        <p className="text-xs text-zinc-400">{count} Venues</p>
      </div>
    </div>
  );
}

// 2. VENUE CARD
function VenueCard({ venue }: { venue: Venue }) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:border-lime-400/50 transition-all flex flex-col">
      <div className="h-48 bg-zinc-800 relative flex items-center justify-center overflow-hidden">
        {/* Placeholder Gradient if no image */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 group-hover:scale-105 transition-transform duration-700" />

        <span className="relative z-10 text-4xl font-black text-zinc-700 uppercase italic opacity-50">
          {venue.sport}
        </span>
        <Badge className="absolute top-4 right-4 bg-lime-400 text-black font-bold z-20 shadow-lg">
          ${venue.pricePerHour || 50}/hr
        </Badge>
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold italic text-white leading-tight">
            {venue.name}
          </h3>
        </div>
        <div className="flex items-center text-zinc-400 text-sm mt-1">
          <MapPin className="w-3 h-3 mr-1 text-lime-400" /> {venue.address}
        </div>
      </CardHeader>

      <CardFooter className="mt-auto pt-0">
        <Link href="/login" className="w-full">
          <Button className="w-full bg-zinc-950 border border-zinc-800 text-white font-bold hover:bg-white hover:text-black transition-all">
            Book Now <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
