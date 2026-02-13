"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function RosterPage() {
  const { id } = useParams();
  const [squad, setSquad] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoster = async () => {
      const docRef = doc(db, "squads", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSquad(docSnap.data());
      }
      setLoading(false);
    };
    fetchRoster();
  }, [id]);

  if (loading)
    return <div className="p-8 text-[#D0FF00]">LOADING ROSTER...</div>;
  if (!squad) return <div className="p-8 text-white">Squad not found.</div>;

  return (
    <main className="min-h-screen bg-[#0D0D14] p-8">
      <h1 className="text-4xl font-black text-white italic mb-8 uppercase">
        {squad.name} <span className="text-[#D0FF00]">ROSTER</span>
      </h1>

      <div className="grid gap-4">
        {squad.members?.map((memberId: string, index: number) => (
          <div
            key={memberId}
            className="bg-[#1A1A24] border border-white/5 p-4 rounded flex justify-between items-center"
          >
            <span className="text-gray-400 font-mono">#{index + 1}</span>
            <span className="text-white font-bold">{memberId}</span>
            <span className="text-[#D0FF00] text-xs">ACTIVE</span>
          </div>
        ))}
        {(!squad.members || squad.members.length === 0) && (
          <p className="text-gray-500">No players in this squad yet.</p>
        )}
      </div>
    </main>
  );
}
