import { Client } from "@/components/order/Client";
import prisma from "@/lib/prismadb";
import { priceFormatter } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import React from "react";

export default async function Page({ params }: { params: { storeId: string } }) {
	const orders = await prisma.order.findMany({
		where: {
			storeId: params.storeId
		},
		include: {
			orderItem: {
				include: {
					product: true
				}
			}
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	const formattedOrders = orders.map(order => {
		return {
			id: order.id,
			phone: order.phone,
			address: order.address,
			isPaid: order.isPaid,
			products: order.orderItem.map(orderItem => orderItem.product.name).join(", "),
			totalPrice: priceFormatter.format(
				order.orderItem.reduce((total, item) => {
					return total + Number(item.product.price);
				}, 0)
			),
			createdAt: format(order.createdAt, "dd-MMMM-yy HH:mm", {
				locale: es
			})
		};
	});
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-5 pt-6">
				<Client orders={formattedOrders} />
			</div>
		</div>
	);
}
