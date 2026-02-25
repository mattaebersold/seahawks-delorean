import { defineField, defineType } from "sanity";

export const formFieldSchema = defineType({
  name: "formField",
  title: "Form Field",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Field Name",
      description: 'HTML name attribute — lowercase, no spaces (e.g. "first-name")',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Field Type",
      type: "string",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Email", value: "email" },
          { title: "Phone", value: "tel" },
          { title: "Textarea", value: "textarea" },
          { title: "Select", value: "select" },
        ],
        layout: "dropdown",
      },
      initialValue: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "placeholder",
      title: "Placeholder",
      type: "string",
    }),
    defineField({
      name: "required",
      title: "Required",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "options",
      title: "Options",
      description: "One option per line — only used for Select fields",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ parent }) => parent?.type !== "select",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "type" },
  },
});
