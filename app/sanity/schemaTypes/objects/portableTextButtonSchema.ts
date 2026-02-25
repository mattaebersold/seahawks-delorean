import { MousePointerClick } from "lucide-react";
import { defineField, defineType } from "sanity";

export const portableTextButtonSchema = defineType({
  name: "portableTextButton",
  title: "Button",
  type: "object",
  icon: MousePointerClick,
  fields: [
    defineField({
      name: "text",
      title: "Button Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Ghost", value: "ghost" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: { title: "text", subtitle: "href" },
  },
});
