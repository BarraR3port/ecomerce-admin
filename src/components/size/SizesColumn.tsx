"use client";

import type { ColumnDef } from "@tanstack/react-table";
import SizeCellAction from "./SizeCellAction";
import SizeCellIdAction from "./SizeCellIdAction";

export type SizeColumn = {
	id: string;
	name: string;
	value: string;
	createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
	{
		accessorKey: "id",
		header: "Id",
		cell: ({ row }) => <SizeCellIdAction size={row.original} />
	},
	{
		accessorKey: "name",
		header: "Nombre"
	},
	{
		accessorKey: "value",
		header: "Valor"
	},
	{
		accessorKey: "createdAt",
		header: "Creado"
	},
	{
		id: "actions",
		cell: ({ row }) => <SizeCellAction size={row.original} />
	}
];
