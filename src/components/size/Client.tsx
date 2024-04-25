"use client";

import { Button } from "@ui/button";
import { DataTable } from "@ui/data-table";
import Heading from "@ui/heading";
import { Separator } from "@ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ApiLists from "../api/ApiLists";
import { type Column, columns } from "./Column";

interface ClientProps {
	sizes: Column[];
}

export function Client({ sizes }: ClientProps) {
	const router = useRouter();

	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading title={`Medidas (${sizes.length})`} description="Medida de la tienda" />
				<Button
					onClick={() => {
						router.push(`/${params.storeId}/sizes/new`);
					}}
					variant="outline"
				>
					<Plus className="mr-2 w-4 h-4" />
					Crear Medida
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={sizes} searchKey="name" />
			<Heading title="API" description="Llamados a la api para Medida" />
			<Separator />
			<ApiLists entityName="sizes" entityIdName="sizeId" />
		</>
	);
}
