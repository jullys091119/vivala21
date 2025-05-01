/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Elimina los remotePatterns si ya no quieres usar imágenes remotas
    domains: [], // Puedes dejar esto vacío si no estás utilizando imágenes remotas
  },
};

export default nextConfig;
