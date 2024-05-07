import ColorForm from "@/forms/color/ColorForm";
import prisma from "@/lib/prismadb";

export default async function SizePage({
	params
}: {
	params: {
		colorId: string;
		storeId: string;
	};
}) {
	const color = await prisma.color
		.findUnique({
			where: {
				id: params.colorId
			}
		})
		.catch(() => null);

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<ColorForm color={color} />
			</div>
		</div>
	);
}
