"use client";

import { Button } from "@ui/button";
import Heading from "@ui/heading";
import { Separator } from "@ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ApiLists from "../api/ApiLists";
import { type Column, columns } from "./Column";
import { DataTable } from "@ui/data-table";

interface ClientProps {
	colors: Column[];
}

export function Client({ colors }: ClientProps) {
	const router = useRouter();

	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading title={`Colores (${colors.length})`} description="Colores de la tienda" />
				<Button
					onClick={() => {
						router.push(`/${params.storeId}/colors/new`);
					}}
					variant="outline"
				>
					<Plus className="mr-2 w-4 h-4" />
					Crear Color
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={colors} searchKey="name" />
			<Heading title="API" description="Llamados a la api para Colores" />
			<Separator />
			<ApiLists entityName="colors" entityIdName="colorId" />
		</>
	);
}
