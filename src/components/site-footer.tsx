import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 py-12 md:py-16">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="text-xl font-black italic tracking-tighter text-white">
            SQUAD<span className="text-lime-400">UP</span>
          </div>
          <p className="text-sm text-zinc-500 mt-2">
            © 2026 SquadUp Inc. Toronto, Canada.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="/terms" className="hover:text-lime-400 transition">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-lime-400 transition">
            Privacy Policy
          </Link>
          <Link href="/refund" className="hover:text-lime-400 transition">
            Refund Policy
          </Link>
          <Link href="/support" className="hover:text-lime-400 transition">
            Support
          </Link>
        </nav>
      </div>
    </footer>
  );
}
