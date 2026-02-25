import { ImageIcon } from "lucide-react";

import { makeBlockSchema, visual, createListOptionsFromEnum } from "~/sanity/lib/schema";
import { MediaAspectRatio } from "~/types/objectTypes";

export const mediaBlockSchema = makeBlockSchema({
  name: "mediaBlock",
  title: "Media Block",
  icon: ImageIcon,
  hasBackground: true,
  contentFields: [
    visual({
      name: "media",
      description: "The image or video to display in this block.",
      required: true,
    }),
    {
      name: "caption",
      type: "string",
      description: "Optional caption to display below the media.",
    },
    {
      name: "aspectRatio",
      type: "string",
      description: "The aspect ratio for the media display.",
      initialValue: MediaAspectRatio.Auto,
      options: {
        list: createListOptionsFromEnum(MediaAspectRatio, {
          auto: "Auto (original)",
          square: "Square (1:1)",
          wide: "Wide (16:9)",
          ultrawide: "Ultrawide (21:9)",
        }),
        layout: "radio",
      },
    },
  ],
});
