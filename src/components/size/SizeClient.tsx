"use client";

import { Button } from "@ui/button";
import Heading from "@ui/heading";
import { Separator } from "@ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ApiLists from "../api/ApiLists";
import { type SizeColumn, columns } from "./SizesColumn";
import { DataTable } from "@ui/data-table";

interface SizeClientProps {
	sizes: SizeColumn[];
}

export function SizeClient({ sizes }: SizeClientProps) {
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
