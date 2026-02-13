"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Plus, Users, ChevronRight, Loader2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// FIREBASE IMPORTS
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function SquadsPage() {
  // Form State
  const [squadName, setSquadName] = useState("");
  const [sport, setSport] = useState("");
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  // Data State
  const [squads, setSquads] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Check Auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // 2. Real-time Listener for Squads
  useEffect(() => {
    if (!user) return;

    // Query: Find squads where I am listed in the 'members' array
    const q = query(
      collection(db, "squads"),
      where("members", "array-contains", user.uid),
    );

    // onSnapshot gives us real-time updates automatically
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveSquads = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSquads(liveSquads);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // 3. Create Squad Function
  const handleCreate = async () => {
    if (!squadName || !sport || !user) return;
    setCreating(true);

    try {
      await addDoc(collection(db, "squads"), {
        name: squadName,
        sport: sport,
        captainId: user.uid,
        captainName: user.displayName || "Unknown Captain",
        members: [user.uid], // You start as the only member
        wins: 0,
        losses: 0,
        createdAt: new Date(),
      });

      setOpen(false);
      setSquadName("");
    } catch (error) {
      console.error("Error creating squad:", error);
      alert("Failed to save squad. Check console.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 text-white space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter flex items-center gap-3">
            MY <span className="text-violet-500">LOCKER ROOM</span>
          </h1>
          <p className="text-zinc-400">
            Manage your rosters, track stats, and schedule matches.
          </p>
        </div>

        {/* CREATE DIALOG */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6">
              <Plus className="w-4 h-4 mr-2" /> Create New Squad
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold italic">
                Establish a New Squad
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                You will be assigned as the Captain.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Squad Name</Label>
                <Input
                  placeholder="e.g. Mighty Ducks"
                  className="bg-zinc-950 border-zinc-800 focus-visible:ring-violet-500"
                  value={squadName}
                  onChange={(e) => setSquadName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Sport</Label>
                <Select onValueChange={setSport}>
                  <SelectTrigger className="bg-zinc-950 border-zinc-800">
                    <SelectValue placeholder="Select sport" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="soccer">Soccer</SelectItem>
                    <SelectItem value="basketball">Basketball</SelectItem>
                    <SelectItem value="volleyball">Volleyball</SelectItem>
                    <SelectItem value="cricket">Cricket</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleCreate}
                disabled={creating}
                className="w-full bg-violet-600 hover:bg-violet-700 font-bold"
              >
                {creating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Squad
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* SQUADS GRID */}
      {loading ? (
        <div className="text-zinc-500 animate-pulse">
          Loading your locker room...
        </div>
      ) : squads.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/50">
          <p className="text-zinc-400 mb-4">
            You haven't joined any squads yet.
          </p>
          <Button variant="outline" onClick={() => setOpen(true)}>
            Create Your First Squad
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {squads.map((squad) => (
            <Link href={`/dashboard/squads/${squad.id}`} key={squad.id}>
              <Card className="bg-zinc-900 border-zinc-800 group hover:border-violet-500/50 transition-all cursor-pointer h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge
                        variant="outline"
                        className="border-zinc-700 text-zinc-500 mb-2"
                      >
                        {squad.sport.toUpperCase()}
                      </Badge>
                      <CardTitle className="text-2xl font-black italic text-white">
                        {squad.name}
                      </CardTitle>
                    </div>
                    {squad.captainId === user?.uid && (
                      <Badge className="bg-violet-500/20 text-violet-300 border border-violet-500/50 hover:bg-violet-500/30">
                        Captain
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <StatBox
                      label="Wins"
                      value={squad.wins}
                      color="text-green-400"
                    />
                    <StatBox
                      label="Losses"
                      value={squad.losses}
                      color="text-red-400"
                    />
                    <StatBox
                      label="Roster"
                      value={squad.members.length}
                      color="text-zinc-300"
                    />
                  </div>
                  <div className="flex items-center text-sm font-bold text-zinc-500 group-hover:text-violet-400 transition-colors">
                    Manage Roster <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value, color }: any) {
  return (
    <div className="bg-zinc-950 rounded-lg p-3 text-center border border-zinc-800">
      <div className={`text-xl font-black ${color}`}>{value}</div>
      <div className="text-[10px] uppercase font-bold text-zinc-600">
        {label}
      </div>
    </div>
  );
}
