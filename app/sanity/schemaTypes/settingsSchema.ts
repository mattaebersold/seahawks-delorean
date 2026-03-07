import { Settings } from "lucide-react";
import { defineField, defineType } from "sanity";

export const settingsSchema = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: Settings,
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      description: "Displayed in the site header. SVG or PNG with transparency recommended.",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "siteTitle",
      description: "Displayed in header, footer and in meta tags",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      description: "Global contact email displayed in the footer",
      type: "string",
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: "Settings",
      };
    },
  },
});
