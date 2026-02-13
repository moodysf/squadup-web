"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";

// Define the shape of your Squad data (matching Swift)
interface Squad {
  id: string;
  name: string; // e.g., "Zulu FC"
  sport: string; // e.g., "Soccer"
  captainId: string;
  playerIds: string[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Listen for Auth State
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login"); // Kick out if not logged in
        return;
      }
      setUser(currentUser);

      // 2. Fetch Squads where user is Captain OR Player
      try {
        const squadsRef = collection(db, "squads");

        // Query 1: Squads I captain
        const memberQuery = query(
          squadsRef,
          where("members", "array-contains", currentUser.uid),
        );
        const ownerQuery = query(
          squadsRef,
          where("ownerId", "==", currentUser.uid),
        );
        const [memberSnap, ownerSnap] = await Promise.all([
          getDocs(memberQuery),
          getDocs(ownerQuery),
        ]);

        const fetchedSquads: Squad[] = [];
        const squadMap = new Map();

        [...memberSnap.docs, ...ownerSnap.docs].forEach((doc) => {
          squadMap.set(doc.id, { id: doc.id, ...doc.data() });
        });

        setSquads(Array.from(squadMap.values()));
      } catch (error) {
        console.error("Error fetching squads:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center text-[#D0FF00] font-mono animate-pulse">
        LOADING ROSTER...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D0D14] p-4 md:p-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-black text-white italic">
          MY <span className="text-[#D0FF00]">SQUADS</span>
        </h1>
        <button
          onClick={() => auth.signOut()}
          className="text-xs text-gray-500 hover:text-white uppercase tracking-widest border border-gray-700 px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>

      {/* Content Area */}
      {squads.length === 0 ? (
        // EMPTY STATE
        <div className="text-center text-gray-500 mt-20">
          <p className="mb-4">No active squads found.</p>
          <div className="inline-block border border-dashed border-gray-700 p-8 rounded-xl">
            <span className="text-sm">
              Create a squad in the iOS App to see it here.
            </span>
          </div>
        </div>
      ) : (
        // SQUAD LIST
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {squads.map((squad) => (
            <Link
              href={`/dashboard/${squad.id}`}
              key={squad.id}
              className="block group"
            >
              <div className="bg-[#1A1A24] border border-white/10 p-6 rounded-xl relative overflow-hidden group-hover:border-[#D0FF00] transition-colors cursor-pointer">
                {/* ... keep the inner card content (h2, badges, etc) the same ... */}
                <h2 className="text-3xl font-black text-white italic mb-1 uppercase group-hover:text-[#D0FF00] transition-colors">
                  {squad.name}
                </h2>
                {/* ... rest of your existing card code ... */}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
