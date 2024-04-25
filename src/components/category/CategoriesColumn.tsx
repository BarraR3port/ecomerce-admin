"use client";

import type { ColumnDef } from "@tanstack/react-table";
import CategoryCellAction from "./CategoryCellAction";
import BillboardCellImage from "./CategoryCellImage";
import CategoryCellIdAction from "./CategoryCellIdAction";

export type CategoryColumn = {
	id: string;
	name: string;
	billboardLabel: string;
	createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
	{
		accessorKey: "id",
		header: "Id",
		cell: ({ row }) => <CategoryCellIdAction category={row.original} />
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
		cell: ({ row }) => <CategoryCellAction category={row.original} />
	}
];
