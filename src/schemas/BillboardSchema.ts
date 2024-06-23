import { boolean, type InferType, object, string } from "yup";

export const BillboardFormSchema = object({
	label: string()
		.required("El nombre es requerido")
		.min(4, "El nombre debe tener al menos 4 caracteres")
		.max(50, "El nombre no puede tener más de 50 caracteres")
		.trim(),
	imageUrl: string().required("La URL de la imagen es requerida").url("La URL de la imagen no es válida").trim(),
	hiddenLabel: boolean().default(false)
});

export type BillboardFormType = InferType<typeof BillboardFormSchema>;
