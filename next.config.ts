import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Edaret_Amlak",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  ...(isDev
    ? {
        async redirects() {
          return [
            {
              source: "/",
              has: [
                {
                  type: "cookie",
                  key: "realestate_auth",
                },
              ],
              destination: "/Edaret_Amlak/dashboard/",
              basePath: false,
              permanent: false,
            },
            {
              source: "/",
              destination: "/Edaret_Amlak/login/",
              basePath: false,
              permanent: false,
            },
          ];
        },
      }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
