"use client";

import Link from "next/link";
import {
  LogOut,
  User,
  Bell,
  CreditCard,
  Shield,
  FileText,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-white space-y-8">
      <h1 className="text-3xl font-black italic">SETTINGS</h1>

      <div className="grid gap-8">
        {/* Profile Card */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription className="text-zinc-400">
              Manage your public appearance.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <Avatar className="w-20 h-20 border-2 border-zinc-700">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>MY</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300"
              >
                Change Avatar
              </Button>
              <p className="text-xs text-zinc-500">JPG or PNG. Max 1MB.</p>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-zinc-200">
                  Match Reminders
                </Label>
                <p className="text-sm text-zinc-500">
                  Receive notifications 2 hours before kickoff.
                </p>
              </div>
              <Switch />
            </div>
            <Separator className="bg-zinc-800" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-zinc-200">
                  Marketing Emails
                </Label>
                <p className="text-sm text-zinc-500">
                  Receive news about new leagues and venues.
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Legal & Support Links */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Support & Legal</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-1">
            <SettingsLink
              href="/support"
              icon={HelpCircle}
              label="Help & Support"
            />
            <SettingsLink
              href="/privacy"
              icon={Shield}
              label="Privacy Policy"
            />
            <SettingsLink
              href="/terms"
              icon={FileText}
              label="Terms of Service"
            />
            <SettingsLink
              href="/refund"
              icon={CreditCard}
              label="Refund Policy"
            />
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-900/50 bg-red-950/10">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-bold text-red-500">Log Out</h3>
              <p className="text-sm text-red-400/60">
                End your current session.
              </p>
            </div>
            <Link href="/">
              <Button
                variant="destructive"
                className="bg-red-900 hover:bg-red-800 text-red-100"
              >
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SettingsLink({ href, icon: Icon, label }: any) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-zinc-500 group-hover:text-white" />
        <span className="font-medium text-zinc-300 group-hover:text-white">
          {label}
        </span>
      </div>
      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white" />
    </Link>
  );
}
