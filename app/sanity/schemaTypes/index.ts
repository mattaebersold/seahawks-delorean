import * as blockSchemas from "./blocks";
import { articleSchema } from "./articleSchema";
import { homePageSchema } from "./homePageSchema";
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
  homePageSchema,
  settingsSchema,
  towerSchema,
  cardSchema,
  navLinkSchema,
  portableTextButtonSchema,
  formFieldSchema,
];
