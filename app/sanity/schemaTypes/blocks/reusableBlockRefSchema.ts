import { Link2 } from "lucide-react";
import { defineField } from "sanity";

import { makeBlockSchema } from "~/sanity/lib/schema";

export const reusableBlockRefSchema = makeBlockSchema({
  name: "reusableBlockRef",
  title: "Reusable Block",
  icon: Link2,
  hasBackground: false,
  contentFields: [
    defineField({
      name: "reusableBlock",
      title: "Reusable Block",
      type: "reference",
      to: [{ type: "reusableBlock" }],
      description: "Select a reusable block to render here.",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
