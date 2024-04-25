import { Client } from "@/components/products/Client";
import type { Column } from "@/components/products/Column";
import prisma from "@/lib/prismadb";
import { priceFormatter } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import React from "react";

export default async function Page({ params }: { params: { storeId: string } }) {
	const products = await prisma.product.findMany({
		where: {
			storeId: params.storeId
		},
		include: {
			category: true,
			size: true,
			color: true,
			images: {
				select: {
					url: true
				},
				take: 1
			}
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	const formattedProducts: Column[] = products.map(product => {
		return {
			id: product.id,
			name: product.name,
			isFeatured: product.isFeatured,
			isArchived: product.isArchived,
			price: priceFormatter.format(product.price.toNumber()),
			category: product.category.name,
			size: product.size.name,
			color: product.color.value,
			imageUrl: product.images[0]?.url || "",
			createdAt: format(product.createdAt, "dd-MMMM-yy HH:mm", {
				locale: es
			})
		};
	});
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-5 pt-6">
				<Client products={formattedProducts} />
			</div>
		</div>
	);
}
