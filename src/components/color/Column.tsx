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
		cell: ({ row }) => <CellIdAction color={row.original} />
	},
	{
		accessorKey: "name",
		header: "Nombre"
	},
	{
		accessorKey: "value",
		header: "Color",
		cell: ({ row }) => (
			<div className="flex items-center gap-x-2">
				<div
					className="h-6 w-6 rounded-full border"
					style={{
						backgroundColor: row.original.value
					}}
				/>
				{row.original.value}
			</div>
		)
	},
	{
		accessorKey: "createdAt",
		header: "Creado"
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction color={row.original} />
	}
];
