"use client";

import { Button } from "@ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import type { BillboardColumn } from "./BillboardsColumn";

interface BillboardCellActionProps {
	billboard: BillboardColumn;
}

export default function BillboardCellAction({ billboard }: BillboardCellActionProps) {
	const router = useRouter();
	const params = useParams();

	function edit() {
		router.push(`/${params.storeId}/billboards/${billboard.id}`);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<span className="sr-only">Abrir menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-4">
				<DropdownMenuItem onClick={edit}>
					<Edit className="h-4 w-4 hover:cursor-pointer" />
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Trash className="h-4 w-4 hover:cursor-pointer" />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
