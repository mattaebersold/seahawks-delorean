import { PortableText } from "@portabletext/react";

import Button from "~/components/global/Button";
import { SanityImage } from "./SanityImage";

type ContentProps = {
  value?: any[] | null;
};

const components = {
  types: {
    image: SanityImage,
    portableTextButton: ({
      value,
    }: {
      value: { text?: string; href?: string; variant?: "primary" | "secondary" | "ghost" };
    }) => {
      if (!value.text || !value.href) return null;
      return (
        <div className="my-md">
          <Button to={value.href} variant={value.variant}>
            {value.text}
          </Button>
        </div>
      );
    },
  },
};

export function SanityContent(props: ContentProps) {
  const { value } = props;
  if (!value) return null;

  return (
    <div className="prose font-serif dark:prose-invert lg:prose-2xl prose-a:text-cyan-600 dark:prose-a:text-cyan-200">
      <PortableText value={value} components={components} />
    </div>
  );
}
