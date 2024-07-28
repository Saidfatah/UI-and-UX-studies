/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      use: [
        'raw-loader',
        'glslify-loader'
      ],
      include: `${process.cwd()}/src` // Use the current working directory to resolve the path
    });
    return config;
  }
};

export default nextConfig;