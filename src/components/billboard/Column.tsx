"use client";

import type { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import CellIdAction from "./CellIdAction";
import CellImage from "./CellImage";

export type Column = {
	id: string;
	label: string;
	imageUrl: string;
	createdAt: string;
	hiddenLabel: boolean;
};

export const columns: ColumnDef<Column>[] = [
	{
		accessorKey: "id",
		header: "Id",
		cell: ({ row }) => <CellIdAction billboard={row.original} />
	},
	{
		accessorKey: "imageUrl",
		header: "Imagen",
		cell: ({ row }) => <CellImage billboard={row.original} />
	},
	{
		accessorKey: "label",
		header: "Etiqueta"
	},
	{
		accessorKey: "hiddenLabel",
		header: "Título Oculto",
		cell: ({ row }) => (row.original.hiddenLabel ? "Si" : "No")
	},
	{
		accessorKey: "createdAt",
		header: "Creado"
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction billboard={row.original} />
	}
];
