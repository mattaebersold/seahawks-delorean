import clsx from "clsx";
import type { SpacerBlock as SpacerBlockType } from "~/types/blockTypes";

export default function SpacerBlock(props: SpacerBlockType) {
  const { size = "medium" } = props;

  return (
    <div
      className={clsx(
        size === "small" && "h-8 md:h-12",
        size === "medium" && "h-16 md:h-24",
        size === "large" && "h-24 md:h-40"
      )}
      aria-hidden="true"
    />
  );
}
