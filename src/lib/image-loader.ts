"use client";

export default function imageLoader({
  src,
}: {
  src: string;
  width?: number;
  quality?: number;
}) {
  // If absolute external URL, return as is
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }

  const basePath = "/Edaret_Amlak";
  const cleanSrc = src.startsWith("/") ? src : `/${src}`;

  if (cleanSrc.startsWith(basePath)) {
    return cleanSrc;
  }

  return `${basePath}${cleanSrc}`;
}
