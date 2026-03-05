import type { PortableTextBlock } from "sanity";

export interface SanityImageAsset {
  _id: string;
  url: string;
}

export interface SanityImageWithAsset {
  asset: SanityImageAsset;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface SanityButton {
  _key: string;
  text: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
}

export interface MarqueeImage {
  _key: string;
  image: SanityImageWithAsset;
  alt?: string;
}

export interface GalleryImage {
  _key: string;
  image: SanityImageWithAsset;
  alt?: string;
}

export interface HomeSection {
  images?: MarqueeImage[];
  title?: string;
  subtitle?: string;
  buttons?: SanityButton[];
}

export interface AboutSection {
  image?: SanityImageWithAsset;
  imageAlt?: string;
  title?: string;
  body?: PortableTextBlock[];
  buttons?: SanityButton[];
}

export interface GallerySection {
  title?: string;
  images?: GalleryImage[];
}

export interface BookSection {
  title?: string;
  body?: PortableTextBlock[];
  image?: SanityImageWithAsset;
  imageAlt?: string;
}

export interface HomePage {
  homeSection?: HomeSection;
  aboutSection?: AboutSection;
  gallerySection?: GallerySection;
  bookSection?: BookSection;
}

export const SECTION_IDS = {
  home: "section-home",
  about: "section-about",
  gallery: "section-gallery",
  book: "section-book",
} as const;

export type SectionKey = keyof typeof SECTION_IDS;

export const NAV_SECTIONS: Array<{ id: SectionKey; label: string }> = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "book", label: "Book Appointment" },
];
