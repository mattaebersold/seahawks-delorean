import * as blockSchemas from "./blocks";
import { articleSchema } from "./articleSchema";
import { homeSectionSchema } from "./homeSectionSchema";
import { aboutSectionSchema } from "./aboutSectionSchema";
import { gallerySectionSchema } from "./gallerySectionSchema";
import { historySectionSchema } from "./historySectionSchema";
import { bookSectionSchema } from "./bookSectionSchema";
import { settingsSchema } from "./settingsSchema";
import { towerSchema } from "./towerSchema";
import { cardSchema } from "./objects/cardSchema";
import { navLinkSchema } from "./objects/navLinkSchema";
import { portableTextButtonSchema } from "./objects/portableTextButtonSchema";
import { formFieldSchema } from "./objects/formFieldSchema";
import { reusableBlockSchema } from "./blocks/reusableBlockSchema";

export default [
  ...Object.values(blockSchemas),
  reusableBlockSchema,
  articleSchema,
  homeSectionSchema,
  aboutSectionSchema,
  gallerySectionSchema,
  historySectionSchema,
  bookSectionSchema,
  settingsSchema,
  towerSchema,
  cardSchema,
  navLinkSchema,
  portableTextButtonSchema,
  formFieldSchema,
];
