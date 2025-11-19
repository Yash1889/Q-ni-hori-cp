/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better development experience
    reactStrictMode: true,

    // Optimize production bundle
    compiler: {
        // Remove console.log in production
        removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
    },

    // Performance optimizations
    experimental: {
        optimizePackageImports: ["lucide-react", "framer-motion"],
    },

    // Enable SWC minification for faster builds
    swcMinify: true,
};

export default nextConfig;
