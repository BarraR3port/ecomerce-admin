import type Stripe from "stripe";

import { headers } from "next/headers";

import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";

import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
	const body = await req.text();
	const sig = headers().get("Stripe-Signature") as string;

	let event: Stripe.Event;

	if (!sig) {
		return new NextResponse("Firma no encontrada", { status: 400 });
	}
	if (!process.env.STRIPE_WEBHOOK_SECRET) {
		return new NextResponse("Secret no encontrado", { status: 400 });
	}

	try {
		event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
	} catch (_err) {
		return new NextResponse("Webhook no validado", { status: 400 });
	}

	const session = event.data.object as Stripe.Checkout.Session;
	const address = session?.customer_details?.address;
	const addressComponents = [
		address?.line1,
		address?.line2,
		address?.city,
		address?.state,
		address?.postal_code,
		address?.country
	];

	const addressString = addressComponents.filter(c => c !== null).join(", ");

	if (event.type === "checkout.session.completed") {
		const order = await prisma.order.update({
			where: {
				id: session?.metadata?.orderId
			},
			data: {
				isPaid: true,
				address: addressString,
				phone: session?.customer_details?.phone || ""
			},
			include: {
				orderItem: true
			}
		});

		const productIds = order.orderItem.map(item => item.productId);

		await prisma.product.updateMany({
			where: {
				id: {
					in: [...productIds]
				}
			},
			data: {
				isArchived: true
			}
		});
	}

	return new NextResponse(null, { status: 200 });
}
