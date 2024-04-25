import { Client } from "@/components/color/Client";
import type { Column } from "@/components/color/Column";
import prisma from "@/lib/prismadb";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default async function ColorPage({ params }: { params: { storeId: string } }) {
	const colors = await prisma.color.findMany({
		where: {
			storeId: params.storeId
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	const formattedColors: Column[] = colors.map(color => {
		return {
			id: color.id,
			name: color.name,
			value: color.value,
			createdAt: format(color.createdAt, "dd-MMMM-yy HH:mm", {
				locale: es
			})
		};
	});
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-5 pt-6">
				<Client colors={formattedColors} />
			</div>
		</div>
	);
}
