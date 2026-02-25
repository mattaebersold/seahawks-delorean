import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { CardCarouselBlock as CardCarouselBlockType } from "~/types/blockTypes";
import Card from "~/components/global/cards/BaseCard";
import { ArrowLeftIcon, ArrowRightIcon } from "~/components/icons";

export default function CardCarouselBlock(props: CardCarouselBlockType) {
  const { heading, cards, eyebrow } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!cards || cards.length === 0) return null;

  return (
    <div className="max-w-wide mx-auto px-gutter">
      {eyebrow && <p>{eyebrow}</p>}
      {heading && <h2>{heading}</h2>}
      <div className="relative mt-lg">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-lg">
            {cards.map((card, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                <Card card={card} />
              </div>
            ))}
          </div>
        </div>

        {cards.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute right-xl -top-xl w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Previous slide"
            >
              <ArrowLeftIcon className="w-6 h-6 text-black" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-0 -top-xl w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Next slide"
            >
              <ArrowRightIcon className="w-6 h-6 text-black" />
            </button>
          </>
        )}

      </div>
    </div>
  );
}
