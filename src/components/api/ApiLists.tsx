"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { ApiAlert } from "../ui/api-alert";

interface ApiListsProps {
	entityName: string;
	entityIdName: string;
}

export default function ApiLists({ entityName, entityIdName }: ApiListsProps) {
	const params = useParams();
	const origin = useOrigin();

	const baseUrl = useMemo(() => {
		return `${origin}/api/${params.storeId}/${entityName}`;
	}, [origin, params.storeId, entityName]);

	return (
		<>
			<ApiAlert title="GET" variant="public" description={baseUrl} />
			<ApiAlert title="GET" variant="public" description={`${baseUrl}/{${entityIdName}}`} />
			<ApiAlert title="POST" variant="admin" description={baseUrl} />
			<ApiAlert title="PATCH" variant="admin" description={`${baseUrl}/{${entityIdName}}`} />
			<ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/{${entityIdName}}`} />
		</>
	);
}
