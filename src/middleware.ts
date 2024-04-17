import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
	matcher: [
		"/((?!.+\\.[\\w]+$|_next).*)", // Excluir solicitudes de archivos con extensiones
		"/", // Manejar la raíz de la aplicación
		"/(api|trpc)(.*)" // Manejar las rutas "/api" y "/trpc"
	]
};
