import { Image } from "lucide-react";
import { defineField, defineType } from "sanity";

export const gallerySectionSchema = defineType({
  name: "gallerySection",
  title: "Gallery",
  type: "document",
  icon: Image,
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryImage",
          fields: [
            defineField({ name: "image", type: "image", options: { hotspot: true } }),
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
  ],
  preview: {
    select: {},
    prepare() {
      return { title: "Gallery" };
    },
  },
});
