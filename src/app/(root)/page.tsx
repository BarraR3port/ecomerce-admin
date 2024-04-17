"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
	const { onOpen, open } = useStoreModal();

	useEffect(() => {
		if (!open) {
			onOpen();
		}
	}, []);
	return (
		<main className="p-4">
			<UserButton afterSignOutUrl="/" />
		</main>
	);
}
