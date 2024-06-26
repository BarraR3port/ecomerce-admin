"use client";

import AlertModal from "@/modals/alert-modal";
import { Button } from "@ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@ui/dropdown-menu";
import { useToast } from "@ui/use-toast";
import axios from "axios";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import type { Column } from "./Column";

interface CellActionProps {
	billboard: Column;
}

export default function CellAction({ billboard }: CellActionProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const params = useParams();
	const { toast } = useToast();

	function edit() {
		router.push(`/${params.storeId}/billboards/${billboard.id}`);
	}

	async function onDelete() {
		setLoading(true);
		try {
			const response = await axios.delete(`/api/${params.storeId}/billboards/${billboard.id}`);
			if (response?.data) {
				toast({
					title: "Cartelera eliminada correctamente",
					variant: "success"
				});
				router.refresh();
			}
		} catch (error) {
			console.error(error);
			toast({
				title: "Ocurrió un error al eliminar la cartelera de tu tienda",
				variant: "error"
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<AlertModal open={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
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
					<DropdownMenuItem onClick={() => setOpen(true)}>
						<Trash className="h-4 w-4 hover:cursor-pointer" />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
