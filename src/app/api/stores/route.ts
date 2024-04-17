import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		if (!userId) return new NextResponse("Sin autorización", { status: 401 });

		const body = await req.json();

		const { name } = body;

		if (!name) return new NextResponse("Nombre requerido", { status: 400 });

		const store = await prisma.store.create({
			data: {
				name,
				userId
			}
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log("[STORES][POST]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}
