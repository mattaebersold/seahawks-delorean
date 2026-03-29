import { useState, useCallback, useEffect } from "react";
import { sanityImageUrl } from "~/sanity/lib/image";
import { SanityContent } from "~/components/sanity/SanityContent";
import type { HistorySection as HistorySectionType, HistoryImage } from "~/types/homeTypes";
import { SECTION_IDS } from "~/types/homeTypes";

interface Props {
  data?: HistorySectionType;
}

interface ModalProps {
  images: HistoryImage[];
  startIndex: number;
  onClose: () => void;
}

function HistoryModal({ images, startIndex, onClose }: ModalProps) {
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

        {image?.image?.asset?.url && (
          <img
            src={sanityImageUrl(image.image).width(1400).fit("max").auto("format").url()}
            alt={image.alt ?? ""}
            className="max-h-[80vh] w-full object-contain rounded-card"
          />
        )}

        {image?.caption && (
          <p className="text-white/60 text-sm mt-md">{image.caption}</p>
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

export function HistorySection({ data }: Props) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const images = data?.images ?? [];

  return (
    <section id={SECTION_IDS.history} className="py-2xl">
      <div className="max-w-wide mx-auto px-gutter">
        {(data?.title || data?.description) && (
          <div className="mb-xl text-center max-w-[700px] mx-auto">
            {data.title && <h3>{data.title}</h3>}
            {data.description && <p className="text-2xl text-black leading-relaxed">{data.description}</p>}
          </div>
        )}

        {data?.body && (
          <div className="columns-1 md:columns-2 gap-8 mb-xl">
            <SanityContent value={data.body} />
          </div>
        )}


        {images.length > 0 ? (
          <div className="columns-1 md:columns-2 gap-3">
            {images.map((img, i) => (
              <div key={img._key} className="break-inside-avoid mb-3">
                <button
                  key={img._key}
                  className="block w-full break-inside-avoid cursor-pointer group relative overflow-hidden rounded-card mb-3"
                  onClick={() => setModalIndex(i)}
                  aria-label={img.caption ?? img.alt ?? `History image ${i + 1}`}
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
                {img.caption && (
                  <p className="mt-1.5 text-md text-black text-left px-1">{img.caption}</p>
                )}
              </div>
              
            ))}
          </div>
        ) : (
          <p className="text-center text-white/50">No history images yet.</p>
        )}
      </div>

      {modalIndex !== null && (
        <HistoryModal
          images={images}
          startIndex={modalIndex}
          onClose={() => setModalIndex(null)}
        />
      )}
    </section>
  );
}
