export interface ImageFormat {
  url: string;
  width: number;
  height: number;
  key: string;
}

export interface ImageType {
  id: number;
  name: string;
  url: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  alternativeText?: string | null;
  caption?: string | null;
}

export interface ProjectAdminType {
  id: string;
  documentId: string;
  title: string;
  description: string;
  features: string;
  techStack: string;
  active: boolean;
  // image: ImageType | string | null;
  image: string;
  createdAt: string;
}

export interface ProjectCreateInput {
  title?: string;
  description?: string;
  features?: string;
  techStack?: string;
  active?: boolean;
  image?: number | null;
}
