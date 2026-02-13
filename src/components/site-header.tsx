"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter
import { useEffect, useState } from "react"; // Added state hooks
import { onAuthStateChanged, signOut } from "firebase/auth"; // Added auth imports
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Shield,
  Trophy,
  PlayCircle,
  LogOut,
  BarChart3,
  LucideIcon,
} from "lucide-react";

interface Route {
  label: string;
  href: string;
  icon?: LucideIcon;
}

const publicRoutes: Route[] = [
  { label: "Features", href: "/#features" },
  { label: "Venues", href: "/venues" },
  { label: "Leagues", href: "/leagues" },
  { label: "Rank", href: "/rank" },
];

const appRoutes: Route[] = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Squads", href: "/dashboard/squads", icon: Shield },
  { label: "Play", href: "/dashboard/play", icon: PlayCircle },
  { label: "Rank", href: "/rank", icon: BarChart3 },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Real-time auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <div className="text-2xl font-black italic tracking-tighter text-white">
            SQUAD<span className="text-lime-400">UP</span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-8">
          {(user ? appRoutes : publicRoutes).map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-lime-400 flex items-center gap-2 ${
                pathname === route.href ? "text-lime-400" : "text-zinc-400"
              }`}
            >
              {user && route.icon && <route.icon className="w-4 h-4" />}
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 font-bold"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-bold text-zinc-400 hover:text-white uppercase"
              >
                Sign In
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-lime-400 text-black hover:bg-lime-500 font-bold rounded-full px-6"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
