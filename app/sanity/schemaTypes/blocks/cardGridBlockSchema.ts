import { Grid2x2 } from "lucide-react";

import { makeBlockSchema } from "~/sanity/lib/schema";

export const cardGridBlockSchema = makeBlockSchema({
  name: "cardGridBlock",
  title: "Card Grid Block",
  icon: Grid2x2,
  hasBackground: true,
  contentFields: [
    {
      name: "eyebrow",
      type: "string",
      description: "Block Heading Eyebrow",
    },
		{
      name: "heading",
      type: "string",
      description: "Block Heading",
    },
    {
      name: "cards",
      type: "array",
      title: "Cards",
      description: "One or more generic cards to display in the carousel",
      of: [{ type: "card" }],
      validation: (Rule: any) => Rule.min(1).error("At least one card is required"),
    },
	],
});
