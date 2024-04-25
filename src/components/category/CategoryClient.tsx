"use client";

import { Button } from "@ui/button";
import Heading from "@ui/heading";
import { Separator } from "@ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ApiLists from "../api/ApiLists";
import { type CategoryColumn, columns } from "./CategoriesColumn";
import { DataTable } from "./CategoriesDataTable";

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
