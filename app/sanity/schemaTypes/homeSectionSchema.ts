import { Home } from "lucide-react";
import { defineField, defineType } from "sanity";

export const homeSectionSchema = defineType({
  name: "homeSection",
  title: "Hero",
  type: "document",
  icon: Home,
  fields: [
    defineField({
      name: "images",
      title: "Marquee Images",
      description: "Images that auto-fade in the hero area every 4 seconds.",
      type: "array",
      of: [
        {
          type: "object",
          name: "marqueeImage",
          fields: [
            defineField({ name: "image", type: "image", options: { hotspot: true } }),
            defineField({
              name: "video",
              title: "Video (MP4)",
              description: "If provided, the video will be used instead of the image.",
              type: "file",
              options: { accept: "video/mp4" },
            }),
          ],
          preview: {
            select: { media: "image" },
            prepare({ media }) {
              return { media, title: "Image" };
            },
          },
        },
      ],
    }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
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
      return { title: "Hero" };
    },
  },
});
