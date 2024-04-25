"use client";

import type { ColumnDef } from "@tanstack/react-table";
import BillboardCellAction from "./BillboardCellAction";
import BillboardCellIdAction from "./BillboardCellIdAction";
import BillboardCellImage from "./BilloardCellImage";

export type BillboardColumn = {
	id: string;
	label: string;
	imageUrl: string;
	createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
	{
		accessorKey: "id",
		header: "Id",
		cell: ({ row }) => <BillboardCellIdAction billboard={row.original} />
	},
	{
		accessorKey: "imageUrl",
		header: "Imagen",
		cell: ({ row }) => <BillboardCellImage billboard={row.original} />
	},
	{
		accessorKey: "label",
		header: "Etiqueta"
	},
	{
		accessorKey: "createdAt",
		header: "Creado"
	},
	{
		id: "actions",
		cell: ({ row }) => <BillboardCellAction billboard={row.original} />
	}
];
