/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "static.mts.ru",
			},
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
