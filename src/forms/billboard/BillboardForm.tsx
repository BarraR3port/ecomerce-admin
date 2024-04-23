"use client";

import BillboardImageUpload from "@/components/bilboard/BillboardImageUpload";
import { ApiAlert } from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { UploadButton } from "@/components/uploadthing";
import { useOrigin } from "@/hooks/use-origin";
import AlertModal from "@/modals/alert-modal";
import { BillboardFormSchema, type BillboardFormType } from "@/schemas/BillboardSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Billboard } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface BillboardFormProps {
	billboard: Billboard | null;
}

export default function BillboardForm({ billboard }: BillboardFormProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const params = useParams();
	const router = useRouter();

	const title = billboard ? "Editar Cartelera" : "Crear Cartelera";
	const description = billboard ? "Edita la cartelera de tu tienda" : "Crea una cartelera para tu tienda";
	const toastDescription = billboard ? "Cartelera editada correctamente" : "Cartelera creada correctamente";
	const actionMessage = billboard ? "Guardar cambios" : "Crear";

	const origin = useOrigin();
	const form = useForm<BillboardFormType>({
		resolver: yupResolver(BillboardFormSchema),
		defaultValues: billboard || {
			label: "",
			imageUrl: ""
		}
	});

	async function onRemove(url: string) {
		await axios.delete("/api/uploadthing", {
			data: {
				url
			}
		});
		form.setValue("imageUrl", "");
	}

	const onSubmit = async (data: BillboardFormType) => {
		setLoading(true);
		try {
			const response = billboard
				? await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
				: await axios.post(`/api/${params.storeId}/billboards`, data);

			if (response?.data) {
				toast({
					title: toastDescription,
					variant: "success"
				});
				router.replace(`/${params.storeId}/billboards`);
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
			const response = await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
			if (response?.data) {
				toast({
					title: "Cartelera eliminada correctamente",
					variant: "success"
				});
				router.replace(`/${params.storeId}/billboards`);
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
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />
				{billboard && (
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
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="imageUrl"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Imagen</FormLabel>
									<FormControl>
										<BillboardImageUpload
											value={field?.value ? [field.value] : []}
											onChange={file => {
												form.setValue("imageUrl", file);
											}}
											onRemove={onRemove}
											disabled={loading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Etiqueta</FormLabel>
									<FormControl>
										<Input
											autoComplete="off"
											disabled={loading}
											placeholder="Nombre de la cartelera"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button className="ml-auto" type="submit" loading={loading}>
						{actionMessage}
					</Button>
				</form>
			</Form>
			<Separator />
		</>
	);
}
