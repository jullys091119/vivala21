// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.vivalanoticia.mx',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      // Agrega aquí cualquier otro hostname de imágenes externas que utilices
    ],
  },
};

export default nextConfig;