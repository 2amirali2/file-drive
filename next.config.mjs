/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'harmless-meadowlark-61.convex.cloud'
            }
        ]
    }
};

export default nextConfig;
