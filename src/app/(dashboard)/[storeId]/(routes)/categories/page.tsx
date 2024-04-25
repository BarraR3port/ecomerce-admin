import type { CategoryColumn } from "@/components/category/CategoriesColumn";
import { CategoryClient } from "@/components/category/CategoryClient";
import prisma from "@/lib/prismadb";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default async function CategoriesPage({ params }: { params: { storeId: string } }) {
	const categories = await prisma.category.findMany({
		where: {
			storeId: params.storeId
		},
		include: {
			billboard: true
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	const formattedCategories: CategoryColumn[] = categories.map(category => {
		return {
			id: category.id,
			name: category.name,
			billboardLabel: category.billboard.label,
			createdAt: format(category.createdAt, "dd-MMMM-yy HH:mm", {
				locale: es
			})
		};
	});
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-5 pt-6">
				<CategoryClient categories={formattedCategories} />
			</div>
		</div>
	);
}
