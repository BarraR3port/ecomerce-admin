"use client";

import Image from "next/image";
import type { Column } from "./Column";

interface CellImageProps {
	billboard: Column;
}

export default function CellImage({ billboard }: CellImageProps) {
	return (
		<div className="w-full h-14">
			<Image className="rounded-md" src={billboard.imageUrl} alt={billboard.label} width={100} height={56} />
		</div>
	);
}
