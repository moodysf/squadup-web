import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

export async function POST(request: Request) {
  try {
    const { type, data, userId, userEmail } = await request.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    let price = 0;
    let title = "";

    // Metadata is critical here: It tells YOU what to book for them.
    let metadata: any = {
      status: "pending_approval", // <--- Key change
      userId,
      userEmail,
      type,
    };

    if (type === "booking") {
      price = data.venuePrice * 100;
      title = `Request: ${data.venueName}`;
      metadata.venueId = data.venueId;
      metadata.venueName = data.venueName; // Save name so you don't have to look it up
      metadata.date = data.date;
      metadata.time = data.time;
    } else if (type === "pickup") {
      price = data.price * 100;
      title = `Join Request: ${data.sport}`;
      metadata.sessionId = data.sessionId;
      metadata.sport = data.sport;
    } else if (type === "league") {
      price = data.fee * 100;
      title = `League Application: ${data.leagueName}`;
      metadata.leagueId = data.leagueId;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: title,
              description:
                "Concierge Booking: We will confirm this slot manually.",
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}&type=${type}`, // Pass type back
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
