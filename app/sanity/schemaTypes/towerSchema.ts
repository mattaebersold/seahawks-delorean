import { Building2 } from "lucide-react";
import { defineField, defineType } from "sanity";

import * as blocksSchemas from "./blocks";

export const towerSchema = defineType({
  name: "tower",
  title: "Tower",
  type: "document",
  icon: Building2,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blocks",
      title: "Blocks",
      type: "array",
      of: Object.values(blocksSchemas).map(({ name }) => ({ type: name })),
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare({ title, slug }) {
      let subtitle = "No slug";
      if (slug) {
        // Don't double up slashes if slug already starts with /
        subtitle = slug.startsWith("/") ? slug : `/${slug}`;
      }
      return {
        title,
        subtitle,
      };
    },
  },
});
