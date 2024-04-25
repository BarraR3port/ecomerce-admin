"use client";

import { Button } from "@ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@ui/dropdown-menu";
import { Copy } from "lucide-react";
import type { SizeColumn } from "./SizesColumn";

interface SizeCellActionProps {
	size: SizeColumn;
}

export default function SizeCellIdAction({ size }: SizeCellActionProps) {
	function onCopy() {
		navigator.clipboard.writeText(size.id);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="p-0 m-0">
					<span className="sr-only">Abrir menu</span>
					{size.id.split("-")[0]}
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
