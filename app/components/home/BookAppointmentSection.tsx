import { useState } from "react";
import { SanityContent } from "~/components/sanity/SanityContent";
import Button from "~/components/global/Button";
import type { BookSection as BookSectionType } from "~/types/homeTypes";
import { SECTION_IDS } from "~/types/homeTypes";

const FORM_NAME = "book-appointment";

interface Props {
  data?: BookSectionType;
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>
        {label}
        {required && <span className="text-red ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

export function BookAppointmentSection({ data }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sponsorName, setSponsorName] = useState("");

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
          {data?.title && <h3>{data.title}</h3>}
          {data?.body && <SanityContent value={data.body} />}
        </div>

        <div className="max-w-[800px] mx-auto">
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

              {/* ── YOUR CONTACT INFO ── */}
              <h4 className="uppercase tracking-wide border-b border-black/20 pb-sm">Your Contact Info</h4>

              <div className="grid grid-cols-2 gap-md">
                <Field id="firstName" label="First Name" required>
                  <input id="firstName" name="firstName" type="text" required />
                </Field>
                <Field id="lastName" label="Last Name" required>
                  <input id="lastName" name="lastName" type="text" required />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <Field id="email" label="Email" required>
                  <input id="email" name="email" type="email" required />
                </Field>
                <Field id="phone" label="Phone" required>
                  <input id="phone" name="phone" type="tel" required />
                </Field>
              </div>

              <Field id="subject" label="Subject" required>
                <input id="subject" name="subject" type="text" required />
              </Field>

              <Field id="message" label="Message" required>
                <textarea id="message" name="message" rows={4} required className="resize-y" />
              </Field>

              {/* ── EVENT SPONSOR ── */}
              <h4 className="uppercase tracking-wide border-b border-black/20 pb-sm mt-sm">
                Event Sponsor <span className="text-sm font-normal normal-case text-black/50">(if different)</span>
              </h4>

              <Field id="sponsorName" label="Sponsor Name">
                <input
                  id="sponsorName"
                  name="sponsorName"
                  type="text"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                />
              </Field>

              {sponsorName.trim() && (
                <>
                  <div className="grid grid-cols-2 gap-md">
                    <Field id="sponsorFirstName" label="First Name" required>
                      <input id="sponsorFirstName" name="sponsorFirstName" type="text" required />
                    </Field>
                    <Field id="sponsorLastName" label="Last Name" required>
                      <input id="sponsorLastName" name="sponsorLastName" type="text" required />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-md">
                    <Field id="sponsorEmail" label="Email" required>
                      <input id="sponsorEmail" name="sponsorEmail" type="email" required />
                    </Field>
                    <Field id="sponsorPhone" label="Phone" required>
                      <input id="sponsorPhone" name="sponsorPhone" type="tel" required />
                    </Field>
                  </div>
                </>
              )}

              {/* ── EVENT INFO ── */}
              <h4 className="uppercase tracking-wide border-b border-black/20 pb-sm mt-sm">
                Event Info <span className="text-sm font-normal normal-case text-black/50">(required for quote/reservation)</span>
              </h4>

              <Field id="address" label="Address" required>
                <input id="address" name="address" type="text" required />
              </Field>

              <Field id="address2" label="Address 2">
                <input id="address2" name="address2" type="text" />
              </Field>

              <div className="grid grid-cols-2 gap-md">
                <Field id="city" label="City" required>
                  <input id="city" name="city" type="text" required />
                </Field>
                <Field id="county" label="County" required>
                  <input id="county" name="county" type="text" required />
                </Field>
              </div>

              <Field id="state" label="State" required>
                <input id="state" name="state" type="text" required />
              </Field>

              <Field id="eventType" label="Event Type" required>
                <select id="eventType" name="eventType" required>
                  <option value="">Select an option</option>
                  <option value="seahawks-party">Seahawks Party</option>
                  <option value="birthday-party">Birthday Party</option>
                  <option value="tailgate-party">Tailgate Party</option>
                  <option value="sports-event">Sports Event</option>
                  <option value="music-video">Music Video</option>
                  <option value="graduation">Graduation</option>
                  <option value="photo-shoot">Photo Shoot</option>
                  <option value="video-promotion">Video Promotion</option>
                  <option value="convention">Convention</option>
                  <option value="charity-event">Charity Event</option>
                  <option value="other">Other</option>
                </select>
              </Field>

              <Field id="eventLength" label="Length of Event">
                <select id="eventLength" name="eventLength">
                  <option value="">Select an option</option>
                  <option value="hourly-0-2">Hourly 0–2 Hours</option>
                  <option value="hourly-2-plus">2+ Hours</option>
                  <option value="full-day">Full Day (8 hours+)</option>
                  <option value="daily-1-3">Daily (1–3 Days)</option>
                </select>
              </Field>

              <div className="grid grid-cols-2 gap-md">
                <Field id="eventStartDate" label="Event Start Date" required>
                  <input id="eventStartDate" name="eventStartDate" type="date" required />
                </Field>
                <Field id="eventStartTime" label="Event Start Time" required>
                  <input id="eventStartTime" name="eventStartTime" type="time" required />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <Field id="eventEndDate" label="Event End Date" required>
                  <input id="eventEndDate" name="eventEndDate" type="date" required />
                </Field>
                <Field id="eventEndTime" label="Event End Time" required>
                  <input id="eventEndTime" name="eventEndTime" type="time" required />
                </Field>
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

        <div className="w-3/4 max-w-[550px] text-center mx-auto">
          <p className="text-xl pt-lg">The Seahawks Delorean Car and Trailer are Available for Hire - for appearances in greater King County, Washington area.</p>
          <p className="text-sm italic text-black/50 max-w-[400px] mx-auto">*This is for an appearance or possible a ride-along as in a parade - Not to drive the car. The Trailer cannot be used for riding in.</p>
        </div>
      </div>
    </section>
  );
}
