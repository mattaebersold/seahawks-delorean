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
  image?: SanityImageWithAsset;
  video?: { asset: { _id: string; url: string } };
}

export interface GalleryImage {
  _key: string;
  image: SanityImageWithAsset;
  caption?: string;
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
  description?: string;
  images?: GalleryImage[];
}

export interface HistoryImage {
  _key: string;
  image: SanityImageWithAsset;
  alt?: string;
}

export interface HistorySection {
  title?: string;
  description?: string;
  images?: HistoryImage[];
}

export interface BookSection {
  title?: string;
  body?: PortableTextBlock[];
  image?: SanityImageWithAsset;
}

export interface HomePage {
  homeSection?: HomeSection;
  aboutSection?: AboutSection;
  gallerySection?: GallerySection;
  historySection?: HistorySection;
  bookSection?: BookSection;
}

export const SECTION_IDS = {
  home: "section-home",
  about: "section-about",
  gallery: "section-gallery",
  history: "section-history",
  book: "section-book",
} as const;

export type SectionKey = keyof typeof SECTION_IDS;

export const NAV_SECTIONS: Array<{ id: SectionKey; label: string }> = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "history", label: "History" },
  { id: "book", label: "Book Appointment" },
];
