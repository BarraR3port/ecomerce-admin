import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/providers/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { TailwindIndicator } from "@/components/ui/tailwindcss-indicator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Marketplace Admin Panel",
	description: "El mejor panel de administración para tus negocios"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="es">
				<head />
				<body className={inter.className}>
					<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
						<TooltipProvider>
							<Toaster />
							<ModalProvider />

							{children}
							<TailwindIndicator />
						</TooltipProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
