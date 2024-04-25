import { type InferType, object, string } from "yup";

export const CategoryFormSchema = object({
	name: string()
		.required("El nombre es requerido")
		.min(4, "El nombre debe tener al menos 4 caracteres")
		.max(50, "El nombre no puede tener más de 50 caracteres")
		.trim(),
	billboardId: string().required("La cartelera es requerida")
});

export type CategoryFormType = InferType<typeof CategoryFormSchema>;
