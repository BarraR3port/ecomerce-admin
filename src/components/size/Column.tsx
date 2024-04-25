"use client";

import type { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import CellIdAction from "./CellIdAction";

export type Column = {
	id: string;
	name: string;
	value: string;
	createdAt: string;
};

export const columns: ColumnDef<Column>[] = [
	{
		accessorKey: "id",
		header: "Id",
		cell: ({ row }) => <CellIdAction size={row.original} />
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
		cell: ({ row }) => <CellAction size={row.original} />
	}
];
