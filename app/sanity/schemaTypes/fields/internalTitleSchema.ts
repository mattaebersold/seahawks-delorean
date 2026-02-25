import type { FieldDefinition } from "sanity";

export const internalTitle: FieldDefinition = {
  title: "Internal Title",
  name: "internalTitle",
  type: "string",
  description:
    "This will only be used within the CMS and is used as the title when this entry is listed.",
};
