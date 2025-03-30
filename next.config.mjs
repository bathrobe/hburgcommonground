import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
        port: '',
        // pathname: '/account123/**',
        search: '',
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
