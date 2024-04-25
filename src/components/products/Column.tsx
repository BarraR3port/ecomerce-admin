"use client";

import type { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import CellIdAction from "./CellIdAction";
import CellImage from "./CellImage";

export type Column = {
	id: string;
	name: string;
	price: string;
	size: string;
	category: string;
	color: string;
	isFeatured: boolean;
	isArchived: boolean;
	imageUrl: string;
	createdAt: string;
};

export const columns: ColumnDef<Column>[] = [
	{
		accessorKey: "id",
		header: "Id",
		cell: ({ row }) => <CellIdAction product={row.original} />
	},
	{
		accessorKey: "imageUrl",
		header: "Imagen",
		cell: ({ row }) => <CellImage product={row.original} />
	},
	{
		accessorKey: "name",
		header: "Nombre"
	},
	{
		accessorKey: "isArchived",
		header: "Archivado"
	},
	{
		accessorKey: "isFeatured",
		header: "Destacado"
	},
	{
		accessorKey: "price",
		header: "Precio"
	},
	{
		accessorKey: "category",
		header: "Categoría"
	},
	{
		accessorKey: "size",
		header: "Medida"
	},
	{
		accessorKey: "color",
		header: "Color",
		cell: ({ row }) => (
			<div className="flex items-center gap-x-2">
				<div
					className="h-6 w-6 rounded-full border"
					style={{
						backgroundColor: row.original.color
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
		cell: ({ row }) => <CellAction product={row.original} />
	}
];
