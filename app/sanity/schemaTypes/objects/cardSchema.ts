import { SquareDashed } from "lucide-react";
import { makeBlockSchema, visual } from "~/sanity/lib/schema";

export const cardSchema = makeBlockSchema({
  name: "card",
  title: "Card",
  icon: SquareDashed,
  hasBackground: true,
  contentFields: [
    visual({
      name: "image",
      description: "The image or video to display in this block.",
      required: true,
    }),
    {
      name: "eyebrow",
      type: "string",
      description: "Card Eyebrow (optional)",
    },
     {
      name: "title",
      type: "string",
      description: "Card Title",
    },
    {
      name: "subtitle",
      type: "string",
      description: "Card Subitle (optional)",
    },
    {
      name: "buttonText",
      type: "string",
      description: "Button Text (optional)",
    },
    {
      name: "buttonHref",
      type: "string",
      description: "Button HREF (optional)",
    },
  ],
});
