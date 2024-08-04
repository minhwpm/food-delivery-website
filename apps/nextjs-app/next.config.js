/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  // output: 'export', // Outputs a Single-Page Application (SPA).
  // distDir: './dist', // Changes the build output directory to `./dist/`.
  env: {
    FIREBASE_ADMIN_CREDENTIAL: process.env.FIREBASE_ADMIN_CREDENTIAL,
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@nextjs-app": path.resolve(__dirname, "apps/nextjs-app/src"),
      "@remix-app": path.resolve(__dirname, "apps/remix-app/src"),
      "@react-components": path.resolve(__dirname, "packages/react-components/src"),
      "@utils": path.resolve(__dirname, "packages/utils/src")
    }

    return config
  }
  
}