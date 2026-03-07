import { Clock } from "lucide-react";
import { defineField, defineType } from "sanity";

export const historySectionSchema = defineType({
  name: "historySection",
  title: "History",
  type: "document",
  icon: Clock,
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
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
          ],
          preview: {
            select: { media: "image", title: "alt" },
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
