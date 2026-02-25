import { Newspaper } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const articleSchema = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: Newspaper,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "listingImage",
      title: "Listing Image",
      type: "image",
      description: "Image displayed in article listings",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", icon: ImageIcon }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
