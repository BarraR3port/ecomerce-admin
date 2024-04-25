"use client";

import Image from "next/image";
import type { BillboardColumn } from "./BillboardsColumn";

interface BillboardCellImageProps {
	billboard: BillboardColumn;
}

export default function BillboardCellImage({ billboard }: BillboardCellImageProps) {
	return (
		<div className="w-full h-14">
			<Image className="rounded-md" src={billboard.imageUrl} alt={billboard.label} width={100} height={56} />
		</div>
	);
}
