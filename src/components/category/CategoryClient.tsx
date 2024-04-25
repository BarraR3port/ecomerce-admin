"use client";

import { Plus } from "lucide-react";
import { Button } from "@ui/button";
import Heading from "@ui/heading";
import { useParams, useRouter } from "next/navigation";
import { columns, type CategoryColumn } from "./CategoriesColumn";
import { DataTable } from "./CategoriesDataTable";
import ApiLists from "../api/ApiLists";
import { Separator } from "@ui/separator";

interface CategoryClientProps {
	categories: CategoryColumn[];
}

export function CategoryClient({ categories }: CategoryClientProps) {
	const router = useRouter();

	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading title={`Categorías (${categories.length})`} description="Categorías de la tienda" />
				<Button
					onClick={() => {
						router.push(`/${params.storeId}/categories/new`);
					}}
					variant="outline"
				>
					<Plus className="mr-2 w-4 h-4" />
					Agregar Categoría
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={categories} searchKey="label" />
			<Heading title="API" description="Llamados a la api para Categorías" />
			<Separator />
			<ApiLists entityName="categories" entityIdName="categoryId" />
		</>
	);
}
