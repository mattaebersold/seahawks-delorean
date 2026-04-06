import { Clock } from "lucide-react";
import { defineField, defineType } from "sanity";

export const historySectionSchema = defineType({
  name: "historySection",
  title: "History",
  type: "document",
  icon: Clock,
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "rowOneBody",
      title: "Row 1 — Text (left)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "rowOneImage", title: "Row 1 — Image (right)", type: "image", options: { hotspot: true } }),
    defineField({ name: "rowOneImageAlt", title: "Row 1 — Image Alt Text", type: "string" }),
    defineField({ name: "rowTwoImage", title: "Row 2 — Image (left)", type: "image", options: { hotspot: true } }),
    defineField({ name: "rowTwoImageAlt", title: "Row 2 — Image Alt Text", type: "string" }),
    defineField({
      name: "rowTwoBody",
      title: "Row 2 — Text (right)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "images",
      title: "History Images",
      type: "array",
      of: [
        {
          type: "object",
          name: "historyImage",
          fields: [
            defineField({ name: "image", type: "image", options: { hotspot: true } }),
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
          preview: {
            select: { media: "image", title: "caption" },
            prepare({ media, title }) {
              return { media, title: title || "Image" };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: "History" };
    },
  },
});
