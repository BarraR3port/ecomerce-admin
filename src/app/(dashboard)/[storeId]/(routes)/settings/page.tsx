import SettingsForm from "@/forms/settings/SettingsForm";
import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface SettingsPageProps {
	params: {
		storeId: string;
	};
}

export default async function SettingsPage({ params }: SettingsPageProps) {
	const { userId } = auth();
	if (!userId) {
		redirect("/sign-in");
	}

	const store = await prisma.store.findFirst({
		where: {
			id: params.storeId,
			userId: userId
		}
	});

	if (!store) {
		redirect("/");
	}

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SettingsForm store={store} />
			</div>
		</div>
	);
}
