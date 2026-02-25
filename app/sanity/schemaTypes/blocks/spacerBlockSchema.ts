import { Space } from "lucide-react";

import { makeBlockSchema } from "~/sanity/lib/schema";

export const spacerBlockSchema = makeBlockSchema({
  name: "spacerBlock",
  title: "Spacer Block",
  icon: Space,
  hasBackground: false,
  contentFields: [
    {
      name: "size",
      type: "string",
      title: "Size",
      description: "The amount of vertical space",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
        layout: "dropdown",
      },
      initialValue: "medium",
      validation: (Rule: any) => Rule.required(),
    },
  ],
});
