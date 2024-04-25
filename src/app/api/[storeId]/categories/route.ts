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

		const { name, billboardId } = body;

		if (!name) return new NextResponse("Nombre requerido", { status: 400 });
		if (!billboardId) return new NextResponse("billboardId requerida", { status: 400 });

		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		});

		if (!storeByUserId) return new NextResponse("No se encontró la tienda", { status: 404 });

		const category = await prisma.category.create({
			data: {
				name,
				billboardId,
				storeId: params.storeId
			}
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log("[CATEGORIES][POST]", error);
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

		const categories = await prisma.category.findMany({
			where: {
				storeId: params.storeId
			},
			include: {
				billboard: true
			}
		});

		return NextResponse.json(categories);
	} catch (error) {
		console.log("[CATEGORIES][GET]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}
