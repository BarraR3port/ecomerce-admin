"use client";

import type { ColumnDef } from "@tanstack/react-table";
import CellIdAction from "./CellIdAction";

export type Column = {
	id: string;
	phone: string;
	address: string;
	isPaid: boolean;
	totalPrice: string;
	products: string;
	createdAt: string;
};

export const columns: ColumnDef<Column>[] = [
	{
		accessorKey: "id",
		header: "Id",
		cell: ({ row }) => <CellIdAction billboard={row.original} />
	},
	{
		accessorKey: "products",
		header: "Productos"
	},
	{
		accessorKey: "phone",
		header: "Numero"
	},
	{
		accessorKey: "address",
		header: "Dirección"
	},
	{
		accessorKey: "isPaid",
		header: "Pagado"
	},
	{
		accessorKey: "createdAt",
		header: "Creado"
	}
];
