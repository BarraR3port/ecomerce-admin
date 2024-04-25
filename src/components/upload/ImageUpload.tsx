import { Save, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ImageUploadProps {
	url: string;
	onRemove: (value: string) => void;
	saved?: boolean;
}

export default function ImageUpload({ url, onRemove, saved }: ImageUploadProps) {
	return (
		<div className="space-y-2">
			<div key={url} className="relative min-h-[150px] rounded-md overflow-hidden">
				<div className="z-10 absolute top-2 right-2">
					<Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
						<Trash className="h-4 w-4" />
					</Button>
				</div>
				{saved && (
					<div className="z-10 absolute top-2 left-2">
						<Tooltip>
							<TooltipTrigger type="button">
								<Button type="button" variant="ghost" size="icon" className="hover:bg-none">
									<Save className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Imagen guardada</TooltipContent>
						</Tooltip>
					</div>
				)}
				<Image src={url} fill className="object-cover" alt="image" />
			</div>
		</div>
	);
}
