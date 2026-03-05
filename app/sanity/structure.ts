import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      // Home Page singleton — direct editor
      S.listItem()
        .id("homePage")
        .schemaType("homePage")
        .title("Home Page")
        .child(
          S.editor()
            .id("homePage")
            .schemaType("homePage")
            .documentId("homePage")
        ),

      S.divider(),

      S.documentTypeListItem("tower").title("Towers"),
      S.documentTypeListItem("article").title("Articles"),

      S.divider(),

      // Reusable Blocks
      S.documentTypeListItem("reusableBlock").title("Reusable Blocks"),

      // Settings
      S.divider(),
      S.listItem()
        .id("settings")
        .schemaType("settings")
        .title("Settings")
        .child(
          S.editor()
            .id("settings")
            .schemaType("settings")
            .documentId("settings")
        ),
    ]);

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType, documentId }
) => {
  switch (schemaType) {
    case `home`:
    case `settings`:
      return S.document().views([S.view.form()]);
    default:
      return S.document().views([S.view.form()]);
  }
};
