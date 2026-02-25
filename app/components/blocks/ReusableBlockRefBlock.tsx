import type { ReusableBlockRef } from "~/types/blockTypes";
import { renderBaseBlock } from "./BlocksList";

export default function ReusableBlockRefBlock({
  reusableBlock,
}: ReusableBlockRef) {
  if (!reusableBlock?.blocks) return null;

  const activeBlocks = reusableBlock.blocks.filter((block) => !block?.disabled);

  return (
    <>
      {activeBlocks.map((block, index) =>
        renderBaseBlock(block, index, activeBlocks)
      )}
    </>
  );
}
