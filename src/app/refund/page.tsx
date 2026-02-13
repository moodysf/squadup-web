import React from "react";

export default function RefundPage() {
  return (
    <main className="min-h-screen p-8 md:p-24 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-white">REFUND POLICY</h1>
        <p className="text-gray-400">Effective Date: February 12, 2026</p>
      </div>

      <div className="shard-box">
        <p>
          <strong>All sales on SquadUp are final.</strong> However, we
          understand that life happens. Here is how cancellations work for venue
          bookings and league fees.
        </p>

        <h2>1. Venue Bookings</h2>
        <p>
          Bookings made through the "PLAY" tab are subject to the specific
          cancellation policy of the venue (e.g., HoopDome, The Hangar).
        </p>
        <ul className="list-disc pl-5 text-gray-400 mb-4">
          <li>
            <strong> 48 Hours Notice:</strong> Full refund to your original
            payment method.
          </li>
          <li>
            <strong> 48 Hours Notice:</strong> No refund, as the venue cannot
            resell the slot.
          </li>
        </ul>

        <h2>2. League Fees</h2>
        <p>
          League registration fees are fully refundable up to{" "}
          <strong>7 days before the season starts</strong>. Once the schedule is
          published, no refunds can be issued.
        </p>

        <h2>3. How to Request</h2>
        <p>
          To request a cancellation, email{" "}
          <a href="mailto:support@squadup.cc">support@squadup.cc</a> with your
          Booking ID.
        </p>
      </div>
    </main>
  );
}
