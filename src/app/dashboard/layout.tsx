"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This listener fires whenever the auth state changes (login, logout, refresh)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // No user? Kick them out.
        router.push("/login");
      } else {
        // User exists? Let them see the dashboard.
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  // Show a loading spinner while we check their ID
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950 text-lime-400">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  // Render the dashboard content only if authenticated
  return <>{children}</>;
}
