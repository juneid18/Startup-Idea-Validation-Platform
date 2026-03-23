process.env.NEXT_PRIVATE_LOCAL_WEBPACK = "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL || "https://startup-idea-validation-platform.onrender.com",
  },

  webpack(config, options) {
    if (!options.isServer) {
      const { ModuleFederationPlugin } = require("webpack").container;

      config.plugins.push(
        new ModuleFederationPlugin({
          name: "nextHost",
          remotes: {
            AuthRemote: "AuthRemote@https://startup-idea-validation-platform.vercel.app/remoteEntry.js",
            AnalyticsRemote: "analytics_remote@https://startup-idea-validation-platform-yj.vercel.app/remoteEntry.js",
            SubmitIdeaRemote: "SubmiteIdeaRemote@https://startup-idea-validation-platform-id.vercel.app/remoteEntry.js",
          },
          shared: {
            react: {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
            "react-dom": {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
            recharts: {
              singleton: true,
              eager: false,
              requiredVersion: false,
            },
          },
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;