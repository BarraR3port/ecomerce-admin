import type { SizeColumn } from "@/components/size/SizesColumn";
import { SizeClient } from "@/components/size/SizeClient";
import prisma from "@/lib/prismadb";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default async function SizePage({ params }: { params: { storeId: string } }) {
	const sizes = await prisma.size.findMany({
		where: {
			storeId: params.storeId
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	const formattedSizes: SizeColumn[] = sizes.map(size => {
		return {
			id: size.id,
			name: size.name,
			value: size.value,
			createdAt: format(size.createdAt, "dd-MMMM-yy HH:mm", {
				locale: es
			})
		};
	});
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-5 pt-6">
				<SizeClient sizes={formattedSizes} />
			</div>
		</div>
	);
}
