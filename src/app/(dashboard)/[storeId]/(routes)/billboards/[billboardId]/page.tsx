import BillboardForm from "@/forms/billboard/BillboardForm";
import prisma from "@/lib/prismadb";
import React from "react";

export default async function BillBoardPage({
	params
}: {
	params: {
		billboardId: string;
	};
}) {
	const billboard = await prisma.billboard.findUnique({
		where: {
			id: params.billboardId
		}
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<BillboardForm billboard={billboard} />
			</div>
		</div>
	);
}
