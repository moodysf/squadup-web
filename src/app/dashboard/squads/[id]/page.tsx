"use client";

import { useParams } from "next/navigation"; // To get the ID
import { ArrowLeft, UserPlus, Settings, Crown, Trash2 } from "lucide-react";
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
import Link from "next/link";

// Mock Roster Data
const ROSTER = [
  {
    id: 1,
    name: "Mahmoud Youssef",
    role: "Captain",
    avatar: "MY",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Connor",
    role: "Member",
    avatar: "SC",
    status: "Active",
  },
  { id: 3, name: "John Wick", role: "Member", avatar: "JW", status: "Injured" },
];

export default function SquadDetailPage() {
  const params = useParams();
  const squadId = params.id; // "squad_1"

  return (
    <div className="max-w-5xl mx-auto p-8 text-white space-y-8">
      {/* Top Nav */}
      <Link
        href="/dashboard/squads"
        className="text-zinc-400 hover:text-white flex items-center gap-2 transition text-sm font-bold"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Locker Room
      </Link>

      {/* Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-violet-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-900/20">
            <span className="text-4xl font-black italic">Z</span>
          </div>
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter">
              ZULU FC
            </h1>
            <div className="flex gap-4 mt-2 text-zinc-400 font-medium">
              <span>Soccer</span>
              <span>•</span>
              <span>Est. 2026</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-zinc-700 hover:bg-zinc-800 text-zinc-300"
          >
            <Settings className="w-4 h-4 mr-2" /> Settings
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white font-bold">
            <UserPlus className="w-4 h-4 mr-2" /> Invite Player
          </Button>
        </div>
      </div>

      {/* Roster Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold italic pl-1">
          ACTIVE ROSTER ({ROSTER.length})
        </h2>
        <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
          <Table>
            <TableHeader className="bg-zinc-900">
              <TableRow className="border-zinc-800 hover:bg-zinc-900">
                <TableHead className="text-zinc-500">Player</TableHead>
                <TableHead className="text-zinc-500">Role</TableHead>
                <TableHead className="text-zinc-500">Status</TableHead>
                <TableHead className="text-right text-zinc-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROSTER.map((player) => (
                <TableRow
                  key={player.id}
                  className="border-zinc-800 hover:bg-zinc-800/50"
                >
                  <TableCell className="font-medium text-white flex items-center gap-3">
                    <Avatar className="h-8 w-8 bg-zinc-800 border border-zinc-700">
                      <AvatarFallback className="text-xs text-zinc-400">
                        {player.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {player.name}
                  </TableCell>
                  <TableCell>
                    {player.role === "Captain" ? (
                      <span className="inline-flex items-center gap-1 text-yellow-500 text-xs font-bold border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 rounded-full">
                        <Crown className="w-3 h-3" /> CAPTAIN
                      </span>
                    ) : (
                      <span className="text-zinc-400 text-sm">Member</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        player.status === "Active"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {player.status.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-500 hover:text-red-400 hover:bg-red-400/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
