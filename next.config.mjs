/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Si vous utilisez un sous-dossier GitHub Pages
  // basePath: '/nom-de-votre-repo',
  // assetPrefix: '/nom-de-votre-repo/',
}

export default nextConfig
