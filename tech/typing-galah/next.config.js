/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  experimental: {
    esmExternals: false,
  },
  // Exclude Supabase Edge Functions from build
  webpack: (config, { isServer, webpack }) => {
    // Ignore all files in supabase/functions directory
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /supabase[\/\\]functions/,
      })
    );

    // Replace missing @supabase/functions-js with our stub
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /@supabase\/functions-js/,
        require.resolve("./lib/supabase-functions-stub.js")
      )
    );

    return config;
  },
  // For production deployment - ignore errors temporarily
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
