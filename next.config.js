/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://api.tps.co.id/api/:path*', 
            },
        ];
    },
};

module.exports = nextConfig;
