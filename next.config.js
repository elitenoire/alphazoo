const withSvgr = require('@newhighsco/next-plugin-svgr')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    emotion: true,
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },
}

function withSvgrConfig() {
  return withSvgr({
    svgrOptions: {
      typescript: true,
      titleProp: true,
    },
  })
}

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [withSvgrConfig]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...defaultConfig, ...nextConfig })
}
