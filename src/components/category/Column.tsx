"use client";

import type { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import CellIdAction from "./CellIdAction";

export type Column = {
	id: string;
	name: string;
	billboardLabel: string;
	createdAt: string;
};

export const columns: ColumnDef<Column>[] = [
	{
		accessorKey: "id",
		header: "Id",
		cell: ({ row }) => <CellIdAction category={row.original} />
	},
	{
		accessorKey: "name",
		header: "Nombre"
	},
	{
		accessorKey: "billboardLabel",
		header: "Cartelera"
	},
	{
		accessorKey: "createdAt",
		header: "Creado"
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction category={row.original} />
	}
];
