import { ClipboardList } from "lucide-react";
import { defineField } from "sanity";

import { makeBlockSchema } from "~/sanity/lib/schema";

export const formBlockSchema = makeBlockSchema({
  name: "formBlock",
  title: "Form Block",
  icon: ClipboardList,
  hasBackground: true,
  contentFields: [
    defineField({
      name: "formName",
      title: "Form Name",
      description: "Unique identifier used by Netlify to track submissions — no spaces",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "fields",
      title: "Fields",
      type: "array",
      of: [{ type: "formField" }],
      validation: (Rule) => Rule.min(1).error("Add at least one field"),
    }),
    defineField({
      name: "submitText",
      title: "Submit Button Text",
      type: "string",
      initialValue: "Submit",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      initialValue: "Thank you! Your submission has been received.",
    }),
  ],
});
