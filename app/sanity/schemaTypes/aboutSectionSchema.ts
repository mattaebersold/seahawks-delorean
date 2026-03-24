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
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [{ type: "portableTextButton" }],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: "About" };
    },
  },
});
