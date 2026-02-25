import clsx from "clsx";
import urlBuilder from "@sanity/image-url";

import type { MediaBlock as MediaBlockType } from "~/types/blockTypes";
import { MediaAspectRatio } from "~/types/objectTypes";
import { dataset, projectId } from "~/sanity/projectDetails";

export default function MediaBlock({
  media,
  caption,
  aspectRatio = MediaAspectRatio.Auto,
}: MediaBlockType) {
  if (!media?.image && !media?.video) {
    return null;
  }

  const aspectRatioClass = {
    [MediaAspectRatio.Auto]: "",
    [MediaAspectRatio.Square]: "aspect-square",
    [MediaAspectRatio.Wide]: "aspect-video",
    [MediaAspectRatio.Ultrawide]: "aspect-[21/9]",
  }[aspectRatio];

  return (
    <div className="max-w-wide mx-auto px-gutter">
      <figure>
        {media.image && (
          <img
            src={urlBuilder({ projectId, dataset })
              .image(media.image)
              .width(1200)
              .fit("max")
              .auto("format")
              .url()}
            alt={media.alt || ""}
            className={clsx(
              "w-full h-auto object-cover rounded-2xl",
              aspectRatioClass
            )}
          />
        )}
        {media.video?.asset && !media.image && (
          <video
            className={clsx(
              "w-full h-auto object-cover",
              aspectRatioClass
            )}
            controls
            aria-label={media.alt || "Video"}
          >
            <source
              src={`https://cdn.sanity.io/files/${projectId}/${dataset}/${media.video.asset._ref
                .replace("file-", "")
                .replace("-mp4", ".mp4")}`}
              type="video/mp4"
            />
          </video>
        )}
        {caption && (
          <figcaption className="mt-sm text-center text-sm opacity-70">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
