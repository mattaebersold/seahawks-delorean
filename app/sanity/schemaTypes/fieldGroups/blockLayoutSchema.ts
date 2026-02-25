import { setGroup } from "~/sanity/lib/schema/fieldGroupSchemaUtils";
import { createListOptionsFromEnum } from "~/sanity/lib/schema/fieldSchemaUtils";
import { BlockSpacing, HideWhen } from "~/types/blockTypes";

export const blockLayoutFields = setGroup("layout", [
  {
    name: "blockSpacing",
    title: "Spacing",
    type: "string",
    description:
      'The space between this Block and the preceding Block. This is forced to "None" if this is the first Block in a list.',
    initialValue: BlockSpacing.Large,
    options: {
      list: createListOptionsFromEnum(BlockSpacing),
      layout: "radio",
    },
  },
  {
    name: "disabled",
    type: "boolean",
    description:
      "Disabling prevents this Block from rendering without your having to delete it.",
    initialValue: false,
  },
  {
    name: "hideWhen",
    type: "array",
    description: "Hide the Block when the device viewport is...",
    of: [{ type: "string" }],
    options: {
      list: createListOptionsFromEnum(HideWhen, {
        mobile: "Mobile ( <768px )",
        tablet: "Tablet ( >=768px and <=1024px )",
        desktop: "Desktop ( >1024px )",
      }),
    },
  },
]);
