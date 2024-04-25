import { type InferType, array, boolean, number, object, string } from "yup";

export const ProductFormSchema = object({
	name: string()
		.required("El nombre es requerido")
		.min(4, "El nombre debe tener al menos 4 caracteres")
		.max(50, "El nombre no puede tener más de 50 caracteres")
		.trim(),
	description: string()
		.required("La descripción es requerida")
		.min(4, "La descripción debe tener al menos 4 caracteres")
		.max(1024, "La descripción no puede tener más de 1024 caracteres")
		.trim(),
	images: array()
		.of(
			object({
				url: string()
					.required("La URL de la imagen es requerida")
					.url("La URL de la imagen no es válida")
					.trim()
			})
		)
		.min(1, "Debes agregar al menos una imagen")
		.required("La imagen es requerida"),
	price: number().required("El precio es requerido").min(0, "El precio no puede ser menor a 0"),
	categoryId: string().required("La categoría es requerida").trim(),
	colorId: string().required("El color es requerido").trim(),
	sizeId: string().required("El tamaño es requerido").trim(),
	isFeatured: boolean().required("El estado destacado es requerido"),
	isArchived: boolean().required("El estado archivado es requerido")
});

export type ProductFormType = InferType<typeof ProductFormSchema>;
