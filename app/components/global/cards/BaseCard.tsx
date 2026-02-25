import urlBuilder from "@sanity/image-url";
import { Link } from "react-router";
import type { Card as CardType } from "~/types/blockTypes";
import { dataset, projectId } from "~/sanity/projectDetails";
import Button from "~/components/global/Button";
import clsx from 'clsx';

interface BaseCardProps {
  card: CardType;
  layout?: string;
  bgColor?: string;
  className?: string;
  forceButton?: boolean;
}

export default function Card({ card, layout = "vertical", bgColor, className, forceButton = false }: BaseCardProps) {
  const isVertical = layout === "vertical" || layout === "vertical-full" || layout === "vertical-half";
  const isVerticalFull = layout === "vertical-full";
  const isVerticalHalf = layout === "vertical-half";
  const isClickable = card.buttonHref;

  const cardContent = (
    <>
      {card.image?.image && (
        <img
          src={urlBuilder({ projectId, dataset })
            .image(card.image.image)
            .width(1200)
            .fit("max")
            .auto("format")
            .url()}
          alt={card.image.alt || ""}
          className={clsx(
            layout === "horizontal" && "w-full md:w-1/2 aspect-[16/9] md:aspect-auto h-auto ",
            isVertical && "aspect-[16/9] w-full h-auto",
            "block object-cover",
          )}
        />
      )}
      <div className={clsx(
        "flex items-center pl-lg",
        isVertical && "py-md",
        layout === "horizontal" && "py-md md:py-0"
      )}>
        <div>
          {card.eyebrow && <span className="uppercase text-[10px]">{card.eyebrow}</span>}
          {card.title && <h3>{card.title}</h3>}
          {card.subtitle && <p>{card.subtitle}</p>}
          {(card.buttonText && card.buttonHref && !isVertical) || forceButton && (
            <div className="mt-md">
              <Button to={card.buttonHref}>{card.buttonText}</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const cardClasses = clsx(
    "flex rounded-card overflow-hidden text-black relative",
    !bgColor && "bg-white/30 text-white",
    layout === "horizontal" && "flex-col md:flex-row",
    isVertical && "flex-col",
    isVerticalFull && "w-full",
    isVerticalHalf && "w-1/2",
    className // Add className prop to the clsx call
  );

  if (isClickable) {
    return (
      <Link
        to={card.buttonHref!}
        className={cardClasses}
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div
      className={cardClasses}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {cardContent}
    </div>
  );
}