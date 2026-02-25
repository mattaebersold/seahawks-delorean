import { defineCliConfig } from "sanity/cli";

// We can assume this file will only
// be read in a Node.js environment
// where process is defined
export default defineCliConfig({
  api: {
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET,
  },
  typegen: {
    path: "./app/**/*.{ts,tsx,js,jsx}",
    schema: "./app/types/sanity.schema.json",
    generates: "./app/types/sanity.generated.ts",
    // set to false to disable automatic overloading the sanity client
    overloadClientMethods: true,
  },
});
