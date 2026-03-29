import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sanityImageUrl } from "~/sanity/lib/image";
import Button from "~/components/global/Button";
import type { HomeSection as HomeSectionType } from "~/types/homeTypes";
import { SECTION_IDS } from "~/types/homeTypes";
import cards from "~/assets/cards.png";
import desktop from "~/assets/desktop.jpg";

interface Props {
  data?: HomeSectionType;
}

export function HomeSection({ data }: Props) {
  const images = data?.images ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [images.length]);

  const currentImage = images[currentIndex];

  return (
    <>
      <section
        id={SECTION_IDS.home}
        className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden text-white"
      >
        {/* Background image marquee — all images stacked, cross-fade via opacity */}
        <div className="absolute inset-0">
          <AnimatePresence>
            {currentImage?.video?.asset?.url ? (
              <motion.video
                key={currentImage._key}
                src={currentImage.video.asset.url}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            ) : currentImage?.image?.asset?.url ? (
              <motion.img
                key={currentImage._key}
                src={sanityImageUrl(currentImage.image)
                  .width(1920)
                  .height(1080)
                  .fit("crop")
                  .auto("format")
                  .url()}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            ) : null}
          </AnimatePresence>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-gutter max-w-wide mx-auto flex flex-col items-center">
          {data?.title && (
            <h1 className="!text-xl mb-md tracking-wider">
              {data.title}
            </h1>
          )}
          {data?.subtitle && (
            <p className="text-white text-3xl">{data.subtitle}</p>
          )}
          {data?.foregroundImage?.asset?.url && (
            <img
              src={sanityImageUrl(data.foregroundImage).width(800).fit("max").auto("format").url()}
              alt=""
              className="my-md w-11/12 h-auto max-w-[500px]"
            />
          )}
          {data?.bottomText && (
            <p className="text-white text-3xl">{data.bottomText}</p>
          )}
          {data?.buttons && data.buttons.length > 0 && (
            <div className="flex flex-wrap gap-md justify-center mt-lg">
              {data.buttons.map((btn) => (
                <Button key={btn._key} to={btn.href} variant={btn.variant ?? "primary"}>
                  {btn.text}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Image indicator dots */}
        {images.length > 1 && (
          <div className="absolute bottom-8 flex gap-2 z-10">
            {images.map((img, i) => (
              <button
                key={img._key}
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </section>


        <div className="pt-xl pb-lg">
          <div className="text-center mb-lg">
            <h3>Have Time - Will Travel</h3>
            <p className="max-w-[800px] px-md mx-auto">Hire the Seahawks Delorean for up to four (4) hours for a ride-along and/or to have it available for a Seahawks party, birthday party, music video, graduation, tailgate party, photo shoot, video promotion, convention, or other special event. The Seahawks Delorean team have experience integrating the car into unique parties and events, and they provide an experienced Delorean driver as needed for on-site movement and parades. 
Whether it's the centerpiece of your event or a memorable backdrop for photos, this one-of-a-kind experience adds a touch of nostalgia, style, and excitement your guests won’t soon forget.</p>
          </div>
          <img src={cards} className="block mx-auto md:hidden" />
          <img src={desktop} className="hidden md:block mx-auto" />

          <div className="w-3/4 max-w-[550px] text-center mx-auto">
            <p className="text-xl pt-lg">The Seahawks Delorean Car and Trailer are Available for Hire - for appearances in greater King County, Washington area.</p>
            <p className="text-sm italic text-black/50 max-w-[400px] mx-auto ">*This is for an appearance or possible a ride-along as in a parade - Not to drive the car. The Trailer cannot be used for riding in.</p>
          </div>

        </div>

        <div className="md:pl-xl max-w-wide mx-auto px-gutter">
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-md w-11/12 max-w-[800px] mx-auto text-2xl list-disc list-outside">
            <li>Themed Events</li>
            <li>Company Events</li>
            <li>Social Media Pics</li>
            <li>Marketing Content</li>
            <li>Birthday Parties</li>
            <li>Holiday Events</li>
            <li>Wedding Parties</li>
            <li>Social Events</li>
            <li>Photo Shoots</li>
          </ul>
        </div>

    </>
  );
}
