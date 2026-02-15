const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

let titles = ["Welcome!", "pls be rich", "i need money", "cool code", "right?", ":p"];
let typingSpeed = 300;      // ms per character
let deletingSpeed = 200;    // ms per character
let pauseAfterTyping = 1000; // ms to wait after full title
let pauseAfterDeleting = 500; // ms before next title

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeWriter() {
    while (true) {
        for (let title of titles) {
            // Type letters
            for (let i = 0; i <= title.length; i++) {
                document.title = title.slice(0, i) + "|"; // add cursor
                await sleep(typingSpeed);
            }

            await sleep(pauseAfterTyping);

            // Delete letters
            for (let i = title.length; i >= 0; i--) {
                document.title = title.slice(0, i) + (i > 0 ? "|" : ""); // remove cursor when empty
                await sleep(deletingSpeed);
            }

            await sleep(pauseAfterDeleting);
        }
    }
}

typeWriter();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        
      },
      { // Note: needed to serve images from /public folder
        protocol: process.env.NEXT_PUBLIC_BASE_URL?.startsWith('https') ? 'https' : 'http',
        hostname: process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, ''),
      },
      { // Note: only needed when using local-file for product media
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace('https://', ''),
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      ...(process.env.NEXT_PUBLIC_MINIO_ENDPOINT ? [{ // Note: needed when using MinIO bucket storage for media
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
      }] : []),
    ],
  },
  serverRuntimeConfig: {
    port: process.env.PORT || 3000
  }
}

module.exports = nextConfig
