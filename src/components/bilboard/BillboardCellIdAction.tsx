"use client";

import { Button } from "@ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from "@ui/dropdown-menu";
import type { BillboardColumn } from "./BillboardsColumn";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

interface BillboardCellActionProps {
	billboard: BillboardColumn;
}

export default function BillboardCellIdAction({ billboard }: BillboardCellActionProps) {
	function onCopy() {
		navigator.clipboard.writeText(billboard.id);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<span className="sr-only">Abrir menu</span>
					{billboard.id.split("-")[0]}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-4">
				<DropdownMenuItem onClick={() => onCopy()}>
					<Copy className="h-4 w-4 hover:cursor-pointer" />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
