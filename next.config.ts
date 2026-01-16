/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'delivisor.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '5.imimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all domains (less secure)
      },
    ],
    // For more control, you can also specify domains like this:
    domains: [
      'delivisor.com',
      'media.istockphoto.com',
      'encrypted-tbn0.gstatic.com',
      '5.imimg.com',
      'images.unsplash.com',
      'plus.unsplash.com',
      'cdn.pixabay.com',
    ],
  },
}

module.exports = nextConfig