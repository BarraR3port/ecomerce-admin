import { type InferType, object, string } from "yup";

export const ColorFormSchema = object({
	name: string()
		.required("El nombre es requerido")
		.min(4, "El nombre debe tener al menos 4 caracteres")
		.max(50, "El nombre no puede tener más de 50 caracteres")
		.trim(),
	value: string()
		.matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "El valor debe ser un color hexadecimal")
		.required("El valor es requerido")
		.min(4, "El valor debe tener al menos 4 caracteres")
		.max(50, "El valor no puede tener más de 50 caracteres")
		.trim()
});

export type ColorFormType = InferType<typeof ColorFormSchema>;
