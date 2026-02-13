import React from "react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen p-8 md:p-24 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-white">PRIVACY POLICY</h1>
        <p className="text-gray-400">Last Updated: February 2026</p>
      </div>

      <div className="shard-box">
        <p>
          <strong>17522398 CANADA INC.</strong> ("SquadUp", "we", "us") is
          committed to protecting your privacy. This policy explains how we
          collect data when you use our mobile application and services.
        </p>

        <h2>1. Data We Collect</h2>
        <p>
          To provide our services, we use Google Firebase and collect the
          following:
        </p>
        <ul className="list-disc pl-5 text-gray-400 mb-4">
          <li>
            <strong>Contact Info:</strong> Phone number (for authentication),
            email address, and display name.
          </li>
          <li>
            <strong>Identifiers:</strong> A unique User ID assigned to your
            account.
          </li>
          <li>
            <strong>Squad Data:</strong> Roster information, game statistics
            (wins/losses), and league participation.
          </li>
        </ul>

        <h2>2. How We Use Data</h2>
        <p>
          We use your data solely for App Functionality (logging you in,
          displaying your squad) and Analytics (improving app performance).
        </p>

        <h2>3. Payments</h2>
        <p>
          We use Stripe and Apple Pay for venue bookings. We do not store your
          credit card information on our servers.
        </p>

        <h2>4. Contact Us</h2>
        <p>
          If you have questions about your data, email us at{" "}
          <a href="mailto:privacy@squadup.cc">privacy@squadup.cc</a>.
        </p>
      </div>
    </main>
  );
}
