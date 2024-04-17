import { type InferType, array, boolean, date, object, string } from "yup";

export const StoreModalFormSchema = object({
	name: string()
		.required("El nombre es requerido")
		.min(4, "El nombre debe tener al menos 4 caracteres")
		.max(50, "El nombre no puede tener más de 50 caracteres")
		.trim()
});

export type StoreModalFormType = InferType<typeof StoreModalFormSchema>;
