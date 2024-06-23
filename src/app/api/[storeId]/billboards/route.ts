import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
	req: Request,
	{
		params
	}: {
		params: {
			storeId: string;
		};
	}
) {
	try {
		if (!params.storeId) {
			return new NextResponse("ID de la tienda requerido", { status: 400 });
		}

		const { userId } = auth();
		if (!userId) return new NextResponse("Sin autorización", { status: 401 });

		const body = await req.json();

		const { label, imageUrl, hiddenLabel } = body;

		if (!label) return new NextResponse("Etiqueta requerida", { status: 400 });
		if (!imageUrl) return new NextResponse("Url de la imagen requerida", { status: 400 });
		if (!hiddenLabel) return new NextResponse("Etiqueta oculta requerida", { status: 400 });

		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		});

		if (!storeByUserId) return new NextResponse("No se encontró la tienda", { status: 404 });

		const store = await prisma.billboard.create({
			data: {
				label,
				imageUrl,
				hiddenLabel,
				storeId: params.storeId
			}
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log("[BILLBOARDS][POST]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}

export async function GET(
	_req: Request,
	{
		params
	}: {
		params: {
			storeId: string;
		};
	}
) {
	try {
		if (!params.storeId) {
			return new NextResponse("ID de la tienda requerido", { status: 400 });
		}

		const billboards = await prisma.billboard.findMany({
			where: {
				storeId: params.storeId
			}
		});

		return NextResponse.json(billboards);
	} catch (error) {
		console.log("[BILLBOARDS][GET]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}
