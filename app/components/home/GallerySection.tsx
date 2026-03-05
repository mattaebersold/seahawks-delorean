import { useState, useEffect, useCallback } from "react";
import { sanityImageUrl } from "~/sanity/lib/image";
import type { GallerySection as GallerySectionType, GalleryImage } from "~/types/homeTypes";
import { SECTION_IDS } from "~/types/homeTypes";

interface Props {
  data?: GallerySectionType;
}

interface ModalProps {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
}

function GalleryModal({ images, startIndex, onClose }: ModalProps) {
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

  const image = images[current];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Modal content — stop propagation so clicking image doesn't close */}
      <div
        className="relative max-w-5xl w-full mx-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Image */}
        {image?.image?.asset?.url && (
          <img
            src={sanityImageUrl(image.image).width(1400).fit("max").auto("format").url()}
            alt={image.alt ?? ""}
            className="max-h-[80vh] w-full object-contain rounded-card"
          />
        )}

        {/* Caption */}
        {image?.alt && (
          <p className="text-white/60 text-sm mt-md">{image.alt}</p>
        )}

        {/* Navigation */}
        {images.length > 1 && (
          <div className="flex items-center gap-lg mt-lg">
            <button
              onClick={prev}
              aria-label="Previous image"
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-white/60 text-sm">
              {current + 1} / {images.length}
            </span>
            <button
              onClick={next}
              aria-label="Next image"
              className="text-white/70 hover:text-white transition-colors"
            >
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

export function GallerySection({ data }: Props) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const images = data?.images ?? [];

  return (
    <section id={SECTION_IDS.gallery} className="py-2xl">
      <div className="max-w-wide mx-auto px-gutter">
        {data?.title && (
          <h2 className="text-4xl mb-xl text-center">{data.title}</h2>
        )}

        {images.length > 0 ? (
          <div className="columns-2 md:columns-3 gap-3">
            {images.map((img, i) => (
              <button
                key={img._key}
                className="block w-full break-inside-avoid cursor-pointer group relative overflow-hidden rounded-card mb-3"
                onClick={() => setModalIndex(i)}
                aria-label={img.alt ?? `Gallery image ${i + 1}`}
              >
                {img.image?.asset?.url && (
                  <img
                    src={sanityImageUrl(img.image).width(800).fit("max").auto("format").url()}
                    alt={img.alt ?? ""}
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-white/50">No gallery images yet.</p>
        )}
      </div>

      {modalIndex !== null && (
        <GalleryModal
          images={images}
          startIndex={modalIndex}
          onClose={() => setModalIndex(null)}
        />
      )}
    </section>
  );
}
