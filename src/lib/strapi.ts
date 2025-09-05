// lib/strapi.ts

// Define attributes for an image
interface StrapiImageAttributes {
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  [key: string]: unknown; // Use unknown instead of any for strict mode
}

// Define the data object containing attributes
interface StrapiImageData {
  id?: number | null;
  attributes: StrapiImageAttributes;
  [key: string]: unknown; // Use unknown instead of any
}

// Define a single media object
interface StrapiMediaSingle {
  data?: StrapiImageData | null;
  attributes?: StrapiImageAttributes | null;
  url?: string | null;
  [key: string]: unknown; // Use unknown instead of any
}

// Define the StrapiMedia type, which can be a single media, array of media, null, or undefined
type StrapiMedia = StrapiMediaSingle | StrapiMediaSingle[] | null | undefined;

export function getStrapiMedia(
  media: StrapiMedia,
  index: number = 0 // For multiple images, default to first
): string {
  // Return fallback if media is null or undefined
  if (!media) {
    return "/placeholder.png";
  }

  // Handle array of images
  if (Array.isArray(media)) {
    const mediaItem = media[index];
    if (!mediaItem) {
      return "/placeholder.png";
    }

    // Try to get url from attributes or directly from mediaItem
    const url =
      mediaItem.attributes?.url ??
      (typeof mediaItem.url === "string" ? mediaItem.url : null);

    if (!url) {
      return "/placeholder.png";
    }

    // Construct full URL
    return url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"}${url}`;
  }

  // Handle single media object
  const url =
    media.data?.attributes?.url ??
    media.attributes?.url ??
    (typeof media.url === "string" ? media.url : null);

  if (!url) {
    return "/placeholder.png";
  }

  // Construct full URL
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"}${url}`;
}
