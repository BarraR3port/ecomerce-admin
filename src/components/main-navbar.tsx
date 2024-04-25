"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function MainNavBar({ className, ..._props }: React.HTMLAttributes<HTMLElement>) {
	const pathname = usePathname();
	const params = useParams();
	const routes = [
		{
			href: `/${params.storeId}/billboards`,
			label: "Carteleras",
			active: pathname.includes(`/${params.storeId}/billboards`)
		},
		{
			href: `/${params.storeId}/categories`,
			label: "Categorías",
			active: pathname.includes(`/${params.storeId}/categories`)
		},
		{
			href: `/${params.storeId}/sizes`,
			label: "Medidas",
			active: pathname.includes(`/${params.storeId}/sizes`)
		},
		{
			href: `/${params.storeId}/colors`,
			label: "Colores",
			active: pathname.includes(`/${params.storeId}/colors`)
		},
		{
			href: `/${params.storeId}/settings`,
			label: "Ajustes",
			active: pathname.includes(`/${params.storeId}/settings`)
		}
	];
	return (
		<nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
			{routes.map(route => {
				return (
					<Link
						key={route.href}
						href={route.href}
						className={cn(
							"text-sm font-medium transition-colors hover:text-primary",
							route.active ? "text-primary" : "text-muted-foreground"
						)}
					>
						{route.label}
					</Link>
				);
			})}
		</nav>
	);
}
