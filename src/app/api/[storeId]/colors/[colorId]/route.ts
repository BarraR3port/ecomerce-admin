import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{
		params
	}: {
		params: {
			colorId: string;
		};
	}
) {
	try {
		if (!params.colorId) {
			return new NextResponse("ID de el color requerida", { status: 400 });
		}

		const colors = await prisma.color.findMany({
			where: {
				id: params.colorId
			}
		});

		return NextResponse.json(colors);
	} catch (error) {
		console.log("[COLOR][GET]", error);
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
			colorId: string;
		};
	}
) {
	try {
		if (!params.storeId) {
			return new NextResponse("ID de la tienda requerido", { status: 400 });
		}
		if (!params.colorId) {
			return new NextResponse("ID de el color requerida", { status: 400 });
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

		const color = await prisma.color.updateMany({
			where: {
				id: params.colorId
			},
			data: {
				name,
				value
			}
		});

		return NextResponse.json(color);
	} catch (error) {
		console.log("[COLOR][PATCH]", error);
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
			colorId: string;
		};
	}
) {
	try {
		if (!params.storeId) {
			return new NextResponse("ID de la tienda requerido", { status: 400 });
		}
		if (!params.colorId) {
			return new NextResponse("ID de el color requerida", { status: 400 });
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

		const color = await prisma.color.delete({
			where: {
				id: params.colorId
			}
		});

		return NextResponse.json(color);
	} catch (error) {
		console.log("[COLOR][DELETE]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}
