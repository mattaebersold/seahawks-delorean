import type { PortableTextBlock, Image } from "sanity";

// Base Sanity object type
export interface SanityObject {
  _key: string;
  _type: string;
}

// Visual type for images/videos
export interface Visual {
	image?: Image & { alt?: string };
	video?: {
		asset?: {
			_ref: string;
			_type: string;
		};
	};
	alt?: string;
}

export interface BaseCard {
	image: Visual;
	title: string;
	eyebrow: string;
	subtitle: string;
	buttonText: string;
	buttonHref: string;
}

export interface ArticleRef {
	title: string | null;
	slug: { current: string } | null;
	subtitle?: string | null;
	listingImage?: any;
}

export enum MediaAspectRatio {
	Auto = "auto",
	Square = "square",
	Wide = "wide",
	Ultrawide = "ultrawide",
}