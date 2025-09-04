// lib/strapi.ts
export function getStrapiMedia(
  media: any,
  index: number = 0 // for multiple images, default pick first
): string {
  if (!media) return "/placeholder.png"; // fallback if no image

  // If media is an array of images
  if (Array.isArray(media)) {
    const img = media[index]?.attributes || media[index];
    if (!img) return "/placeholder.png";
    return img.url.startsWith("http")
      ? img.url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${
          img.url
        }`;
  }

  // Single image object
  const img = media.data?.attributes || media;
  if (!img || !img.url) return "/placeholder.png";

  // Return full URL
  return img.url.startsWith("http")
    ? img.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${
        img.url
      }`;
}
