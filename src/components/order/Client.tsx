"use client";

import { DataTable } from "@ui/data-table";
import Heading from "@ui/heading";
import { Separator } from "../ui/separator";
import { type Column, columns } from "./Column";

interface ClientProps {
	orders: Column[];
}

export function Client({ orders }: ClientProps) {
	return (
		<>
			<Heading title={`Pedidos (${orders.length})`} description="Pedidos de la tienda" />
			<Separator />
			<DataTable columns={columns} data={orders} searchKey="products" />
		</>
	);
}
