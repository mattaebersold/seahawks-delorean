import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sanityImageUrl } from "~/sanity/lib/image";
import Button from "~/components/global/Button";
import type { HomeSection as HomeSectionType } from "~/types/homeTypes";
import { SECTION_IDS } from "~/types/homeTypes";

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
    <section
      id={SECTION_IDS.home}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden text-white"
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
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-gutter max-w-wide mx-auto flex flex-col items-center">
        {data?.title && (
          <h1 className="text-6xl md:text-7xl mb-md tracking-wider">
            {data.title}
          </h1>
        )}
        {data?.subtitle && (
          <p className="text-white text-lg">{data.subtitle}</p>
        )}
        {data?.foregroundImage?.asset?.url && (
          <img
            src={sanityImageUrl(data.foregroundImage).width(800).fit("max").auto("format").url()}
            alt=""
            className="my-md w-11/12 h-auto max-w-[500px]"
          />
        )}
        {data?.bottomText && (
          <p className="text-white text-lg">{data.bottomText}</p>
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
  );
}
