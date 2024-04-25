import { createRouteHandler } from "uploadthing/next";

import { utapi } from "@/lib/uploadthing";
import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
	router: ourFileRouter

	// Apply an (optional) custom config:
	// config: { ... },
});

export async function DELETE(request: Request) {
	const data = await request.json();
	const newUrl = data.url.substring(data.url.lastIndexOf("/") + 1);
	await utapi.deleteFiles(newUrl).catch(error => {
		console.error("[DELETE]", error);
	});

	return Response.json({ message: "ok" });
}
