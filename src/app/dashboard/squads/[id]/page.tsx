"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  ArrowLeft,
  UserPlus,
  Crown,
  Trash2,
  Search,
  LogOut,
  ShieldAlert,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// MOCK "Free Agents" for recruitment simulation
const MOCK_PLAYERS = [
  { id: "p1", name: "Sarah Connor", sport: "Soccer", status: "Free Agent" },
  { id: "p2", name: "John Wick", sport: "All", status: "Looking" },
  { id: "p3", name: "Ted Lasso", sport: "Soccer", status: "Coach" },
  { id: "p4", name: "LeBron J.", sport: "Basketball", status: "Pro" },
  { id: "p5", name: "Serena W.", sport: "Tennis", status: "Pro" },
];

export default function SquadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const squadId = params.id as string;

  const [squad, setSquad] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [invited, setInvited] = useState<string[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!squadId) return;
    const unsub = onSnapshot(doc(db, "squads", squadId), (doc) => {
      if (doc.exists()) {
        setSquad({ id: doc.id, ...doc.data() });
      } else {
        router.push("/dashboard/squads");
      }
      setLoading(false);
    });
    return () => unsub();
  }, [squadId, router]);

  const handleDeleteSquad = async () => {
    await deleteDoc(doc(db, "squads", squadId));
    router.push("/dashboard/squads");
  };

  const handleLeaveSquad = async () => {
    if (!user) return;
    await updateDoc(doc(db, "squads", squadId), {
      members: arrayRemove(user.uid),
    });
    router.push("/dashboard/squads");
  };

  const handleInvite = async (playerId: string) => {
    setInvited([...invited, playerId]);
  };

  if (loading)
    return (
      <div className="p-8 text-zinc-500 animate-pulse">
        Loading locker room...
      </div>
    );
  if (!squad) return null;

  const isCaptain = user && squad && user.uid === squad.ownerId;
  const filteredPlayers = MOCK_PLAYERS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="max-w-5xl mx-auto p-8 text-white space-y-8">
      <Link
        href="/dashboard/squads"
        className="text-zinc-400 hover:text-white flex items-center gap-2 transition text-sm font-bold"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Locker Room
      </Link>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 bg-zinc-950 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-inner">
            <span className="text-4xl font-black italic text-lime-400">
              {squad.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Badge
                variant="outline"
                className="border-lime-400/30 text-lime-400"
              >
                {squad.sport}
              </Badge>
              <div className="flex items-center text-xs text-zinc-500 font-mono">
                ID: {squad.id.slice(0, 6)}...
              </div>
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter text-white">
              {squad.name}
            </h1>
          </div>
        </div>

        <div className="flex gap-3 relative z-10">
          {/* DYNAMIC ROLE-BASED ACTION */}
          {isCaptain ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Squad
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-zinc-950 border-zinc-800 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-red-500 font-bold italic">
                    <ShieldAlert className="w-5 h-5" /> PERMANENT DELETION
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-zinc-400">
                    Careful, Captain. This will permanently disband the squad
                    and wipe all match history. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteSquad}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold"
                  >
                    Confirm Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800 text-zinc-300"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Leave Squad
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-zinc-950 border-zinc-800 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Leave the squad?</AlertDialogTitle>
                  <AlertDialogDescription className="text-zinc-400">
                    You will lose access to team management and upcoming games.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleLeaveSquad}
                    className="bg-white text-black hover:bg-zinc-200 font-bold"
                  >
                    Confirm Leave
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {/* RECRUITMENT DIALOG */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-lime-400 hover:bg-lime-500 text-black font-bold">
                <UserPlus className="w-4 h-4 mr-2" /> Recruit Players
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold italic">
                  Scout Free Agents
                </DialogTitle>
                <DialogDescription className="text-zinc-400">
                  Find players to strengthen your roster.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    placeholder="Search for players..."
                    className="pl-10 bg-zinc-900 border-zinc-800 focus-visible:ring-lime-400/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="h-[300px] overflow-y-auto space-y-2 pr-2">
                  {filteredPlayers.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 bg-zinc-800">
                          <AvatarFallback>
                            {player.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-white text-sm">
                            {player.name}
                          </div>
                          <div className="text-xs text-zinc-500">
                            {player.sport} • {player.status}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={
                          invited.includes(player.id) ? "secondary" : "default"
                        }
                        className={
                          invited.includes(player.id)
                            ? "bg-zinc-800 text-zinc-500"
                            : "bg-white text-black hover:bg-zinc-200"
                        }
                        onClick={() => handleInvite(player.id)}
                        disabled={invited.includes(player.id)}
                      >
                        {invited.includes(player.id) ? "Invited" : "Invite"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats and Roster sections remain as they were */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Wins" value={squad.wins} color="text-lime-400" />
        <StatCard label="Losses" value={squad.losses} color="text-red-400" />
        <StatCard
          label="Win Rate"
          value={`${squad.wins + squad.losses > 0 ? Math.round((squad.wins / (squad.wins + squad.losses)) * 100) : 0}%`}
          color="text-white"
        />
        <StatCard
          label="Roster"
          value={squad.members?.length || 0}
          color="text-zinc-400"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold italic pl-1 flex items-center gap-2">
          <Users className="w-5 h-5 text-zinc-500" /> ACTIVE ROSTER
        </h2>
        <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
          <Table>
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-zinc-800">
                <TableHead className="text-zinc-500 w-[50px]">Avatar</TableHead>
                <TableHead className="text-zinc-500">Player ID</TableHead>
                <TableHead className="text-zinc-500">Role</TableHead>
                <TableHead className="text-right text-zinc-500">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {squad.members?.map((memberId: string) => (
                <TableRow key={memberId} className="border-zinc-800">
                  <TableCell>
                    <Avatar className="h-8 w-8 bg-zinc-800 border border-zinc-700">
                      <AvatarFallback className="text-xs text-zinc-400">
                        {memberId.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-zinc-400">
                    {memberId === user?.uid ? (
                      <span className="text-lime-400 font-bold">(You)</span>
                    ) : (
                      memberId
                    )}
                  </TableCell>
                  <TableCell>
                    {memberId === squad.captainId ? (
                      <span className="inline-flex items-center gap-1 text-yellow-500 text-xs font-bold border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 rounded-full">
                        <Crown className="w-3 h-3" /> CAPTAIN
                      </span>
                    ) : (
                      <span className="text-zinc-500 text-xs font-bold">
                        MEMBER
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                      ACTIVE
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: any) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-6 text-center">
        <div className={`text-3xl font-black ${color}`}>{value}</div>
        <div className="text-xs font-bold text-zinc-500 uppercase mt-1">
          {label}
        </div>
      </CardContent>
    </Card>
  );
}
