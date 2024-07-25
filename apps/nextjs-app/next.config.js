/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  // output: 'export', // Outputs a Single-Page Application (SPA).
  // distDir: './dist', // Changes the build output directory to `./dist/`.
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@nextjs-app": path.resolve(__dirname, "apps/nextjs-app/src"),
      "@remix-app": path.resolve(__dirname, "apps/remix-app/src"),
      "@ui": path.resolve(__dirname, "packages/ui/src"),
      "@utils": path.resolve(__dirname, "packages/utils/src")
    }
    return config
  }
}