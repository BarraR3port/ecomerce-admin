import prisma from "@/lib/prismadb";

interface DashboardPageProps {
	params: {
		storeId: string;
	};
}
export default async function DashboardPage(props: DashboardPageProps) {
	const { storeId } = props.params;

	const store = await prisma.store.findUnique({
		where: {
			id: storeId
		}
	});

	return <div className="p-4">Active store: {store?.name}</div>;
}
