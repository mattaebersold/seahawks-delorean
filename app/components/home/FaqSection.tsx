import { useState } from "react";
import type { FaqSection as FaqSectionType } from "~/types/homeTypes";
import { SECTION_IDS } from "~/types/homeTypes";

interface Props {
  data?: FaqSectionType;
}

export function FaqSection({ data }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!data?.items?.length) return null;

  return (
    <section id={SECTION_IDS.faq} className="py-xl w-11/12 mx-auto max-w-[800px]">
      <div className="max-w-wide mx-auto px-gutter">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-lg">
            {data.title && <h2 className="text-4xl">{data.title}</h2>}
            {data.subtitle && <p className="text-xl mt-sm">{data.subtitle}</p>}
          </div>
        )}
        <div className="flex gap-md flex-wrap pt-lg">
          {data.items.map((item, i) => (
            <div key={item._key} className="py-md px-lg rounded-[10px] bg-[#e0e0e0] w-full">
              <button
                className="w-full text-left py-md flex items-center justify-between gap-md cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-xl font-semibold">{item.question}</span>
                <span className="text-2xl leading-none shrink-0">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && item.answer && (
                <p className="pb-md text-black text-lg">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
