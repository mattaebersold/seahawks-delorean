import { setGroup } from "~/sanity/lib/schema/fieldGroupSchemaUtils";
import { createListOptionsFromEnum } from "~/sanity/lib/schema/fieldSchemaUtils";
import { BackgroundColor, BlockPadding } from "~/types/blockTypes";

export const blockBackgroundFields = setGroup("background", [
  {
    name: "backgroundColor",
    type: "string",
    description: "The background color of the whole Block.",
    initialValue: BackgroundColor.None,
    options: {
      list: createListOptionsFromEnum(BackgroundColor),
      layout: "radio",
    },
  },
  {
    name: "paddingTop",
    type: "string",
    description:
      'This applies space within the Block at its top. The "Matching" option makes the padding equal to the value of the "Margin Top" when this "Background Color" is different than the previous Block.',
    initialValue: BlockPadding.Matching,
    hidden: ({ parent }: { parent?: { backgroundColor?: string } }) =>
      !parent?.backgroundColor || parent.backgroundColor === BackgroundColor.None,
    options: {
      list: createListOptionsFromEnum(BlockPadding),
      layout: "dropdown",
    },
  },
  {
    name: "paddingBottom",
    type: "string",
    description:
      'This applies space within the Block at its bottom. The "Matching" option makes the padding equal to the value of the "Margin Top" when this "Background Color" is different than the following Block.',
    initialValue: BlockPadding.Matching,
    hidden: ({ parent }: { parent?: { backgroundColor?: string } }) =>
      !parent?.backgroundColor || parent.backgroundColor === BackgroundColor.None,
    options: {
      list: createListOptionsFromEnum(BlockPadding),
      layout: "dropdown",
    },
  },
]);
