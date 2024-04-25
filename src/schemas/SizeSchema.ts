import { type InferType, object, string } from "yup";

export const SizeFormSchema = object({
	name: string()
		.required("El nombre es requerido")
		.min(4, "El nombre debe tener al menos 4 caracteres")
		.max(50, "El nombre no puede tener más de 50 caracteres")
		.trim(),
	value: string()
		.required("El valor es requerido")
		.min(1, "El valor debe tener al menos 1 carácter")
		.max(50, "El valor no puede tener más de 50 caracteres")
		.trim()
});

export type SizeFormType = InferType<typeof SizeFormSchema>;
