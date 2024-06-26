"use client";

import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { Badge, type BadgeProps } from "@ui/badge";
import { Button } from "@ui/button";
import { useToast } from "@ui/use-toast";
import { Copy, Server } from "lucide-react";

interface ApiAlertProps {
	title: string;
	variant: "public" | "admin";
	description: string;
}

const textMap: Record<ApiAlertProps["variant"], string> = {
	public: "Public",
	admin: "Admin"
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
	public: "secondary",
	admin: "destructive"
};

export function ApiAlert({ title, variant = "public", description }: ApiAlertProps) {
	const { toast } = useToast();

	const onCopy = () => {
		navigator.clipboard.writeText(description);
		toast({
			title: "Copiado al portapapeles",
			variant: "success"
		});
	};

	return (
		<Alert>
			<Server className="h-4 w-4" />
			<AlertTitle className="flex items-center gap-x-2">
				{title}
				<Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
			</AlertTitle>
			<AlertDescription className="mt-4 flex items-center justify-between">
				<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
					{description}
				</code>
				<Button variant="outline" size="icon" onClick={onCopy}>
					<Copy className="h-4 w-4" />
				</Button>
			</AlertDescription>
		</Alert>
	);
}
