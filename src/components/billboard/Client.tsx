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
	billboards: Column[];
}

export function Client({ billboards }: ClientProps) {
	const router = useRouter();

	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading title={`Carteleras (${billboards.length})`} description="Carteleras de la tienda" />
				<Button
					onClick={() => {
						router.push(`/${params.storeId}/billboards/new`);
					}}
					variant="outline"
				>
					<Plus className="mr-2 w-4 h-4" />
					Crear Cartelera
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={billboards} searchKey="label" />
			<Heading title="API" description="Llamados a la api para Carteleras" />
			<Separator />
			<ApiLists entityName="billboards" entityIdName="billboardId" />
		</>
	);
}
