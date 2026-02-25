import type { ComponentType, ReactNode } from "react";

import type { Block, BaseBlock } from "~/types/blockTypes";

import BlockParent, { BlockOrderContext, type BlockOrder } from "./BlockParent";
import CopyBlock from "./CopyBlock";
import MediaBlock from "./MediaBlock";
import CardCarouselBlock from "./CardCarouselBlock";
import CardGridBlock from "./CardGridBlock";
import SpacerBlock from "./SpacerBlock";
import ReusableBlockRefBlock from "./ReusableBlockRefBlock";
import FormBlock from "./FormBlock";

interface BlocksListProps {
  blocks: Block[];
}

// Render non-disabled blocks based on type, wrapped in BlockParent
export default function BlocksList({ blocks }: BlocksListProps) {
  return (
    <>
      {(blocks || [])
        .filter((block) => !block?.disabled)
        .map((block, index, filteredBlocks) =>
          renderBlock(block, index, filteredBlocks)
        )}
    </>
  );
}

// Render a block with wrapping components/context
export function renderBlock(
  block: Block,
  index: number,
  blocks: Block[],
): ReactNode {
  // Make the actual block instance. It may not exist if content has been
  // created for a new schema whose related block component hasn't been
  // deployed yet.
  const blockInstance = makeBlockInstance(block);
  if (!blockInstance) return null;

  // Wrap the block in standard wrappers
  return (
    <BlockOrderContext.Provider
      key={block._key}
      value={makeBlockOrderValue(index, blocks)}
    >
      <BlockParent block={block}>{blockInstance}</BlockParent>
    </BlockOrderContext.Provider>
  );
}

// Render a base block (used by ReusableBlockRef for nested blocks)
export function renderBaseBlock(
  block: BaseBlock,
  index: number,
  blocks: BaseBlock[],
): ReactNode {
  const blockInstance = makeBaseBlockInstance(block);
  if (!blockInstance) return null;

  return (
    <BlockOrderContext.Provider
      key={block._key}
      value={makeBlockOrderValue(index, blocks as Block[])}
    >
      <BlockParent block={block}>{blockInstance}</BlockParent>
    </BlockOrderContext.Provider>
  );
}

// Make the block order value
function makeBlockOrderValue(index: number, blocks: Block[]): BlockOrder {
  const previous = index === 0 ? null : blocks[index - 1];
  const next = index === blocks.length - 1 ? null : blocks[index + 1];
  return { previous, next, index };
}

// Return a block depending on the _type (all block types including reference)
function makeBlockInstance(block: Block): ReactNode {
  const ComponentFunction = getComponentFunction(block._type);
  if (!ComponentFunction) return null;
  return <ComponentFunction {...(block as any)} />;
}

// Return a base block (no reference blocks allowed - prevents recursion)
function makeBaseBlockInstance(block: BaseBlock): ReactNode {
  const ComponentFunction = getComponentFunction(block._type);
  if (!ComponentFunction) return null;
  return <ComponentFunction {...(block as any)} />;
}

// Map block _type to React component
const blockComponents: Record<string, ComponentType<any>> = {
  copyBlock: CopyBlock,
  mediaBlock: MediaBlock,
  cardGridBlock: CardGridBlock,
  cardCarouselBlock: CardCarouselBlock,
  spacerBlock: SpacerBlock,
  reusableBlockRef: ReusableBlockRefBlock,
  formBlock: FormBlock,
};

function getComponentFunction(type: string): ComponentType<any> | null {
  return blockComponents[type] || null;
}
