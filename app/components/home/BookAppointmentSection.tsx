import { useState } from "react";
import { sanityImageUrl } from "~/sanity/lib/image";
import { SanityContent } from "~/components/sanity/SanityContent";
import Button from "~/components/global/Button";
import type { BookSection as BookSectionType } from "~/types/homeTypes";
import { SECTION_IDS } from "~/types/homeTypes";

const FORM_NAME = "book-appointment";

interface Props {
  data?: BookSectionType;
}

export function BookAppointmentSection({ data }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      if (!res.ok) throw new Error("Non-OK response");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id={SECTION_IDS.book} className="py-2xl">
      <div className="max-w-wide mx-auto px-gutter">

        <div className="text-center mb-lg">
          {data?.title && (
            <h2 className="text-4xl mb-lg">{data.title}</h2>
          )}
          <div className="wys text-xl">
            {data?.body && <SanityContent value={data.body} />}
          </div>

          
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-md items-start">
          {/* Left: text + image */}
          <div>
            
            {data?.image?.asset?.url && (
              <div className="mt-lg overflow-hidden">
                <img
                  src={sanityImageUrl(data.image).width(800).fit("max").auto("format").url()}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Right: form */}
          <div>
            {submitted ? (
              <div className="bg-white/5 rounded-card p-lg text-center">
                <p className="text-lg">Thank you! We'll be in touch to confirm your appointment.</p>
              </div>
            ) : (
              <form
                name={FORM_NAME}
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="flex flex-col gap-md bg-white/5 rounded-card p-lg"
              >
                <input type="hidden" name="form-name" value={FORM_NAME} />

                <div className="flex flex-col">
                  <label htmlFor="name">
                    Name <span className="text-red ml-1">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email">
                    Email <span className="text-red ml-1">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 000-0000"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="description">
                    Description <span className="text-red ml-1">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Tell us a bit about what you need..."
                    required
                    rows={4}
                    className="resize-y"
                  />
                </div>

                <div className="grid grid-cols-2 gap-md">
                  <div className="flex flex-col">
                    <label htmlFor="date">
                      Preferred Date <span className="text-red ml-1">*</span>
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="time">
                      Preferred Time <span className="text-red ml-1">*</span>
                    </label>
                    <input
                      id="time"
                      name="time"
                      type="time"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red text-sm">Something went wrong. Please try again.</p>
                )}

                <div className="mt-sm">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Sending…" : "Submit"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
