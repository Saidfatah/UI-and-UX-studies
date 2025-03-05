/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // GLSL Loader
    config.module.rules.push({
      test: /\.glsl$/,
      use: [
        'raw-loader',
        'glslify-loader'
      ],
      include: `${process.cwd()}/src`
    });

    // HTML Loader
    config.module.rules.push({
      test: /\.html$/,
      use: 'html-loader',
      include: `${process.cwd()}/src` // Adjust this path as necessary
    });

    return config;
  }
};

export default nextConfig;
