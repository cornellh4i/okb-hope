const { default: next } = require('next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// module.exports = nextConfig

// module.exports = nextConfig
// {
//   webpack: (
//     config,
//     { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
//   ) => {
//     return nextConfig
//   }
// }

// module.exports = withFonts({
//   webpack: (config) => {
//     // Add the babel-loader rule to transpile your JSX code
//     config.module.rules.push({
//       test: /\.(ts|js)x?$/,
//       exclude: /node_modules/,
//       use: {
//         loader: 'babel-loader',
//         options: {
//           presets: [
//             '@babel/preset-env',
//             '@babel/preset-react',
//             '@babel/preset-typescript',
//           ],
//         },
//       },
//     });

//     return config;
//   },
// });