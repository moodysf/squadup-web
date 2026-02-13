"use client";

import { useState } from "react";
import { collection, writeBatch, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database, Trash2, Loader2, CheckCircle2 } from "lucide-react";

// --- DUMMY DATA ---

const MOCK_VENUES = [
  {
    name: "The Hangar Sport Court",
    address: "75 Carl Hall Rd, Toronto",
    sport: "Soccer",
    pricePerHour: 120,
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Raptors OVO Centre",
    address: "1 Fort York Blvd, Toronto",
    sport: "Basketball",
    pricePerHour: 150,
    image:
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Spadina Volleyball Courts",
    address: "255 Spadina Ave, Toronto",
    sport: "Volleyball",
    pricePerHour: 80,
    image:
      "https://images.unsplash.com/photo-1612872087720-48ca45e4c6c9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "High Park Tennis Club",
    address: "High Park, Toronto",
    sport: "Tennis",
    pricePerHour: 40,
    image:
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1000&auto=format&fit=crop",
  },
];

const MOCK_SQUADS = [
  { name: "Downtown Dribblers", sport: "Basketball", wins: 12, losses: 2 },
  { name: "Net Rippers FC", sport: "Soccer", wins: 8, losses: 5 },
  { name: "Spike Spiegel", sport: "Volleyball", wins: 15, losses: 1 },
  { name: "Bench Warmers", sport: "Basketball", wins: 2, losses: 10 },
  { name: "The Invincibles", sport: "Soccer", wins: 20, losses: 0 },
];

export default function AdminPage() {
  const [loading, setLoading] = useState("");
  const [status, setStatus] = useState("");

  const seedVenues = async () => {
    setLoading("venues");
    try {
      const batch = writeBatch(db);

      MOCK_VENUES.forEach((venue) => {
        // Create a reference with a random ID
        const ref = doc(collection(db, "venues"));
        batch.set(ref, venue);
      });

      await batch.commit();
      setStatus("Venues seeded successfully!");
    } catch (e) {
      console.error(e);
      setStatus("Error seeding venues.");
    } finally {
      setLoading("");
    }
  };

  const seedSquads = async () => {
    setLoading("squads");
    try {
      const batch = writeBatch(db);

      MOCK_SQUADS.forEach((squad) => {
        const ref = doc(collection(db, "squads"));
        batch.set(ref, {
          ...squad,
          members: [], // Empty for now
          captainId: "system",
          createdAt: new Date(),
        });
      });

      await batch.commit();
      setStatus("Squads seeded successfully!");
    } catch (e) {
      console.error(e);
      setStatus("Error seeding squads.");
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 text-white space-y-8">
      <div>
        <h1 className="text-3xl font-black italic text-red-500 flex items-center gap-3">
          <Database className="w-8 h-8" /> GOD MODE
        </h1>
        <p className="text-zinc-400">
          Populate your database with testing data.
          <span className="text-red-400 font-bold ml-1">
            Warning: Irreversible.
          </span>
        </p>
      </div>

      {status && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-lg flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2" /> {status}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Seed Venues */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Venues Database</CardTitle>
            <CardDescription>
              Adds 4 Toronto-based venues with images.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={seedVenues}
              disabled={!!loading}
              className="w-full bg-zinc-800 hover:bg-zinc-700 font-bold"
            >
              {loading === "venues" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Seed Venues
            </Button>
          </CardContent>
        </Card>

        {/* Seed Leaderboard */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Global Leaderboard</CardTitle>
            <CardDescription>
              Adds 5 fake squads with win/loss records.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={seedSquads}
              disabled={!!loading}
              className="w-full bg-zinc-800 hover:bg-zinc-700 font-bold"
            >
              {loading === "squads" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Seed Squads
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
