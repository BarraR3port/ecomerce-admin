"use client";

import { Button } from "@ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@ui/dropdown-menu";
import { Copy } from "lucide-react";
import type { Column } from "./Column";

interface CellActionProps {
	billboard: Column;
}

export default function CellIdAction({ billboard }: CellActionProps) {
	function onCopy() {
		navigator.clipboard.writeText(billboard.id);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="p-0 m-0">
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
