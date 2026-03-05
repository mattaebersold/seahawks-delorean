import { sanityImageUrl } from "~/sanity/lib/image";
import { SanityContent } from "~/components/sanity/SanityContent";
import Button from "~/components/global/Button";
import type { AboutSection as AboutSectionType } from "~/types/homeTypes";
import { SECTION_IDS } from "~/types/homeTypes";

interface Props {
  data?: AboutSectionType;
}

export function AboutSection({ data }: Props) {
  return (
    <section id={SECTION_IDS.about} className="py-2xl">
      <div className="max-w-wide mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
          {/* Image */}
          {data?.image?.asset?.url && (
            <div className="relative overflow-hidden rounded-card aspect-[4/5]">
              <img
                src={sanityImageUrl(data.image)
                  .width(800)
                  .height(1000)
                  .fit("crop")
                  .auto("format")
                  .url()}
                alt={data.imageAlt ?? ""}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          {/* Text content */}
          <div>
            {data?.title && (
              <h2 className="text-4xl mb-lg">{data.title}</h2>
            )}
            {data?.body && <SanityContent value={data.body} />}
            {data?.buttons && data.buttons.length > 0 && (
              <div className="flex flex-wrap gap-md mt-lg">
                {data.buttons.map((btn) => (
                  <Button key={btn._key} to={btn.href} variant={btn.variant ?? "primary"}>
                    {btn.text}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
