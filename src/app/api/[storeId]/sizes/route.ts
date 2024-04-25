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

		const size = await prisma.size.create({
			data: {
				name,
				value,
				storeId: params.storeId
			}
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log("[SIZES][POST]", error);
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

		const sizes = await prisma.size.findMany({
			where: {
				storeId: params.storeId
			}
		});

		return NextResponse.json(sizes);
	} catch (error) {
		console.log("[SIZES][GET]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}
