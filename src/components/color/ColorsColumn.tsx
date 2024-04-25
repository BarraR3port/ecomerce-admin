"use client";

import type { ColumnDef } from "@tanstack/react-table";
import ColorCellAction from "./ColorCellAction";
import ColorCellIdAction from "./ColorCellIdAction";

export type ColorColumn = {
	id: string;
	name: string;
	value: string;
	createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
	{
		accessorKey: "id",
		header: "Id",
		cell: ({ row }) => <ColorCellIdAction color={row.original} />
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
				{row.original.value}
				<div
					className="h-6 w-6 rounded-full border"
					style={{
						backgroundColor: row.original.value
					}}
				/>
			</div>
		)
	},
	{
		accessorKey: "createdAt",
		header: "Creado"
	},
	{
		id: "actions",
		cell: ({ row }) => <ColorCellAction color={row.original} />
	}
];
