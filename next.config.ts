/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [70, 75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Increase timeout for static generation
  staticPageGenerationTimeout: 120,
  
  // Ignore TypeScript errors during build (temporary)
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig;