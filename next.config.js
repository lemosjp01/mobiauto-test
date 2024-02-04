/** @type {import('next').NextConfig} */
const nextConfig = {webpack: (config, { isServer }) => {
  if (!isServer) {
    config.externals = {
      bufferutil: "bufferutil",
      "utf-8-validate": "utf-8-validate",
    };
  }
  return config;
},
  env: {
    API_HOST: process.env.API_HOST
  }
}

module.exports = nextConfig
