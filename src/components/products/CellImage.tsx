"use client";

import Image from "next/image";
import type { Column } from "./Column";

interface CellImageProps {
	product: Column;
}

export default function CellImage({ product }: CellImageProps) {
	return (
		<div className="w-full h-14">
			<Image className="rounded-md" src={product.imageUrl} alt={product.name} width={100} height={56} />
		</div>
	);
}
