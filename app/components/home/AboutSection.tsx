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
    <section id={SECTION_IDS.about} className="py-xl">
      <div className="">

        {data?.buttons && data.buttons.length > 0 && (
              <div className="text-center mb-lg">
                {data.buttons.map((btn) => (
                  <Button key={btn._key} to={btn.href} variant={btn.variant ?? "primary"}>
                    {btn.text}
                  </Button>
                ))}
              </div>
            )}
        

          
        <div className="text-center mx-auto  pt-lg max-w-[800px] mx-auto px-gutter">

          {/* Text content */}
          <div>
            {(data?.title) && (
              <div className="mb-md">
                {data.title && <h3>{data.title}</h3>}
              </div>
            )}
            {data?.body && <div className="wys"><SanityContent value={data.body} /></div>}
            
          </div>
        </div>

                <div className="relative px-4 max-w-wide mx-auto my-lg pt-lg">
            <img
              src={sanityImageUrl(data?.image)
                .auto("format")
                .url()}
              alt={data?.imageAlt ?? ""}
              className="block mx-auto rounded-card w-full h-auto"
            />
          </div>
        
      {/* 3-column grid beneath hero */}
      {(data?.leftColumnText || data?.centerColumnImage || data?.rightColumnText) && (
        <div className="bg-[#202020] p-4 md:p-12 my-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-lg max-w-wide mx-auto items-center text-white">
            {data.leftColumnText && (
              <p className="text-lg px-6 leading-relaxed whitespace-pre-line">{data.leftColumnText}</p>
            )}
            {data.centerColumnImage?.asset?.url ? (
              <img
                src={sanityImageUrl(data.centerColumnImage).width(800).fit("max").auto("format").url()}
                alt=""
                className="w-[300px] mx-auto h-auto rounded-2xl"
              />
            ) : (
              <div />
            )}
            {data.rightColumnText && (
              <p className="text-lg px-6 leading-relaxed whitespace-pre-line">{data.rightColumnText}</p>
            )}
          </div>
        </div>
      )}        
      </div>
    </section>
  );
}
