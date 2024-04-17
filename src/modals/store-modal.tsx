"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { StoreModalFormSchema, type StoreModalFormType } from "@/schemas/StoreModalSchema";
import { Modal } from "@ui/modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const StoreModal = () => {
	const { open, onClose } = useStoreModal();

	const form = useForm<StoreModalFormType>({
		resolver: yupResolver(StoreModalFormSchema),
		defaultValues: {
			name: ""
		}
	});

	const onSubmit = async (values: StoreModalFormType) => {
		console.log(values);
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
										<Input placeholder="Ejemplo: Tienda de ropa" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="pt-6 space-x-2 flex items-center justify-end w-full">
							<Button variant="outline" onClick={onClose}>
								Cancelar
							</Button>
							<Button type="submit">Continuar</Button>
						</div>
					</form>
				</Form>
			</div>
		</Modal>
	);
};
