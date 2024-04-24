"use client";

import type { ColumnDef } from "@tanstack/react-table";
import BillboardCellAction from "./BillboardCellAction";
import BillboardCellIdAction from "./BillboardCellIdAction";

export type BillboardColumn = {
	id: string;
	label: string;
	createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
	{
		accessorKey: "id",
		header: "Id",
		cell: ({ row }) => <BillboardCellIdAction billboard={row.original} />
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
