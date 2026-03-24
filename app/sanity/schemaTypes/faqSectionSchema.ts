import { HelpCircle } from "lucide-react";
import { defineField, defineType } from "sanity";

export const faqSectionSchema = defineType({
  name: "faqSection",
  title: "FAQ",
  type: "document",
  icon: HelpCircle,
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({
      name: "items",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "FAQ Item",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "text" }),
          ],
          preview: {
            select: { title: "question" },
            prepare({ title }: { title?: string }) {
              return { title: title ?? "Untitled question" };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: "FAQ" };
    },
  },
});
