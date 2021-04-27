module.exports = {
  distDir: process.env.NODE_ENV === "production" ? `build` : ".next",
  env: {
    API_URL: process.env.API_URL,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    // Important: return the modified config
    return config;
  },
};
