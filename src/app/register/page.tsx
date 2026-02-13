"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { User, Mail, Lock, Loader2, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

      <Link
        href="/"
        className="absolute top-8 left-8 text-zinc-400 hover:text-white flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <Card className="w-full max-w-md bg-zinc-900/80 border-zinc-800 backdrop-blur-xl relative z-10 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-violet-400">
            <User className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-black italic text-white tracking-tighter">
            JOIN THE SQUAD
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Create your player profile to get started.
          </CardDescription>
        </CardHeader>

        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="name"
                  placeholder="Mahmoud Youssef"
                  className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-violet-400/50"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="player@squadup.cc"
                  className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-violet-400/50"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10 bg-zinc-950 border-zinc-800 text-white focus-visible:ring-violet-400/50"
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              className="w-full bg-violet-600 text-white font-bold hover:bg-violet-700 transition-all"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>

            <div className="text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-white hover:text-violet-400 font-medium underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
