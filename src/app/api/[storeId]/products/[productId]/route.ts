import prisma from "@/lib/prismadb";
import { utapi } from "@/lib/uploadthing";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{
		params
	}: {
		params: {
			productId: string;
		};
	}
) {
	try {
		if (!params.productId) {
			return new NextResponse("ID del producto requerido", { status: 400 });
		}

		const product = await prisma.product.findFirst({
			where: {
				id: params.productId
			},
			include: {
				images: true,
				category: true,
				color: true,
				size: true
			}
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log("[PRODUCT][GET]", error);
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
			productId: string;
		};
	}
) {
	try {
		if (!params.storeId) {
			return new NextResponse("ID de la tienda requerido", { status: 400 });
		}
		if (!params.productId) {
			return new NextResponse("ID del producto requerido", { status: 400 });
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

		const oldProduct = await prisma.product.findFirst({
			where: {
				id: params.productId
			},
			select: {
				images: true
			}
		});
		if (!oldProduct) return new NextResponse("No se encontró el producto", { status: 404 });

		const currentImages = oldProduct.images;

		const uploadedImages: { url: string }[] = images;

		const newImages = uploadedImages
			.filter(
				(image: { url: string }) =>
					!currentImages.find((currentImage: { url: string }) => currentImage.url === image.url)
			)
			.map((image: { url: string }) => ({ url: image.url }));

		const deletedImages = currentImages.filter(
			(image: { url: string }) => !images.find((newImage: { url: string }) => newImage.url === image.url)
		);

		const product = await prisma.product.update({
			where: {
				id: params.productId
			},
			data: {
				name,
				description,
				price,
				categoryId,
				colorId,
				sizeId,
				isFeatured,
				isArchived,
				images: {
					deleteMany:
						deletedImages.length > 0
							? {
									url: {
										in: deletedImages.map((image: { url: string }) => image.url)
									}
								}
							: undefined,
					createMany:
						newImages.length > 0
							? {
									data: [...newImages]
								}
							: undefined
				}
			}
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log("[PRODUCT][PATCH]", error);
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
			productId: string;
		};
	}
) {
	try {
		if (!params.storeId) {
			return new NextResponse("ID de la tienda requerido", { status: 400 });
		}
		if (!params.productId) {
			return new NextResponse("ID del producto requerido", { status: 400 });
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

		const oldProduct = await prisma.product.findFirst({
			where: {
				id: params.productId
			},
			select: {
				images: true
			}
		});

		if (!oldProduct) return new NextResponse("No se encontró el producto", { status: 404 });

		oldProduct.images.forEach(async (image: { url: string }) => {
			const newUrl = image.url.substring(image.url.lastIndexOf("/") + 1);
			await utapi.deleteFiles(newUrl).catch(error => {
				console.log("[PRODUCT][DELETE][UTAPI]", error);
			});
		});

		const product = await prisma.product.delete({
			where: {
				id: params.productId
			}
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log("[PRODUCT][DELETE]", error);
		return new NextResponse("Error Interno", { status: 500 });
	}
}
