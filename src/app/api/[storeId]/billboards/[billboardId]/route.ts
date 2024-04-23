import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{
		params
	}: {
		params: {
			billboardId: string;
		};
	}
) {
	try {
		if (!params.billboardId) {
			return new NextResponse("ID de la cartelera requerido", { status: 400 });
		}

		const billboard = await prisma.billboard.findMany({
			where: {
				id: params.billboardId
			}
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARDS][GET]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{
		params
	}: {
		params: {
			storeId: string;
			billboardId: string;
		};
	}
) {
	try {
		if (!params.storeId) {
			return new NextResponse("ID de la tienda requerido", { status: 400 });
		}
		if (!params.billboardId) {
			return new NextResponse("ID de la cartelera requerido", { status: 400 });
		}

		const { userId } = auth();
		if (!userId) return new NextResponse("Sin autorización", { status: 401 });

		const body = await req.json();

		const { label, imageUrl } = body;

		if (!label) return new NextResponse("Etiqueta requerida", { status: 400 });
		if (!imageUrl) return new NextResponse("Url de la imagen requerida", { status: 400 });

		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		});

		if (!storeByUserId) return new NextResponse("No se encontró la tienda", { status: 404 });

		const billboard = await prisma.billboard.updateMany({
			where: {
				id: params.billboardId
			},
			data: {
				label,
				imageUrl
			}
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARDS][PATCH]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}

export async function DELETE(
	_req: Request,
	{
		params
	}: {
		params: {
			storeId: string;
			billboardId: string;
		};
	}
) {
	try {
		if (!params.storeId) {
			return new NextResponse("ID de la tienda requerido", { status: 400 });
		}
		if (!params.billboardId) {
			return new NextResponse("ID de la cartelera requerido", { status: 400 });
		}

		const { userId } = auth();
		if (!userId) return new NextResponse("Sin autorización", { status: 401 });

		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		});

		if (!storeByUserId) return new NextResponse("No se encontró la tienda", { status: 404 });

		const billboard = await prisma.billboard.deleteMany({
			where: {
				id: params.billboardId
			}
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARDS][DELETE]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}
