"use client";

import { Plus } from "lucide-react";
import { Button } from "@ui/button";
import Heading from "@ui/heading";
import { Separator } from "@radix-ui/react-separator";
import { useParams, useRouter } from "next/navigation";
import { columns, type BillboardColumn } from "./BillboardsColumn";
import { DataTable } from "./BillboardsDataTable";

interface BillboardClientProps {
	billboards: BillboardColumn[];
}

export function BillboardClient({ billboards }: BillboardClientProps) {
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
				>
					<Plus className="mr-2 w-4 h-4" />
					Agregar Cartelera
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={billboards} />
		</>
	);
}
