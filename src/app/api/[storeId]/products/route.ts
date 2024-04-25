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

		const { name, description, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = body;

		if (!name) return new NextResponse("Nombre requerido", { status: 400 });
		if (!description) return new NextResponse("Descripción requerida", { status: 400 });
		if (!price) return new NextResponse("Precio requerido", { status: 400 });
		if (!categoryId) return new NextResponse("Categoría requerida", { status: 400 });
		if (!colorId) return new NextResponse("Color requerido", { status: 400 });
		if (!sizeId) return new NextResponse("Medida requerida", { status: 400 });
		if (!images || !images.length) return new NextResponse("Imágenes requeridas", { status: 400 });
		if (isFeatured === undefined) return new NextResponse("Destacado requerido", { status: 400 });
		if (isArchived === undefined) return new NextResponse("Archivado requerido", { status: 400 });

		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.storeId,
				userId
			}
		});

		if (!storeByUserId) return new NextResponse("No se encontró la tienda", { status: 404 });

		const store = await prisma.product.create({
			data: {
				name,
				description,
				price,
				categoryId,
				colorId,
				sizeId,
				isFeatured,
				isArchived,
				storeId: params.storeId,
				images: {
					createMany: {
						data: [
							...images.map((image: { url: string }) => {
								return {
									url: image.url
								};
							})
						]
					}
				}
			}
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log("[PRODUCTS][POST]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}

export async function GET(
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
		const { searchParams } = new URL(req.url);
		const categoryId = searchParams.get("categoryId") || undefined;
		const colorId = searchParams.get("colorId") || undefined;
		const sizeId = searchParams.get("sizeId") || undefined;
		const isFeatured = searchParams.get("isFeatured") || undefined;

		if (!params.storeId) {
			return new NextResponse("ID del producto requerido", { status: 400 });
		}

		const products = await prisma.product.findMany({
			where: {
				storeId: params.storeId,
				categoryId,
				colorId,
				sizeId,
				isFeatured: isFeatured ? true : undefined
			},
			include: {
				images: true,
				category: true,
				color: true,
				size: true
			},
			orderBy: {
				createdAt: "desc"
			}
		});

		return NextResponse.json(products);
	} catch (error) {
		console.log("[PRODUCTS][GET]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}
