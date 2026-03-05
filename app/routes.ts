import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [
    ...prefix("articles", [
      route(":article", "./routes/articles/$article.tsx"),
    ]),
    // Static routes (must come before :tower catch-all)
    route("styleguide", "./routes/styleguide.tsx"),
    // Home page (dedicated home page with sections)
    index("routes/home.tsx"),
    // Tower pages at root level - /:slug (home tower kept for other pages)
    route(":tower", "./routes/towers/$tower.tsx"),
  ]),
  // From Studio layout, because of Visual Editing
  route("studio/*", "routes/studio.tsx"),
  // Resource routes
  ...prefix("resource", [
    route("preview", "./routes/resource/preview.ts"),
    // Add other API type routes here
  ]),
] satisfies RouteConfig;
