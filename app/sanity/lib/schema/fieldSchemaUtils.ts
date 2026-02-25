import type { FieldDefinition } from "sanity";

// Create a Sanity options array from an enum type, supporting passing in
// custom title overrides
export function createListOptionsFromEnum(
  enumObj: object,
  customTitles: object = {}
): { title: string; value: string }[] {
  return Object.entries(enumObj).map(([title, value]) => ({
    title: customTitles[value as keyof typeof customTitles] || startCase(title),
    value,
  }));
}

// Simple startCase implementation
function startCase(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

// This gets the first block of text from a portableText array
export function portableTextSummary(blocks: any[]): string {
  const block = (blocks || []).find((block) => block._type === "block");
  if (!block) return "No title";
  return block.children
    .filter((child: any) => child._type === "span")
    .map((span: any) => span.text)
    .join("");
}

// Visual field helper - supports both image and video
export function visual({
  name,
  title,
  description,
  hotspot = true,
  required,
}: {
  name: string;
  title?: string;
  description?: string;
  hotspot?: boolean;
  required?: boolean;
}): FieldDefinition {
  return {
    name,
    type: "object",
    title,
    description,
    fields: [
      {
        name: "image",
        type: "image",
        description:
          "If a video is also specified, this will be used as the poster image.",
        options: { hotspot },
        ...(required ? { validation: (Rule) => Rule.required() } : {}),
      },
      {
        name: "video",
        type: "file",
        description:
          "An MP4 compressed with a bitrate of around 4Mbps is recommended.",
        options: { accept: "video/*" },
      },
      {
        name: "alt",
        title: "Description",
        type: "string",
        description:
          "This will be used as the img `alt` or video `aria-label` attribute.",
      },
    ],
  } as FieldDefinition;
}

// Image with alt field helper
export function imageWithAlt({
  name,
  title,
  group = "content",
  description,
  hotspot = true,
  required,
}: {
  name: string;
  title?: string;
  group?: string;
  description?: string;
  hotspot?: boolean;
  required?: boolean;
}): FieldDefinition {
  return {
    name,
    type: "image",
    group,
    title,
    description,
    options: {
      hotspot,
    },
    ...(required ? { validation: (Rule) => Rule.required() } : {}),
    fields: [
      {
        name: "alt",
        title: "Image Description",
        type: "string",
        description: "This will be used as the <img> alt attribute.",
      },
    ],
  } as FieldDefinition;
}
