"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UnityLogo } from "@/components/UnityLogo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Shield,
  PlayCircle,
  BarChart3,
  LogOut,
  LogIn,
  Loader2,
  Menu,
  Trophy, // <--- For Leagues
  MapPin, // <--- For Venues
} from "lucide-react";

// Firebase Imports
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // 1. Listen to Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Handle Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // --- NAVIGATION LOGIC ---

  // Menu for Signed Out Users (Public)
  const publicNav = [
    { name: "Home", href: "/", icon: LayoutDashboard },
    { name: "Leagues", href: "/leagues", icon: Trophy },
    { name: "Venues", href: "/venues", icon: MapPin },
    { name: "Rank", href: "/rank", icon: BarChart3 },
  ];

  // Menu for Signed In Users (Private Dashboard)
  const privateNav = [
    { name: "Home", href: "/dashboard", icon: LayoutDashboard },
    { name: "Squads", href: "/dashboard/squads", icon: Shield },
    { name: "Play", href: "/dashboard/play", icon: PlayCircle },
    { name: "Rank", href: "/rank", icon: BarChart3 },
  ];

  // Pick the right list based on auth state
  const navItems = user ? privateNav : publicNav;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* MOBILE MENU (Hamburger) */}
        <div className="md:hidden mr-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-zinc-950 border-zinc-800 w-[300px]"
            >
              {/* ACCESSIBILITY FIX: Required by Radix UI */}
              <SheetTitle className="sr-only">
                Mobile Navigation Menu
              </SheetTitle>

              <div className="flex flex-col gap-8 mt-8">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2"
                >
                  <UnityLogo className="w-8 h-8 text-lime-400 fill-lime-400" />
                  <span className="text-2xl font-bold italic text-white font-sans">
                    SQUADUP
                  </span>
                </Link>
                <div className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-4 text-lg font-bold uppercase tracking-widest ${
                        pathname === item.href
                          ? "text-lime-400"
                          : "text-zinc-400"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* BRAND LOGO */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center gap-2 group mr-4 md:mr-8"
        >
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800 group-hover:border-lime-400/50 transition-colors">
            <UnityLogo className="w-5 h-5 text-lime-400 fill-lime-400" />
          </div>
          <span className="hidden sm:block text-2xl font-bold italic tracking-tighter text-white group-hover:text-lime-400 transition-colors font-sans">
            SQUADUP
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors
                  ${isActive ? "text-lime-400" : "text-zinc-400 hover:text-white"}
                `}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? "text-lime-400" : "text-zinc-500"}`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* USER ACTIONS */}
        <div className="flex items-center gap-4">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
          ) : user ? (
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-zinc-400 hover:text-red-400 hover:bg-red-400/10 font-bold uppercase tracking-wider text-xs"
            >
              <LogOut className="w-4 h-4 mr-2" />{" "}
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          ) : (
            <Link href="/login">
              <Button className="bg-lime-400 text-black font-bold uppercase tracking-wider hover:bg-lime-500">
                <LogIn className="w-4 h-4 mr-2" /> Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
