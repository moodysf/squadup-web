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
  Trophy,
  MapPin,
} from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // --- UPDATED NAV LOGIC ---
  // Public: NO "Home" tab. Logo handles home.
  const publicNav = [
    { name: "Leagues", href: "/leagues", icon: Trophy },
    { name: "Venues", href: "/venues", icon: MapPin },
    { name: "Rank", href: "/rank", icon: BarChart3 },
  ];

  // Private: "Home" is now "Overview"
  const privateNav = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard }, // Renamed from Home
    { name: "Squads", href: "/dashboard/squads", icon: Shield },
    { name: "Play", href: "/dashboard/play", icon: PlayCircle },
    { name: "Rank", href: "/rank", icon: BarChart3 },
  ];

  const navItems = user ? privateNav : publicNav;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* 1. LEFT: LOGO (Width fixed to balance layout) */}
        <div className="flex w-[200px] items-center gap-4">
          {/* Mobile Trigger */}
          <div className="md:hidden">
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
                <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
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

          <Link
            href={user ? "/dashboard" : "/"}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800 group-hover:border-lime-400/50 transition-colors">
              <UnityLogo className="w-5 h-5 text-lime-400 fill-lime-400" />
            </div>
            <span className="hidden sm:block text-2xl font-bold italic tracking-tighter text-white group-hover:text-lime-400 transition-colors font-sans">
              SQUADUP
            </span>
          </Link>
        </div>

        {/* 2. CENTER: NAVIGATION (Flex-1 to take up space, Justify-Center to align items) */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
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

        {/* 3. RIGHT: USER ACTIONS (Width fixed to balance layout) */}
        <div className="flex w-[200px] justify-end items-center gap-4">
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
