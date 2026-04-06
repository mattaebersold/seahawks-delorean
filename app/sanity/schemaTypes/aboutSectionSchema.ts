import { Info } from "lucide-react";
import { defineField, defineType } from "sanity";

export const aboutSectionSchema = defineType({
  name: "aboutSection",
  title: "About",
  type: "document",
  icon: Info,
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Image Alt Text", type: "string" }),
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
  ],
  preview: {
    select: {},
    prepare() {
      return { title: "About" };
    },
  },
});
