"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AlertModal from "@/modals/alert-modal";
import { SettingsFormSchema, type SettingsFormType } from "@/schemas/SettingsSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SettingsFormProps {
	store: Store;
}

export default function SettingsForm({ store }: SettingsFormProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const params = useParams();
	const router = useRouter();
	const form = useForm<SettingsFormType>({
		resolver: yupResolver(SettingsFormSchema),
		defaultValues: store
	});

	const onSubmit = async (data: SettingsFormType) => {
		setLoading(true);
		try {
			const response = await axios.patch(`/api/stores/${params.storeId}`, data);

			if (response?.data) {
				toast({
					title: "Ajustes guardados correctamente",
					variant: "success"
				});
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
			const response = await axios.delete(`/api/stores/${params.storeId}`);
			if (response?.data) {
				toast({
					title: "Tienda eliminada correctamente",
					variant: "success"
				});
				router.replace("/");
				router.refresh();
			}
		} catch (error) {
			console.error(error);
			toast({
				title: "Ocurrió un error al eliminar la tienda",
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
				<Heading title={"Ajustes"} description={"Ajustes de tu tienda"} />
				<Button
					variant="destructive"
					size={"sm"}
					onClick={() => {
						setOpen(true);
					}}
				>
					<Trash className="h-4 w-4" />
				</Button>
			</div>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
					<div className="grid grid-cols-3 gap-8">
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
											placeholder="Nombre de la tienda"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button className="ml-auto" type="submit" loading={loading}>
						Guardar
					</Button>
				</form>
			</Form>
		</>
	);
}
