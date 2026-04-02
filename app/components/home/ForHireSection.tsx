import { useState, useEffect, useCallback } from "react";
import { PortableText } from "@portabletext/react";
import { sanityImageUrl } from "~/sanity/lib/image";
import type { ForHireSection as ForHireSectionType, SanityImageWithAsset } from "~/types/homeTypes";
import { SECTION_IDS } from "~/types/homeTypes";

interface Props {
  data?: ForHireSectionType;
}

interface LightboxProps {
  images: SanityImageWithAsset[];
  startIndex: number;
  onClose: () => void;
}

function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full mx-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {images[current]?.asset?.url && (
          <img
            src={sanityImageUrl(images[current]).width(1400).fit("max").auto("format").url()}
            alt=""
            className="max-h-[80vh] w-full object-contain rounded-card"
          />
        )}

        {images.length > 1 && (
          <div className="flex items-center gap-lg mt-lg">
            <button onClick={prev} aria-label="Previous image" className="text-white/70 hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-white/60 text-sm">{current + 1} / {images.length}</span>
            <button onClick={next} aria-label="Next image" className="text-white/70 hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ForHireSection({ data }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = [data?.image1, data?.image2, data?.image3].filter(
    (img): img is SanityImageWithAsset => !!img?.asset?.url
  );

  return (
    <section id={SECTION_IDS.forHire} className="py-2xl">
      <div className="max-w-wide mx-auto px-gutter">
        {data?.title && (
          <div className="mb-xl text-center max-w-[700px] mx-auto">
            <h3>{data.title}</h3>
          </div>
        )}

        {data?.body && data.body.length > 0 && (
          <div className="text-xl text-center max-w-[800px] mx-auto mb-xl">
            <PortableText value={data.body} />
          </div>
        )}

        {images.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mb-xl w-full sm:items-stretch">
            {images.map((img, i) => {
              const isFixedRatio = i < 2;
              return (
                <button
                  key={i}
                  className="block w-full cursor-pointer group relative overflow-hidden rounded-card sm:w-auto"
                  style={
                    isFixedRatio
                      ? { aspectRatio: "1053/603" }
                      : undefined
                  }
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`For hire image ${i + 1}`}
                >
                  <img
                    src={sanityImageUrl(img).height(800).fit("max").auto("format").url()}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </button>
              );
            })}
          </div>
        )}

        {data?.bottomText && data.bottomText.length > 0 && (
          <div className="text-xl text-center max-w-[800px] mx-auto mb-lg">
            <PortableText value={data.bottomText} />
          </div>
        )}

        {data?.bottomDisclaimerText && data.bottomDisclaimerText.length > 0 && (
          <div className="text-sm italic text-black/50 text-center max-w-[600px] mx-auto mb-xl">
            <PortableText value={data.bottomDisclaimerText} />
          </div>
        )}

        {data?.eventTypes && data.eventTypes.length > 0 && (
          <div className="md:pl-xl">
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-md w-11/12 max-w-[800px] mx-auto text-2xl list-disc list-outside">
              {data.eventTypes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
