import { Card, CardContent } from "@/components/ui/card";
import { UpcomingGames } from "@/components/upcoming-games";
import { MapPin, Trophy, Shield, Link } from "lucide-react";
import { Activity } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 p-8">
      {/* Container to center content */}
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center border-b border-zinc-800 pb-6">
          <h1 className="text-4xl font-black italic text-white tracking-tighter">
            SQUAD<span className="text-green-400">UP</span>
          </h1>
          <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-bold">
            MY
          </div>
        </header>
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAction
            href="/dashboard/book"
            icon={MapPin}
            label="Book Venue"
            color="text-green-400"
          />
          <QuickAction
            href="/dashboard/pickup"
            icon={Activity}
            label="Find Pickup"
            color="text-blue-400"
          />
          <QuickAction
            href="/dashboard/leagues"
            icon={Trophy}
            label="Join League"
            color="text-yellow-400"
          />
          <QuickAction
            href="/dashboard/squads"
            icon={Shield}
            label="Create Squad"
            color="text-violet-400"
          />
        </div>
        {/* Your New Dynamic Component */}
        <UpcomingGames />
      </div>
    </main>
  );
}

function QuickAction({ href, icon: Icon, label, color }: any) {
  return (
    <Link href={href}>
      <Card className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
          <div
            className={`p-3 rounded-full bg-zinc-950 border border-zinc-800 ${color}`}
          >
            <Icon className="w-6 h-6" />
          </div>
          <span className="font-bold text-sm text-zinc-300">{label}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
