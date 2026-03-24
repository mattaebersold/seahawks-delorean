import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from "sanity/structure";

function singletonItem(
  S: Parameters<StructureResolver>[0],
  schemaType: string,
  title: string
) {
  return S.listItem()
    .id(schemaType)
    .schemaType(schemaType)
    .title(title)
    .child(
      S.editor()
        .id(schemaType)
        .schemaType(schemaType)
        .documentId(schemaType)
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      singletonItem(S, "homeSection", "Hero"),
      singletonItem(S, "aboutSection", "About"),
      singletonItem(S, "gallerySection", "Gallery"),
      singletonItem(S, "historySection", "History"),
      singletonItem(S, "bookSection", "Book Appointment"),
      singletonItem(S, "faqSection", "FAQ"),

      // Settings
      S.divider(),
      singletonItem(S, "settings", "Settings"),
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
