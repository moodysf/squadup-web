export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-zinc-300">
      <h1 className="text-4xl md:text-5xl font-black italic text-white mb-8 tracking-tighter">
        PRIVACY <span className="text-lime-400">POLICY</span>
      </h1>

      <div className="space-y-8 text-lg leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            1. Data We Collect
          </h2>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, create a squad, or contact customer support. This
            may include:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>Name, email address, and profile picture (via Google Auth).</li>
            <li>Location data (to suggest nearby venues and leagues).</li>
            <li>Match history and performance statistics.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            2. How We Use Your Data
          </h2>
          <p>
            We use the information we collect to operate and maintain our
            services, including:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>Facilitating squad creation and match scheduling.</li>
            <li>Calculating rankings and leaderboards.</li>
            <li>
              Sending you technical notices, updates, and support messages.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            3. Data Storage
          </h2>
          <p>
            Your data is securely stored using Google Firebase services. We
            implement appropriate technical and organizational measures to
            protect your personal data against unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:{" "}
            <a
              href="mailto:privacy@squadup.cc"
              className="text-lime-400 hover:underline"
            >
              privacy@squadup.cc
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
