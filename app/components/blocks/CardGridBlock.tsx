import type { CardGridBlock as CardGridBlockType } from "~/types/blockTypes";
import Card from "~/components/global/cards/BaseCard";

export default function CardGridBlock({ cards }: CardGridBlockType) {
  if (!cards?.length) return null;

  return (
    <div className="max-w-wide mx-auto px-gutter">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        {cards.map((card, index) => (
          <Card key={index} card={card} layout="vertical" forceButton />
        ))}
      </div>
    </div>
  );
}
