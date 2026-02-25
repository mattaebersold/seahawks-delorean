import { Link } from "lucide-react";
import { defineField, defineType } from "sanity";

export const navLinkSchema = defineType({
  name: "navLink",
  title: "Nav Link",
  type: "object",
  icon: Link,
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "text", subtitle: "href" },
  },
});
