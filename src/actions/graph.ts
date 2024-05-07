import prisma from "@/lib/prismadb";

interface GraphData {
	name: string;
	total: number;
}

export const getGraphRevene = async (storeId: string) => {
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

	const monthlyRevenue: {
		[key: string]: number;
	} = {};

	for (const order of paidOrders) {
		const month = order.createdAt.getMonth();
		let revenueForOrder = 0;
		for (const item of order.orderItem) {
			revenueForOrder += item.product.price;
		}

		monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
	}
	const graphData: GraphData[] = [
		{
			name: "Enero",
			total: 0
		},
		{
			name: "Febrero",
			total: 0
		},
		{
			name: "Marzo",
			total: 0
		},
		{
			name: "Abril",
			total: 0
		},
		{
			name: "Mayo",
			total: 0
		},
		{
			name: "Junio",
			total: 0
		},
		{
			name: "Julio",
			total: 0
		},
		{
			name: "Agosto",
			total: 0
		},
		{
			name: "Septiembre",
			total: 0
		},
		{
			name: "Octubre",
			total: 0
		},
		{
			name: "Noviembre",
			total: 0
		},
		{
			name: "Diciembre",
			total: 0
		}
	];

	for (const month in monthlyRevenue) {
		graphData[Number.parseInt(month)].total = monthlyRevenue[month];
	}
	return graphData;
};
