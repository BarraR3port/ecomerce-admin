import SizeForm from "@/forms/size/SizeForm";
import prisma from "@/lib/prismadb";

export default async function SizePage({
	params
}: {
	params: {
		sizeId: string;
		storeId: string;
	};
}) {
	const size = await prisma.size.findUnique({
		where: {
			id: params.sizeId
		}
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SizeForm size={size} />
			</div>
		</div>
	);
}
