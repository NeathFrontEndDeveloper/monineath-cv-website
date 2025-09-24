export type StrapiImageFormat = {
  url: string;
  width?: number;
  height?: number;
};

export type StrapiImage = {
  id: number;
  name: string;
  url: string;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  alternativeText?: string | null;
  height: number;
  width: number;
};
