import { getAuth } from "@clerk/nextjs/server";
import { type FileRouter, createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: "4MB", minFileCount: 1, maxFileCount: 1 } })
		.middleware(async ({ req }) => {
			const { userId } = getAuth(req);

			if (!userId) throw new UploadThingError("Unauthorized");

			return { userId };
		})
		.onUploadError(async ({ error }) => {
			console.error("Upload error:", error);
		})
		.onUploadComplete(async ({ metadata, file }) => {
			return { uploadedBy: metadata.userId, url: file.url };
		}),
	productImageUploader: f({ image: { maxFileSize: "4MB", minFileCount: 1, maxFileCount: 10 } })
		.middleware(async ({ req }) => {
			const { userId } = getAuth(req);

			if (!userId) throw new UploadThingError("Unauthorized");

			return { userId };
		})
		.onUploadError(async ({ error }) => {
			console.error("Upload error:", error);
		})
		.onUploadComplete(async ({ file }) => {
			return { url: file.url };
		})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
