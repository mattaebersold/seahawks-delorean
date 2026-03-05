import { Home } from "lucide-react";
import { defineField, defineType } from "sanity";

export const homePageSchema = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: Home,
  fields: [
    defineField({
      name: "homeSection",
      title: "Home Section",
      type: "object",
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
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
        defineField({
          name: "buttons",
          title: "Buttons",
          type: "array",
          of: [{ type: "portableTextButton" }],
        }),
      ],
    }),

    defineField({
      name: "aboutSection",
      title: "About Section",
      type: "object",
      fields: [
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "imageAlt", title: "Image Alt Text", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
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
    }),

    defineField({
      name: "gallerySection",
      title: "Gallery Section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
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
    }),

    defineField({
      name: "bookSection",
      title: "Book Appointment Section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "body",
          title: "Body",
          type: "array",
          of: [{ type: "block" }],
        }),
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "imageAlt", title: "Image Alt Text", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: "Home Page" };
    },
  },
});
