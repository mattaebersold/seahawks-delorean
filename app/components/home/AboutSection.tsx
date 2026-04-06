import { sanityImageUrl } from "~/sanity/lib/image";
import { SanityContent } from "~/components/sanity/SanityContent";
import type { AboutSection as AboutSectionType } from "~/types/homeTypes";
import { SECTION_IDS } from "~/types/homeTypes";

interface Props {
  data?: AboutSectionType;
}

export function AboutSection({ data }: Props) {
  return (
    <section id={SECTION_IDS.about} className="py-xl">
      <div className="">

        {data?.title && (
          <div className="text-center pt-lg max-w-[800px] mx-auto px-gutter mb-md">
            <h3>{data.title}</h3>
          </div>
        )}

                <div className="relative px-4 max-w-wide mx-auto my-lg pt-lg">
            <img
              src={sanityImageUrl(data?.image)
                .auto("format")
                .url()}
              alt={data?.imageAlt ?? ""}
              className="block mx-auto rounded-card w-full h-auto"
            />
          </div>
        
      {/* Alternating 50/50 rows */}
      {(data?.rowOneBody || data?.rowOneImage || data?.rowTwoImage || data?.rowTwoBody) && (
        <div className="max-w-wide mx-auto px-gutter">
          {/* Row 1: text left, image right */}
          {(data?.rowOneBody || data?.rowOneImage) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-xl">
              {data.rowOneBody && (
                <div className="wys">
                  <SanityContent value={data.rowOneBody} />
                </div>
              )}
              {data.rowOneImage?.asset?.url && (
                <img
                  src={sanityImageUrl(data.rowOneImage).auto("format").width(900).fit("max").url()}
                  alt={data.rowOneImageAlt ?? ""}
                  className="w-full h-auto rounded-card"
                />
              )}
            </div>
          )}

          {/* Row 2: image left, text right */}
          {(data?.rowTwoImage || data?.rowTwoBody) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-xl">
              {data.rowTwoImage?.asset?.url && (
                <img
                  src={sanityImageUrl(data.rowTwoImage).auto("format").width(900).fit("max").url()}
                  alt={data.rowTwoImageAlt ?? ""}
                  className="w-full h-auto rounded-card"
                />
              )}
              {data.rowTwoBody && (
                <div className="wys">
                  <SanityContent value={data.rowTwoBody} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
      </div>
    </section>
  );
}
