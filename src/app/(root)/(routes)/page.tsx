"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

export default function Home() {
	const { onOpen, open } = useStoreModal();

	useEffect(() => {
		if (!open) {
			onOpen();
		}
	}, [open, onOpen]);
	return null;
}
