import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0D0D14] text-white p-4 relative overflow-hidden">
      {/* Background Shards - Kept these, they add depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D0FF00] opacity-5 blur-3xl rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1A1A24] opacity-40 blur-2xl rounded-full pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="z-10 flex flex-col items-center text-center max-w-2xl">
        {/* THE REAL LOGO */}
        <div className="relative w-40 h-40 md:w-56 md:h-56 mb-6 shadow-[0_0_40px_rgba(208,255,0,0.3)] rounded-3xl overflow-hidden border border-white/10 bg-black/50">
          <Image
            src="/logo.png"
            alt="SquadUp Logo"
            fill
            className="object-contain p-4"
            priority
          />
        </div>

        {/* Text Below Logo */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-2 italic text-white">
          SQUAD<span className="text-[#D0FF00]">UP</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-10 font-light tracking-wide max-w-lg">
          The #1 Roster Manager for Toronto's recreational leagues.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col w-full sm:flex-row gap-4 justify-center items-center">
          <button className="w-full sm:w-auto bg-[#D0FF00] text-black font-bold text-lg px-10 py-4 skew-x-[-10deg] hover:bg-white transition-all shadow-[0_0_20px_rgba(208,255,0,0.4)]">
            <span className="block skew-x-[10deg]">DOWNLOAD APP</span>
          </button>

          <Link
            href="/login"
            className="w-full sm:w-auto border border-gray-600 text-gray-300 font-bold text-lg px-10 py-4 skew-x-[-10deg] hover:border-[#D0FF00] hover:text-[#D0FF00] transition-colors"
          >
            <span className="block skew-x-[10deg]">WEB LOGIN</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 flex gap-8 text-xs text-gray-500 uppercase tracking-widest">
        <Link
          href="/privacy"
          className="hover:text-[#D0FF00] transition-colors"
        >
          Privacy
        </Link>
        <Link
          href="/support"
          className="hover:text-[#D0FF00] transition-colors"
        >
          Support
        </Link>
      </div>
    </main>
  );
}
