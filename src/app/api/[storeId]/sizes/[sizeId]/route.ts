import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{
		params
	}: {
		params: {
			sizeId: string;
		};
	}
) {
	try {
		if (!params.sizeId) {
			return new NextResponse("ID de la medida requerida", { status: 400 });
		}

		const sizes = await prisma.size.findMany({
			where: {
				id: params.sizeId
			}
		});

		return NextResponse.json(sizes);
	} catch (error) {
		console.log("[SIZE][GET]", error);
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
			sizeId: string;
		};
	}
) {
	try {
		if (!params.storeId) {
			return new NextResponse("ID de la tienda requerido", { status: 400 });
		}
		if (!params.sizeId) {
			return new NextResponse("ID de la medida requerida", { status: 400 });
		}

		const { userId } = auth();
		if (!userId) return new NextResponse("Sin autorización", { status: 401 });

		const body = await req.json();

		const { name, value } = body;

		if (!name) return new NextResponse("Nombre requerida", { status: 400 });
		if (!value) return new NextResponse("Valor requerido", { status: 400 });

		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		});

		if (!storeByUserId) return new NextResponse("No se encontró la tienda", { status: 404 });

		const size = await prisma.size.updateMany({
			where: {
				id: params.sizeId
			},
			data: {
				name,
				value
			}
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log("[SIZE][PATCH]", error);
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
			sizeId: string;
		};
	}
) {
	try {
		if (!params.storeId) {
			return new NextResponse("ID de la tienda requerido", { status: 400 });
		}
		if (!params.sizeId) {
			return new NextResponse("ID de la medida requerida", { status: 400 });
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

		const size = await prisma.size.delete({
			where: {
				id: params.sizeId
			}
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log("[SIZE][DELETE]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}
