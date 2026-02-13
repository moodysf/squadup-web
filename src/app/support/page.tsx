export default function SupportPage() {
  return (
    <main className="min-h-screen p-8 md:p-24 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      {/* Visual Icon */}
      <div className="w-20 h-20 bg-[#D0FF00] rounded-full flex items-center justify-center mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </div>

      <h1 className="text-white">NEED BACKUP?</h1>
      <p className="text-xl text-gray-400 mb-8">
        Found a bug? Can't find your squad? We're here to help.
      </p>

      <div className="shard-box w-full text-left">
        <h2>General Inquiries</h2>
        <p>
          For account issues or bug reports, please email our Toronto team
          directly:
        </p>
        <a
          href="mailto:support@squadup.cc"
          className="text-2xl font-bold block mb-8 hover:opacity-80"
        >
          support@squadup.cc
        </a>

        <h2>Common Issues</h2>
        <ul className="list-disc pl-5 text-gray-400 space-y-2">
          <li>
            <strong>Invite Code not working?</strong> Ensure you are entering
            the 6-digit code exactly as shown on your Captain's screen.
          </li>
          <li>
            <strong>Wrong Venue?</strong> Venue bookings are managed by the
            specific facility (e.g., HoopDome). Contact them directly for urgent
            cancellations.
          </li>
        </ul>
      </div>
    </main>
  );
}
