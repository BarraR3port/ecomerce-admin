"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useStoreModal } from "@/hooks/use-store-modal";
import { StoreModalFormSchema, type StoreModalFormType } from "@/schemas/StoreModalSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "@ui/modal";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const StoreModal = () => {
	const { open, onClose } = useStoreModal();
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

	const form = useForm<StoreModalFormType>({
		resolver: yupResolver(StoreModalFormSchema),
		defaultValues: {
			name: ""
		}
	});

	const onSubmit = async (values: StoreModalFormType) => {
		try {
			setLoading(true);

			const response = await axios.post("/api/stores", values);

			if (response?.data) {
				toast({
					title: "Tienda creada correctamente",
					variant: "success"
				});
				window.location.assign(`/${response.data.id}`);
				//router.replace(`/${response.data.id}`);
				onClose();
			}
		} catch (error) {
			console.error(error);
			toast({
				title: "Ocurrió un error al crear la tienda",
				variant: "destructive"
			});
		}
		setLoading(false);
	};

	return (
		<Modal title="Crear una tienda" description="Ingresa los datos de tu tienda" open={open} onClose={onClose}>
			<div className="space-y-4 py-2 pb-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre del Negocio</FormLabel>
									<FormControl>
										<Input disabled={loading} placeholder="Ejemplo: Tienda de ropa" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="pt-6 space-x-2 flex items-center justify-end w-full">
							<Button disabled={loading} variant="destructive" onClick={onClose}>
								Cancelar
							</Button>
							<Button loading={loading} type="submit" variant="success">
								Crear
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</Modal>
	);
};
