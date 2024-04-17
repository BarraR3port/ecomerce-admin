import MainNavBar from "@/components/main-navbar";
import StoreSwitcher from "@/components/store-switcher";
import prisma from "@/lib/prismadb";
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function NavBar() {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const stores = await prisma.store.findMany({
		where: {
			userId: userId
		}
	});

	return (
		<div className="border-b">
			<div className="flex h-16 items-center px-4">
				<StoreSwitcher stores={stores} />
				<MainNavBar className="mx-6" />
				<div className="ml-auto flex items-center space-x-4">
					<UserButton afterSignOutUrl="/" />
				</div>
			</div>
		</div>
	);
}
