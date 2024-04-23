import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ["lucide-react"],
	swcMinify: true,
	distDir: "dist",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "utfs.io",
				port: ""
			}
		]
	}
};

const millionConfig = {
	auto: true,
	rsc: true
};

export default million.next(nextConfig, millionConfig);
