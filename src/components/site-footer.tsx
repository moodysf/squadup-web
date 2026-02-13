import { UnityLogo } from "@/components/UnityLogo";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Footer Branding */}
        <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <UnityLogo className="w-5 h-5 text-zinc-300" />
          <span className="text-xl font-bold italic tracking-tighter text-zinc-300 font-sans">
            SQUADUP
          </span>
        </div>

        <div className="text-zinc-600 text-sm font-medium">
          © 2026 SquadUp Inc.
        </div>

        <div className="flex gap-6 text-zinc-500 text-sm font-bold">
          <a href="#" className="hover:text-lime-400 transition">
            Terms
          </a>
          <a href="#" className="hover:text-lime-400 transition">
            Privacy
          </a>
          <a href="#" className="hover:text-lime-400 transition">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
