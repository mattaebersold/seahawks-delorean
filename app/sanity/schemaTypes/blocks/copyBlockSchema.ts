import { FileText } from "lucide-react";

import { makeBlockSchema } from "~/sanity/lib/schema";

export const copyBlockSchema = makeBlockSchema({
  name: "copyBlock",
  title: "Copy Block",
  icon: FileText,
  hasBackground: true,
  contentFields: [
    {
      name: "body",
      type: "array",
      description: "The text content for this block.",
      of: [
        { type: "block" },
        { type: "image" },
        { type: "portableTextButton" },
      ],
    },
  ],
});
