import { cn } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react";
import { CloudUpload, ImageUp, MonitorUp } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useUploadThing } from "../uploadthing";
import ImageUpload from "./ImageUpload";

export type UploadedImage = {
	url: string;
};

type ImageFile = {
	url: string;
	file: File;
};

interface MultiUploaderProps {
	images: UploadedImage[];
	onChange: (values: UploadedImage[]) => void;
	onRemove: (value: string) => void;
	multiple?: boolean;
}

export function MultiUploader({ images, onChange, onRemove, multiple = false }: MultiUploaderProps) {
	const [files, setFiles] = useState<ImageFile[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const [progress, setProgress] = useState(0);
	const [uploading, setUploading] = useState(false);
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const newFiles = acceptedFiles.map(file => ({
				url: URL.createObjectURL(file),
				file
			}));

			const uniqueFiles = newFiles.filter(newFile => !files.some(file => file.file.name === newFile.file.name));

			setFiles([...files, ...uniqueFiles]);
		},
		[files]
	);

	const { startUpload } = useUploadThing("productImageUploader", {
		onClientUploadComplete: uploadedFiles => {
			files.forEach(file => {
				URL.revokeObjectURL(file.url);
			});
			onChange(uploadedFiles);
			setProgress(0);
			setUploading(false);
			setFiles([]);
		},
		onUploadError: () => {
			alert("error occurred while uploading");
			setProgress(0);
		},
		onUploadBegin: () => {
			setUploading(true);
		},
		onUploadProgress: progress => {
			console.log("Upload Progress", progress);
			setProgress(progress);
		}
	});

	const fileTypes = ["image"];

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
		multiple,
		disabled: uploading
	});

	const deleteFile = (file: ImageFile) => {
		const newFiles = files.filter(f => f.url !== file.url);
		URL.revokeObjectURL(file.url);
		setFiles(newFiles);
	};

	const fileList = useMemo(() => {
		return files.map(file => {
			return <ImageUpload url={file.url} onRemove={() => deleteFile(file)} />;
		});
	}, [files, progress, uploading]);

	return (
		<div {...getRootProps()} className="space-y-2 ">
			<input {...getInputProps()} ref={inputRef} />

			{images.length === 0 && files.length === 0 && (
				<div
					onClick={() => {
						inputRef.current?.click();
					}}
					className="w-[200px] h-[200px] bg-background-container rounded-md flex items-center justify-center"
				>
					<ImageUp className="h-8 w-8" />
				</div>
			)}
			<div className="space-y-2">
				<div className="grid items-center content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full gap-y-4">
					{images.map(image => (
						<ImageUpload url={image.url} onRemove={onRemove} saved />
					))}
				</div>
				<div className="grid items-center content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full gap-y-4">
					{fileList}
				</div>
			</div>
			<div className={cn(uploading ? "block" : "opacity-0")}>{<Progress value={progress} />}</div>
			<div className="space-x-2">
				<Button
					prevIcon={<MonitorUp className="h-4 w-4" />}
					variant="secondary"
					type="button"
					className="w-[200px]"
					onClick={() => inputRef.current?.click()}
					disabled={uploading}
				>
					Cargar {multiple ? "imágenes" : "imagen"}
				</Button>
				{files.length > 0 && (
					<Button
						prevIcon={<CloudUpload className="h-4 w-4" />}
						variant="default"
						type="button"
						className="w-[200px] space-x-2"
						onClick={() => startUpload(files.map(f => f.file))}
						disabled={uploading}
					>
						Subir {files.length} {multiple ? "archivos" : "archivo"}
					</Button>
				)}
			</div>
		</div>
	);
}
