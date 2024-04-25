"use client";

import { UploadButton } from "@/components/uploadthing";
import { Button } from "@ui/button";
import { ImageOff, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface BillboardImageUploadProps {
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	onLoadChange: (value: boolean) => void;
	url: string;
}

export default function BillboardImageUpload({ onChange, onRemove, url, onLoadChange }: BillboardImageUploadProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<div className="mb-4 flex items-center gap-4 w-[200px] h-[200px]">
				{url && (
					<div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
						<div className="z-10 absolute top-2 right-2">
							<Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
								<Trash className="h-4 w-4" />
							</Button>
						</div>
						<Image src={url} fill className="object-cover" alt="image" />
					</div>
				)}
				{!url && (
					<div className="w-[200px] h-[200px] bg-background-container rounded-md flex items-center justify-center">
						<ImageOff className="h-8 w-8" />
					</div>
				)}
			</div>
			<UploadButton
				endpoint="imageUploader"
				onClientUploadComplete={res => {
					res.forEach(file => {
						onChange(file.url);
					});
					onLoadChange(false);
				}}
				onUploadBegin={() => onLoadChange(true)}
				onUploadError={(error: Error) => {
					console.log(error);
					// Do something with the error.
					alert(`ERROR! ${error.message}`);
					onLoadChange(false);
				}}
				appearance={{
					button: "w-[200px] ut-ready:bg-background-container-secondary ut-uploading:cursor-not-allowed bg-success bg-none after:bg-background-container-secondary after:opacity-60 ",
					container: "w-max flex-row rounded-md bg-slate-800",
					allowedContent: "hidden"
				}}
				content={{
					button: "Subir Imagen"
				}}
			/>
		</>
	);
}
