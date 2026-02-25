import { Layers } from "lucide-react";
import { defineField, defineType } from "sanity";

// Import only the base blocks (not the reference block to avoid recursion)
import * as baseBlockSchemas from "./baseBlocks";

export const reusableBlockSchema = defineType({
  name: "reusableBlock",
  title: "Reusable Block",
  type: "document",
  icon: Layers,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "A name to identify this reusable block in the CMS.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blocks",
      title: "Blocks",
      type: "array",
      description: "The blocks that will be rendered when this reusable block is used.",
      of: Object.values(baseBlockSchemas).map(({ name }) => ({ type: name })),
    }),
  ],
  preview: {
    select: {
      title: "title",
      blocksCount: "blocks.length",
    },
    prepare({ title }) {
      return {
        title: title || "Untitled Reusable Block",
        subtitle: "Reusable Block",
      };
    },
  },
});
