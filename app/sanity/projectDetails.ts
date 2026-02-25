// Based on how Remix recommends handling environment variables
// https://remix.run/docs/en/main/guides/envvars

// None of these are secrets, but all of them are required
// Throughout the app server and client side
declare global {
  interface Window {
    ENV: {
      VITE_SANITY_PROJECT_ID: string;
      VITE_SANITY_DATASET: string;
      VITE_SANITY_API_VERSION: string;
    };
  }
}

const isServer = typeof process !== "undefined";
const isBrowser = typeof window !== "undefined";

const defaultApiVersion = `2025-12-01`;

const projectId: string =
  (isServer ? process.env.VITE_SANITY_PROJECT_ID : undefined) ||
  (isBrowser ? (window as any).ENV?.VITE_SANITY_PROJECT_ID : undefined) ||
  "";
if (!projectId) {
  throw new Error(`Missing VITE_SANITY_PROJECT_ID in .env`);
}

const dataset: string =
  (isServer ? process.env.VITE_SANITY_DATASET : undefined) ||
  (isBrowser ? (window as any).ENV?.VITE_SANITY_DATASET : undefined) ||
  "";
if (!dataset) {
  throw new Error(`Missing VITE_SANITY_DATASET in .env`);
}

const apiVersion: string =
  (isServer ? process.env.VITE_SANITY_API_VERSION : undefined) ||
  (isBrowser ? (window as any).ENV?.VITE_SANITY_API_VERSION : undefined) ||
  defaultApiVersion;
if (!apiVersion) {
  throw new Error(`Missing VITE_SANITY_API_VERSION in .env`);
}
export { apiVersion, dataset, projectId };

export const projectDetails = () => ({
  projectId,
  dataset,
  apiVersion,
});
