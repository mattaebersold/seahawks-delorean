import urlBuilder from "@sanity/image-url";
import { projectId, dataset } from "~/sanity/projectDetails";

const builder = urlBuilder({ projectId, dataset });

export function sanityImageUrl(source: any) {
  return builder.image(source);
}
