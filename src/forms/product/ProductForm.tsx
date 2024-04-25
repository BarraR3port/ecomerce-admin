"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MultiUploader, type UploadedImage } from "@/components/upload/MultiImageUploader";
import AlertModal from "@/modals/alert-modal";
import { ProductFormSchema, type ProductFormType } from "@/schemas/ProductSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Category, Color, Product, Size } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ProductType = Product & {
	images: UploadedImage[];
};

interface FormProps {
	product: ProductType | null;
	categories: Category[];
	sizes: Size[];
	colors: Color[];
}

export default function ProductForm({ product, categories, colors, sizes }: FormProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const params = useParams();
	const router = useRouter();

	const title = product ? "Editar Producto" : "Crear Producto";
	const description = product ? "Edita la producto de tu tienda" : "Crea una producto para tu tienda";
	const toastDescription = product ? "Producto editada correctamente" : "Producto creada correctamente";
	const actionMessage = product ? "Guardar cambios" : "Crear";

	const form = useForm<ProductFormType>({
		resolver: yupResolver(ProductFormSchema),
		defaultValues: product
			? {
					...product,
					price: Number.parseFloat(String(product?.price))
				}
			: {
					name: "",
					description: "",
					images: [],
					price: 0,
					categoryId: "",
					colorId: "",
					sizeId: "",
					isFeatured: false,
					isArchived: false
				}
	});

	async function onRemove(url: string) {
		await axios.delete("/api/uploadthing", {
			data: {
				url
			}
		});
		form.setValue(
			"images",
			form.getValues("images").filter(image => image.url !== url)
		);
	}

	const onSubmit = async (data: ProductFormType) => {
		setLoading(true);
		try {
			const response = product
				? await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data)
				: await axios.post(`/api/${params.storeId}/products`, data);

			if (response?.data) {
				toast({
					title: toastDescription,
					variant: "success"
				});
				router.replace(`/${params.storeId}/products`);
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
			const response = await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
			if (response?.data) {
				toast({
					title: "Producto eliminada correctamente",
					variant: "success"
				});
				router.replace(`/${params.storeId}/products`);
			}
		} catch (error) {
			console.error(error);
			toast({
				title: "Ocurrió un error al eliminar la producto de tu tienda",
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
				{product && (
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
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
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
												placeholder="Nombre de la producto"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Precio</FormLabel>
										<FormControl>
											<Input
												autoComplete="off"
												disabled={loading}
												placeholder="10000"
												type="number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="categoryId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Categoría</FormLabel>
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
															placeholder="Selecciona una categoría"
														/>
														<SelectContent>
															{categories.map(category => {
																return (
																	<SelectItem key={category.id} value={category.id}>
																		{category.name}
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
							<FormField
								control={form.control}
								name="sizeId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Medida</FormLabel>
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
															placeholder="Selecciona una medida"
														/>
														<SelectContent>
															{sizes.map(size => {
																return (
																	<SelectItem key={size.id} value={size.id}>
																		{size.name}
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
							<FormField
								control={form.control}
								name="colorId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Color</FormLabel>
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
															placeholder="Selecciona un color"
														/>
														<SelectContent>
															{colors.map(color => {
																return (
																	<SelectItem key={color.id} value={color.id}>
																		<div className="flex gap-1">
																			<div className="flex items-center gap-x-2">
																				<div
																					className="h-4 w-4 rounded-full border"
																					style={{
																						backgroundColor: color.value
																					}}
																				/>
																			</div>
																			{color.name}
																		</div>
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

							<FormField
								control={form.control}
								name="isFeatured"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
										<FormControl>
											<Checkbox checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Destacado</FormLabel>
											<FormDescription>
												Marca esta producto como destacada en tu tienda.
											</FormDescription>
										</div>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="isArchived"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
										<FormControl>
											<Checkbox checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Archivado</FormLabel>
											<FormDescription>
												Archiva esta producto para que no se muestre en tu tienda.
											</FormDescription>
										</div>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descripción</FormLabel>
									<FormControl>
										<Textarea placeholder="Descripción de la producto" {...field} />
									</FormControl>

									<FormDescription>
										La descripción debe tener al menos 4 caracteres y no más de 1024 caracteres.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="images"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Imágenes</FormLabel>
									<FormControl className="w-[200px]">
										<MultiUploader
											images={field.value}
											onChange={images => {
												form.setValue("images", [...field.value, ...images]);
												form.clearErrors("images");
												setLoading(false);
											}}
											onRemove={onRemove}
											multiple
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" variant="success" loading={loading} className="w-[200px]">
						{actionMessage}
					</Button>
				</form>
			</Form>
		</>
	);
}
