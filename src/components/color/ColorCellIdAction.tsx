"use client";

import { Button } from "@ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@ui/dropdown-menu";
import { Copy } from "lucide-react";
import type { ColorColumn } from "./ColorsColumn";

interface ColorCellActionProps {
	color: ColorColumn;
}

export default function ColorCellIdAction({ color }: ColorCellActionProps) {
	function onCopy() {
		navigator.clipboard.writeText(color.id);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="p-0 m-0">
					<span className="sr-only">Abrir menu</span>
					{color.id.split("-")[0]}
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
