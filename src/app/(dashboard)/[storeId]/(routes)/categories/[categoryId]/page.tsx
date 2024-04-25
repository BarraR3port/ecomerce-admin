import CategoryForm from "@/forms/category/CategoryForm";
import prisma from "@/lib/prismadb";
import React from "react";

export default async function CategoryPage({
	params
}: {
	params: {
		categoryId: string;
		storeId: string;
	};
}) {
	const category = await prisma.category.findUnique({
		where: {
			id: params.categoryId
		}
	});

	const billboards = await prisma.billboard.findMany({
		where: {
			storeId: params.storeId
		}
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<CategoryForm category={category} billboards={billboards} />
			</div>
		</div>
	);
}
