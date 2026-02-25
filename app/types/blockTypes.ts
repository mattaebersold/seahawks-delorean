import type { PortableTextBlock } from "sanity";
import type { BaseCard, Visual, MediaAspectRatio} from "./objectTypes";

export type BaseBlock =
  | CopyBlock
  | MediaBlock
  | CardCarouselBlock
  | CardGridBlock
  | SpacerBlock
  | FormBlock;

export type Block = BaseBlock | ReusableBlockRef;

export interface BlockLayout {
  _key: string;
  _type: string;
  blockSpacing: BlockSpacing;
  disabled: boolean;
  hideWhen: HideWhen[];
}

export enum BlockSpacing {
  None = "",
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum HideWhen {
  Mobile = "mobile",
  Tablet = "tablet",
  Desktop = "desktop",
}

export interface BlockBackground {
  backgroundColor: BackgroundColor;
  paddingTop: BlockPadding;
  paddingBottom: BlockPadding;
}

export enum BackgroundColor {
  None = "",
  Faint = "faint",
  Vibrant = "vibrant",
  Dark = "dark",
}

export enum BlockPadding {
  Matching = "matching",
  None = "",
  Small = "small",
  Medium = "medium",
  Large = "large",
}


export interface CopyBlock extends BlockLayout {
  _type: "copyBlock";
  internalTitle?: string;
  body: PortableTextBlock[];
  // Optional background fields
  backgroundColor?: BackgroundColor;
  paddingTop?: BlockPadding;
  paddingBottom?: BlockPadding;
}

// Media Block type
export interface MediaBlock extends BlockLayout {
  _type: "mediaBlock";
  internalTitle?: string;
  media: Visual;
  caption?: string;
  aspectRatio?: MediaAspectRatio;
  backgroundColor?: BackgroundColor;
  paddingTop?: BlockPadding;
  paddingBottom?: BlockPadding;
}

export interface CardGridBlock extends BlockLayout {
  _type: "cardGridBlock";
  internalTitle?: string;
  blockHeading?: string;
  cards?: BaseCard[];
}

export interface CardCarouselBlock extends BlockLayout {
  _type: "cardCarouselBlock";
  internalTitle?: string;

  eyebrow?: string;
  heading?: string;
  cards?: BaseCard[];
}

export interface SpacerBlock extends BlockLayout {
  _type: "spacerBlock";
  internalTitle?: string;
  size?: "small" | "medium" | "large";
}

export interface FormField {
  _key: string;
  label: string;
  name: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface FormBlock extends BlockLayout {
  _type: "formBlock";
  internalTitle?: string;
  formName?: string;
  heading?: string;
  fields?: FormField[];
  submitText?: string;
  successMessage?: string;
  backgroundColor?: BackgroundColor;
  paddingTop?: BlockPadding;
  paddingBottom?: BlockPadding;
}

// Reusable Block document type
export interface ReusableBlock {
  _id: string;
  _type: "reusableBlock";
  title: string;
  blocks: BaseBlock[];
}

// Reusable Block Reference type (references a ReusableBlock document)
export interface ReusableBlockRef extends BlockLayout {
  _type: "reusableBlockRef";
  internalTitle?: string;
  reusableBlock: ReusableBlock;
}


// Tower type
export interface Tower {
  _id: string;
  _type: "tower";
  title: string;
  slug: { current: string };
  blocks: Block[];
}