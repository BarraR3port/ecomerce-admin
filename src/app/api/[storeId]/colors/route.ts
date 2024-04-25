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

		const { name, value } = body;

		if (!name) return new NextResponse("Nombre requerido", { status: 400 });
		if (!value) return new NextResponse("Valor requerida", { status: 400 });

		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		});

		if (!storeByUserId) return new NextResponse("No se encontró la tienda", { status: 404 });

		const color = await prisma.color.create({
			data: {
				name,
				value,
				storeId: params.storeId
			}
		});

		return NextResponse.json(color);
	} catch (error) {
		console.log("[COLORS][POST]", error);
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

		const colors = await prisma.color.findMany({
			where: {
				storeId: params.storeId
			}
		});

		return NextResponse.json(colors);
	} catch (error) {
		console.log("[COLORS][GET]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}
