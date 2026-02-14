import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any, // Use latest API version
});

export async function POST(request: Request) {
  try {
    const { type, data, userId, userEmail } = await request.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    let price = 0;
    let title = "";
    let metadata = {};

    // 1. VENUE BOOKING
    if (type === "booking") {
      price = data.venuePrice * 100; // Cents
      title = `Booking: ${data.venueName} (${data.date} @ ${data.time})`;
      metadata = {
        type: "booking",
        userId,
        venueId: data.venueId,
        date: data.date,
        time: data.time,
      };
    }
    // 2. PICKUP SESSION
    else if (type === "pickup") {
      price = data.price * 100;
      title = `Pickup: ${data.sport} at ${data.venue}`;
      metadata = {
        type: "pickup",
        userId,
        sessionId: data.sessionId,
      };
    }
    // 3. LEAGUE REGISTRATION
    else if (type === "league") {
      price = data.fee * 100;
      title = `League Fee: ${data.leagueName}`;
      metadata = {
        type: "league",
        userId,
        leagueId: data.leagueId,
        squadId: data.squadId || "individual",
      };
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: { name: title },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/dashboard?success=true`,
      cancel_url: `${baseUrl}/dashboard?canceled=true`,
      metadata: metadata,
      customer_email: userEmail,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
