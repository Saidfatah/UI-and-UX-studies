/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    viewTransition:true,
  },
  turbopack: {
    rules: {
      '*.glsl': {
        loaders: ['raw-loader', 'glslify-loader'],
        as: '*.js',
      },

      '*.html': {
        loaders: ['html-loader'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;