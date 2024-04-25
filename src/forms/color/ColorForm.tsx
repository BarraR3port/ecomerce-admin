"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AlertModal from "@/modals/alert-modal";
import { ColorFormSchema, type ColorFormType } from "@/schemas/ColorSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Color } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ColorFormProps {
	color: Color | null;
}

export default function ColorForm({ color }: ColorFormProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const params = useParams();
	const router = useRouter();

	const title = color ? "Editar Color" : "Crear Color";
	const description = color ? "Edita la color de tu tienda" : "Crea una color para tu tienda";
	const toastDescription = color ? "Color editada correctamente" : "Color creada correctamente";
	const actionMessage = color ? "Guardar cambios" : "Crear";

	const form = useForm<ColorFormType>({
		resolver: yupResolver(ColorFormSchema),
		defaultValues: color || {
			name: "",
			value: ""
		}
	});

	const onSubmit = async (data: ColorFormType) => {
		setLoading(true);
		try {
			const response = color
				? await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
				: await axios.post(`/api/${params.storeId}/colors`, data);

			if (response?.data) {
				toast({
					title: toastDescription,
					variant: "success"
				});
				router.replace(`/${params.storeId}/colors`);
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
			const response = await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
			if (response?.data) {
				toast({
					title: "Color eliminada correctamente",
					variant: "success"
				});
				router.replace(`/${params.storeId}/colors`);
			}
		} catch (error) {
			console.error(error);
			toast({
				title: "Asegúrate de que la color no esté siendo utilizada",
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
				{color && (
					<Button
						variant="destructive"
						color={"sm"}
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
										<FormLabel>Nombre del color</FormLabel>
										<FormDescription>
											El nombre del color es el que se mostrará en la tienda
										</FormDescription>
										<FormControl>
											<Input
												autoComplete="off"
												disabled={loading}
												placeholder="Nombre del color"
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
										<FormDescription>
											El valor debe ser un color hexadecimal. Ejemplo: #fff
										</FormDescription>
										<FormControl>
											<div className="flex items-center gap-x-4">
												<Input
													autoComplete="off"
													disabled={loading}
													placeholder="Valor del color"
													{...field}
												/>
												<div
													className="border p-4 rounded-full"
													style={{ backgroundColor: field.value }}
												/>
											</div>
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
