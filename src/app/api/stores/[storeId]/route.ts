import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
	try {
		const { userId } = auth();

		if (!userId) return new NextResponse("Sin autorización", { status: 401 });
		const body = await req.json();

		const { name } = body;

		if (!name) return new NextResponse("Nombre requerido", { status: 400 });

		if (!params.storeId) return new NextResponse("ID de la tienda requerido", { status: 400 });

		const store = await prisma.store.update({
			where: {
				id: params.storeId,
				userId
			},
			data: {
				name
			}
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log("[STORES][PATCH]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}

export async function DELETE(_req: Request, { params }: { params: { storeId: string } }) {
	try {
		const { userId } = auth();

		if (!userId) return new NextResponse("Sin autorización", { status: 401 });

		if (!params.storeId) return new NextResponse("ID de la tienda requerido", { status: 400 });

		const store = await prisma.store.delete({
			where: {
				id: params.storeId,
				userId
			}
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log("[STORES][PATCH]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}
