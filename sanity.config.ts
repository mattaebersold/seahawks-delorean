import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";

import { STUDIO_BASEPATH } from "~/sanity/constants";
import { resolve } from "~/sanity/presentation/resolve";
import { projectDetails } from "~/sanity/projectDetails";
import schema from "~/sanity/schemaTypes";
import { defaultDocumentNode, structure } from "~/sanity/structure";

export default defineConfig({
  ...projectDetails(),
  name: "IN2TIME",
  title: "IN2TIME",
  plugins: [
    structureTool({ structure, defaultDocumentNode }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: "/resource/preview",
        },
      },
    }),
    visionTool(),
    media(),
  ],
  basePath: STUDIO_BASEPATH,
  schema: {
    types: schema,
  },
});
