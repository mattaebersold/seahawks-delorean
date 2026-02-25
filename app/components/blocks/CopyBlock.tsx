import type { CopyBlock as CopyBlockType } from "~/types/blockTypes";
import { SanityContent } from "~/components/sanity/SanityContent";

export default function CopyBlock({ body }: CopyBlockType) {
  return (
    <div className="max-w-narrow mx-auto px-xl">
      <SanityContent value={body} />
    </div>
  );
}
