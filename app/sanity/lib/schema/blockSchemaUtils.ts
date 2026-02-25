import type { ComponentType, ReactNode } from "react";
import type { FieldDefinition, ObjectDefinition } from "sanity";

import { blockBackgroundFields } from "~/sanity/schemaTypes/fieldGroups/blockBackgroundSchema";
import { blockLayoutFields } from "~/sanity/schemaTypes/fieldGroups/blockLayoutSchema";
import { internalTitle } from "~/sanity/schemaTypes/fields/internalTitleSchema";

import { contentGroup } from "./fieldGroupSchemaUtils";
import { portableTextSummary } from "./fieldSchemaUtils";

// Simple startCase implementation
function startCase(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

// Helper for making standard block schemas
export function makeBlockSchema({
  name,
  title,
  titleField = "internalTitle",
  icon,
  hasBackground,
  contentFields = [],
}: {
  name: string; // The block name
  title?: string; // Explicit block title
  titleField?: string; // The field the preview title is pulled from
  icon?: ComponentType | ReactNode; // Icon for listing views
  hasBackground?: boolean; // Whether to add blockBackgroundSchema
  contentFields?: FieldDefinition[]; // Sanity fields to add to content group
}): ObjectDefinition {
  // Use explicit title if provided
  const blockTitle = title || startCase(name);

  return {
    name,
    type: "object",
    title: blockTitle,

    groups: [
      { name: "content", title: "Content", default: true },
      { name: "layout", title: "Layout" },
      ...(hasBackground
        ? [{ name: "background", title: "Background" }]
        : []),
    ],

    fields: [
      ...contentGroup([internalTitle, ...contentFields]),
      ...blockLayoutFields,
      ...(hasBackground ? blockBackgroundFields : []),
    ],

    preview: makeBlockPreview({
      titleField,
      blockTitle,
      icon,
      contentFields,
    }),
  };
}

// Helper to DRY up making previews of blocks
export function makeBlockPreview({
  titleField,
  blockTitle,
  icon,
  contentFields,
}: {
  titleField: string;
  blockTitle: string;
  icon?: ComponentType | ReactNode;
  contentFields?: FieldDefinition[];
}): ObjectDefinition["preview"] {
  // Get just the name of the block
  const blockName = blockTitle.replace("Block", "");

  // Look for the first image field and get it's name
  const imageField = contentFields?.find(
    (field) => field.type == "image"
  )?.name;

  // Check if there is a type field for use in the preview
  const hasTypes = contentFields?.some((field) => field.name == "type");

  // Check if there is a body field to fallback to
  const hasBody = contentFields?.some((field) => field.name == "body");

  // Return the object structure for previews
  return {
    select: {
      title: titleField,
      disabled: "disabled",
      ...(imageField ? { image: imageField } : {}),
      ...(hasTypes ? { type: "type" } : {}),
      ...(hasBody ? { body: "body" } : {}),
    },

    prepare({ title, disabled, image, type, body }) {
      // Make fallback title if one not specified
      if (!title && body) title = portableTextSummary(body);

      // If the title is portableText, turn it into a string
      if (Array.isArray(title)) title = portableTextSummary(title);

      // Auto add the block type and disabled state
      const subtitle =
        blockName +
        (type ? ` - ${startCase(type)}` : "") +
        (disabled ? " [Disabled]" : "");

      // Make the preview object
      return {
        title,
        media: image || icon,
        subtitle,
      };
    },
  };
}
