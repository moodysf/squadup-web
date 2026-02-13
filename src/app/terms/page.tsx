export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-zinc-300">
      <h1 className="text-4xl md:text-5xl font-black italic text-white mb-8 tracking-tighter">
        TERMS OF <span className="text-lime-400">SERVICE</span>
      </h1>

      <div className="space-y-8 text-lg leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            1. Introduction
          </h2>
          <p>
            Welcome to SquadUp. By accessing our website and mobile application,
            you agree to be bound by these Terms of Service, all applicable laws
            and regulations, and agree that you are responsible for compliance
            with any applicable local laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the
            materials (information or software) on SquadUp&apos;s website for
            personal, non-commercial transitory viewing only. This is the grant
            of a license, not a transfer of title.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            3. Physical Activity Disclaimer
          </h2>
          <p className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <strong className="text-white block mb-2">Warning:</strong> SquadUp
            connects users for physical sports activities. You acknowledge that
            participation in these activities involves inherent risks of
            physical injury. By using SquadUp, you voluntarily assume all risks
            associated with participation. SquadUp Inc. is not liable for any
            injuries, damages, or losses sustained during matches organized
            through our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            4. Code of Conduct
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Users must treat fellow players with respect and sportsmanship.
            </li>
            <li>
              Harassment, hate speech, or violent behavior at venues will result
              in immediate account termination.
            </li>
            <li>
              &quot;No-shows&quot; for scheduled matches may result in temporary
              suspension.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            5. Governing Law
          </h2>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of Ontario, Canada, and you irrevocably
            submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>
      </div>
    </div>
  );
}
