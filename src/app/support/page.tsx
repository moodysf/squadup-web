import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, ShieldAlert } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black italic text-white mb-6 tracking-tighter">
          HOW CAN WE <span className="text-lime-400">HELP?</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Having trouble with your squad? Found a bug? We&apos;re here to get
          you back in the game.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {/* 1. GENERAL SUPPORT */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <Mail className="w-10 h-10 text-lime-400 mb-2" />
            <CardTitle className="text-white">General Inquiries</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-400 flex flex-col h-full justify-between">
            <p className="mb-4">
              Questions about features, pricing, or partnerships.
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full border-zinc-700 text-white hover:bg-lime-400 hover:text-black hover:border-lime-400"
            >
              <a href="mailto:support@squadup.cc?subject=General Inquiry - SquadUp">
                Email Us
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* 2. REPORT USER / SAFETY */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <ShieldAlert className="w-10 h-10 text-red-500 mb-2" />
            <CardTitle className="text-white">Report an Issue</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-400 flex flex-col h-full justify-between">
            <p className="mb-4">
              Report bad sportsmanship, harassment, or safety concerns.
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full border-zinc-700 text-white hover:bg-red-500 hover:text-white hover:border-red-500"
            >
              {/* UPDATED EMAIL: report@squadup.cc */}
              <a href="mailto:report@squadup.cc?subject=URGENT: Safety Report&body=Please describe the incident:%0D%0A%0D%0AUser(s) involved:%0D%0ADate/Time:%0D%0A">
                Report User
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* 3. DEV / BUG REPORT */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <MessageSquare className="w-10 h-10 text-blue-400 mb-2" />
            <CardTitle className="text-white">Technical Support</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-400 flex flex-col h-full justify-between">
            <p className="mb-4">
              App crashing? Login issues? Let our dev team know.
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full border-zinc-700 text-white hover:bg-blue-400 hover:text-black hover:border-blue-400"
            >
              {/* UPDATED EMAIL: devs@squadup.cc */}
              <a href="mailto:devs@squadup.cc?subject=Bug Report - Web App&body=Device:%0D%0ABrowser:%0D%0AIssue Description:%0D%0A">
                Contact Devs
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold italic text-white mb-8 text-center">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "How do I create a squad?",
              a: "Navigate to the Dashboard, click on 'Squads', and select 'Create New Squad'. You'll need to give it a name and pick a sport.",
            },
            {
              q: "Is SquadUp free?",
              a: "Yes! Creating a squad and logging matches is completely free. We will introduce premium league features in late 2026.",
            },
            {
              q: "How are ranks calculated?",
              a: "Ranks are based on your Win/Loss ratio and the strength of the opponents you defeat.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl"
            >
              <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
              <p className="text-zinc-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
