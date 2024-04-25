"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AlertModal from "@/modals/alert-modal";
import { CategoryFormSchema, type CategoryFormType } from "@/schemas/CategorySchema";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Billboard, Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CategoryFormProps {
	category: Category | null;
	billboards: Billboard[];
}

export default function CategoryForm({ category, billboards }: CategoryFormProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const params = useParams();
	const router = useRouter();

	const title = category ? "Editar Categoría" : "Crear Categoría";
	const description = category ? "Edita la categoría de tu tienda" : "Crea una categoría para tu tienda";
	const toastDescription = category ? "Categoría editada correctamente" : "Categoría creada correctamente";
	const actionMessage = category ? "Guardar cambios" : "Crear";

	const form = useForm<CategoryFormType>({
		resolver: yupResolver(CategoryFormSchema),
		defaultValues: category || {
			name: "",
			billboardId: ""
		}
	});

	const onSubmit = async (data: CategoryFormType) => {
		setLoading(true);
		try {
			const response = category
				? await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)
				: await axios.post(`/api/${params.storeId}/categories`, data);

			if (response?.data) {
				toast({
					title: toastDescription,
					variant: "success"
				});
				router.replace(`/${params.storeId}/categories`);
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
			const response = await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
			if (response?.data) {
				toast({
					title: "Categoría eliminada correctamente",
					variant: "success"
				});
				router.replace(`/${params.storeId}/categories`);
			}
		} catch (error) {
			console.error(error);
			toast({
				title: "Asegúrate de que la categoría no tenga productos",
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
				{category && (
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
												placeholder="Nombre de la categoría"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="billboardId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cartelera</FormLabel>
										<FormControl>
											<Select
												disabled={loading}
												onValueChange={field.onChange}
												value={field.value}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue
															defaultValue={field.value}
															placeholder="Selecciona una cartelera"
														/>
														<SelectContent>
															{billboards.map(billboard => {
																return (
																	<SelectItem key={billboard.id} value={billboard.id}>
																		{billboard.label}
																	</SelectItem>
																);
															})}
														</SelectContent>
													</SelectTrigger>
												</FormControl>
											</Select>
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
