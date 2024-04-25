import { BillboardClient } from "@/components/bilboard/BillboardClient";
import prisma from "@/lib/prismadb";
import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default async function BillBoardsPage({ params }: { params: { storeId: string } }) {
	const billboards = await prisma.billboard.findMany({
		where: {
			storeId: params.storeId
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	const formattedBillboards = billboards.map(billboard => {
		return {
			id: billboard.id,
			label: billboard.label,
			imageUrl: billboard.imageUrl,
			createdAt: format(billboard.createdAt, "dd-MMMM-yy HH:mm", {
				locale: es
			})
		};
	});
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-5 pt-6">
				<BillboardClient billboards={formattedBillboards} />
			</div>
		</div>
	);
}
