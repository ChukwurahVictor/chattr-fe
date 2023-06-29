/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // async redirects() {
  //   return [
  //     {
  //       source: "/home",
  //       destination: "/",
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig

// module.exports = {
//   async redirects() {
//     return [
//       {
//         source: "/home",
//         destination: "/",
//         permanent: true,
//       },
//     ];
//   },
// };