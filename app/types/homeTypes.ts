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
  foregroundImage?: SanityImageWithAsset;
  underImageText?: string;
  bottomText?: PortableTextBlock[];
  heroText?: PortableTextBlock[];
  heroDisclaimer?: PortableTextBlock[];
  eventTypes?: string[];
  buttons?: SanityButton[];
}

export interface AboutSection {
  image?: SanityImageWithAsset;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  body?: PortableTextBlock[];
  buttons?: SanityButton[];
  leftColumnText?: string;
  centerColumnImage?: SanityImageWithAsset;
  rightColumnText?: string;
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
  caption?: string;
}

export interface HistorySection {
  title?: string;
  description?: string;
  body?: PortableTextBlock[];
  images?: HistoryImage[];
}

export interface BookSection {
  title?: string;
  body?: PortableTextBlock[];
  image?: SanityImageWithAsset;
}

export interface FaqItem {
  _key: string;
  question?: string;
  answer?: string;
}

export interface FaqSection {
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
}

export interface HomePage {
  homeSection?: HomeSection;
  aboutSection?: AboutSection;
  gallerySection?: GallerySection;
  historySection?: HistorySection;
  faqSection?: FaqSection;
  bookSection?: BookSection;
}

export const SECTION_IDS = {
  home: "section-home",
  about: "section-about",
  gallery: "section-gallery",
  history: "section-history",
  faq: "section-faq",
  book: "section-book",
} as const;

export type SectionKey = keyof typeof SECTION_IDS;

export const NAV_SECTIONS: Array<{ id: SectionKey; label: string }> = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "history", label: "IN2TIME" },
  { id: "book", label: "Contact/Reserve" },
  { id: "faq", label: "FAQ" },
];
