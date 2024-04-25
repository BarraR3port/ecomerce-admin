import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{
		params
	}: {
		params: {
			categoryId: string;
		};
	}
) {
	try {
		if (!params.categoryId) {
			return new NextResponse("ID de la categoría requerido", { status: 400 });
		}

		const category = await prisma.category.findMany({
			where: {
				id: params.categoryId
			}
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log("[CATEGORY][GET]", error);
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
			categoryId: string;
		};
	}
) {
	try {
		if (!params.storeId) {
			return new NextResponse("ID de la tienda requerido", { status: 400 });
		}
		if (!params.categoryId) {
			return new NextResponse("ID de la categoría requerido", { status: 400 });
		}

		const { userId } = auth();
		if (!userId) return new NextResponse("Sin autorización", { status: 401 });

		const body = await req.json();

		const { name, billboardId } = body;

		if (!name) return new NextResponse("Nombre requerida", { status: 400 });
		if (!billboardId) return new NextResponse("billboardId requerido", { status: 400 });

		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		});

		if (!storeByUserId) return new NextResponse("No se encontró la tienda", { status: 404 });

		const category = await prisma.category.updateMany({
			where: {
				id: params.categoryId
			},
			data: {
				name,
				billboardId
			}
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log("[CATEGORY][PATCH]", error);
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
			categoryId: string;
		};
	}
) {
	try {
		if (!params.storeId) {
			return new NextResponse("ID de la tienda requerido", { status: 400 });
		}
		if (!params.categoryId) {
			return new NextResponse("ID de la categoría requerido", { status: 400 });
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

		const category = await prisma.category.delete({
			where: {
				id: params.categoryId
			}
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log("[CATEGORY][DELETE]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}
