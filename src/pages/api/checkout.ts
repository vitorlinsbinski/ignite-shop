import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ error: "Price IDs not found or invalid" });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}`;

  const lineItems = products.map((product) => ({
    price: product.priceId, // Use priceId para definir o preço
    quantity: product.quantity, // Use a quantidade fornecida
  }));

  const checkoutSection = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,

    mode: "payment",
    line_items: lineItems,
  });

  return res.status(201).json({
    checkoutUrl: checkoutSection.url,
  });
}
