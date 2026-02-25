import clsx from "clsx";
import { createContext, useContext } from "react";

import type {
  Block,
  BlockBackground,
  BlockSpacing,
  BackgroundColor,
  BlockPadding,
  HideWhen,
} from "~/types/blockTypes";
import {
  BlockSpacing as BlockSpacingEnum,
  BackgroundColor as BackgroundColorEnum,
  BlockPadding as BlockPaddingEnum,
  HideWhen as HideWhenEnum,
} from "~/types/blockTypes";

// Context for block order information
export interface BlockOrder {
  previous: Block | null;
  next: Block | null;
  index: number;
}

export const BlockOrderContext = createContext<BlockOrder>({
  previous: null,
  next: null,
  index: 0,
});

// Map a single option to a value
function mapOption<T extends string>(
  value: T | undefined,
  map: Partial<Record<T, string>>
): string | undefined {
  if (!value) return undefined;
  return map[value];
}

// Map multiple options to values
function mapOptions<T extends string>(
  values: T[] | undefined,
  map: Record<T, string>
): string[] {
  if (!values) return [];
  return values.map((value) => map[value]).filter(Boolean);
}

// Apply common layout options to block
export default function BlockParent({
  block,
  children,
}: {
  block: Block;
  children: React.ReactNode;
}): React.ReactElement {
  const blockOrder = useContext(BlockOrderContext);

  return (
    <div
      className={clsx([
        // Hide at different viewports
        mapOptions(block.hideWhen, {
          [HideWhenEnum.Mobile]: "max-md:hidden",
          [HideWhenEnum.Tablet]: "md:max-lg:hidden",
          [HideWhenEnum.Desktop]: "lg:hidden",
        }),

        // Apply margin top between blocks
        mapBlockSpacingToTailwindClass(block, blockOrder.previous),

        // Set a background color
        "backgroundColor" in block &&
          mapOption(block.backgroundColor, {
            [BackgroundColorEnum.Faint]: "bg-blue/10",
            [BackgroundColorEnum.Vibrant]: "bg-blue",
            [BackgroundColorEnum.Dark]: "bg-dark-blue",
          }),

        // Set padding within block, like if there is a background
        mapPaddingTopToTailwindClass(block, blockOrder.previous),
        mapPaddingBottomToTailwindClass(block, blockOrder.next),
      ])}
    >
      {children}
    </div>
  );
}

// Map props to tailwind classes
function mapBlockSpacingToTailwindClass(
  block: Block,
  previousBlock: Block | null
): string | undefined {
  // Is the first block, so don't add margin
  if (!previousBlock) return undefined;

  // If the previous block has the same background, render using padding so
  // the background is un-interrupted between the blocks
  if (hasBackground(block) && sameBackground(block, previousBlock)) {
    return spacingToPaddingTop(block.blockSpacing);
  } else {
    return spacingToMarginTop(block.blockSpacing);
  }
}

// Convert spacing to padding top classes
function spacingToPaddingTop(blockSpacing: BlockSpacing): string {
  switch (blockSpacing) {
    case BlockSpacingEnum.Small:
      return "pt-sm";
    case BlockSpacingEnum.Medium:
      return "pt-md";
    case BlockSpacingEnum.Large:
    default:
      return "pt-lg";
  }
}

// Convert spacing to padding bottom classes
function spacingToPaddingBottom(blockSpacing: BlockSpacing): string {
  switch (blockSpacing) {
    case BlockSpacingEnum.Small:
      return "pb-sm";
    case BlockSpacingEnum.Medium:
      return "pb-md";
    case BlockSpacingEnum.Large:
    default:
      return "pb-lg";
  }
}

// Convert spacing to margin top classes
function spacingToMarginTop(blockSpacing: BlockSpacing): string {
  switch (blockSpacing) {
    case BlockSpacingEnum.Small:
      return "mt-sm";
    case BlockSpacingEnum.Medium:
      return "mt-md";
    case BlockSpacingEnum.Large:
    default:
      return "mt-lg";
  }
}

// Adds padding above a block, like when there is a background color
function mapPaddingTopToTailwindClass(
  block: Block,
  previousBlock: Block | null
): string | undefined {
  if (!("paddingTop" in block)) return undefined;

  switch (block.paddingTop) {
    // Explicit sizes
    case BlockPaddingEnum.Small:
      return "pt-sm";
    case BlockPaddingEnum.Medium:
      return "pt-md";
    case BlockPaddingEnum.Large:
      return "pt-lg";

    // Add padding top if this block has a non-empty background and
    // has a different background than the previous block
    case BlockPaddingEnum.Matching:
      return hasBackground(block) && !sameBackground(block, previousBlock)
        ? spacingToPaddingTop(block.blockSpacing)
        : undefined;
  }
}

// Adds padding below a block, like when there is a background color
function mapPaddingBottomToTailwindClass(
  block: Block,
  nextBlock: Block | null
): string | undefined {
  if (!("paddingBottom" in block)) return undefined;

  switch (block.paddingBottom) {
    // Explicit sizes
    case BlockPaddingEnum.Small:
      return "pb-sm";
    case BlockPaddingEnum.Medium:
      return "pb-md";
    case BlockPaddingEnum.Large:
      return "pb-lg";

    // Add padding bottom if this block has a non-empty background and
    // has a different background than the next block
    case BlockPaddingEnum.Matching:
      return hasBackground(block) && !sameBackground(block, nextBlock)
        ? spacingToPaddingBottom(block.blockSpacing)
        : undefined;
  }
}

// Helper to determine if a background was set on a block
function hasBackground(block: Block): boolean {
  return block && "backgroundColor" in block && !!block.backgroundColor;
}

// Get the background of a block in TypeScript friendly way
function getBackground(block: Block | null): BackgroundColor {
  if (!block) return BackgroundColorEnum.None;
  return hasBackground(block)
    ? (block as BlockBackground).backgroundColor
    : BackgroundColorEnum.None;
}

// Compare two blocks to see if they have the same background settings
function sameBackground(block1: Block, block2: Block | null): boolean {
  return getBackground(block1) === getBackground(block2);
}
