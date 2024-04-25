"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AlertModal from "@/modals/alert-modal";
import { SizeFormSchema, type SizeFormType } from "@/schemas/SizeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Size } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SizeFormProps {
	size: Size | null;
}

export default function SizeForm({ size }: SizeFormProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const params = useParams();
	const router = useRouter();

	const title = size ? "Editar Medida" : "Crear Medida";
	const description = size ? "Edita la medida de tu tienda" : "Crea una medida para tu tienda";
	const toastDescription = size ? "Medida editada correctamente" : "Medida creada correctamente";
	const actionMessage = size ? "Guardar cambios" : "Crear";

	const form = useForm<SizeFormType>({
		resolver: yupResolver(SizeFormSchema),
		defaultValues: size || {
			name: "",
			value: ""
		}
	});

	const onSubmit = async (data: SizeFormType) => {
		setLoading(true);
		try {
			const response = size
				? await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
				: await axios.post(`/api/${params.storeId}/sizes`, data);

			if (response?.data) {
				toast({
					title: toastDescription,
					variant: "success"
				});
				router.replace(`/${params.storeId}/sizes`);
				router.refresh();
			}
		} catch (error) {
			console.error(error);
			toast({
				title: "Ocurrió un error al guardar los ajustes",
				variant: "error"
			});
		} finally {
			setLoading(false);
		}
	};

	async function onDelete() {
		setLoading(true);
		try {
			const response = await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
			if (response?.data) {
				toast({
					title: "Medida eliminada correctamente",
					variant: "success"
				});
				router.replace(`/${params.storeId}/sizes`);
			}
		} catch (error) {
			console.error(error);
			toast({
				title: "Asegúrate de que la medida no esté siendo utilizada",
				variant: "error"
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<AlertModal open={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />
				{size && (
					<Button
						variant="destructive"
						size={"sm"}
						onClick={() => {
							setOpen(true);
						}}
					>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full flex-col">
					<div className="space-y-2">
						<div className="grid grid-cols-3 space-x-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre</FormLabel>
										<FormControl>
											<Input
												autoComplete="off"
												disabled={loading}
												placeholder="Nombre de la medida"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="value"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Valor</FormLabel>
										<FormControl>
											<Input
												autoComplete="off"
												disabled={loading}
												placeholder="Valor de la medida"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<Button type="submit" variant="success" loading={loading} className="w-[200px]">
						{actionMessage}
					</Button>
				</form>
			</Form>
		</>
	);
}
