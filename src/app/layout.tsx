import { ModalProvider } from "@/providers/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "J&B Marketplace - Admin Panel",
	description: "El mejor panel de administración para tu negocio"
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
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
						<ModalProvider />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
