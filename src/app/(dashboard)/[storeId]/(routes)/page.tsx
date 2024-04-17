"use client";

import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
	return (
		<div className="p-4">
			<UserButton afterSignOutUrl="/" />
		</div>
	);
};

export default DashboardPage;
