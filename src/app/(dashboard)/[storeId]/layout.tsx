import NavBar from "@/components/navbar";
import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
	params
}: {
	children: React.ReactNode;
	params: {
		storeId: string;
	};
}) {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const { storeId } = params;

	const store = await prisma.store.findFirst({
		where: {
			id: storeId,
			userId: userId
		}
	});

	if (!store) {
		redirect("/");
	}

	return (
		<>
			<NavBar />
			{children}
		</>
	);
}
