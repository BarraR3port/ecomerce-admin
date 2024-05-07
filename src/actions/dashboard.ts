import prisma from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
	const paidOrders = await prisma.order.findMany({
		where: {
			storeId: storeId,
			isPaid: true
		},
		include: {
			orderItem: {
				include: {
					product: true
				}
			}
		}
	});
	const totalRevenue = paidOrders.reduce((total, order) => {
		const orderTotal = order.orderItem.reduce((orderSum, item) => {
			return orderSum + item.product.price;
		}, 0);
		return total + orderTotal;
	}, 0);
	return totalRevenue;
};

export const getTotalSales = async (storeId: string) => {
	const paidOrders = await prisma.order.count({
		where: {
			storeId: storeId,
			isPaid: true
		}
	});
	return paidOrders;
};

export const getStockCount = async (storeId: string) => {
	const paidOrders = await prisma.product.count({
		where: {
			storeId: storeId,
			isArchived: false
		}
	});
	return paidOrders;
};
