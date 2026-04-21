import { useState } from "react";
import { SanityContent } from "~/components/sanity/SanityContent";
import Button from "~/components/global/Button";
import type { BookSection as BookSectionType } from "~/types/homeTypes";
import { SECTION_IDS } from "~/types/homeTypes";

const BOOK_FORM_NAME = "book-appointment";
const CONTACT_FORM_NAME = "contact-us";

type ActiveForm = "contact" | "book";

interface Props {
  data?: BookSectionType;
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>
        {label}
        {required && <span className="text-red ml-1">*</span>}
      </label>
      {children}
      {error && <span className="text-red text-xs mt-1">{error}</span>}
    </div>
  );
}

function ContactUsForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch("/resource/form-submit", {
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

  if (submitted) {
    return (
      <div className="bg-white/5 rounded-card p-lg text-center">
        <p className="text-lg">Thank you! We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form
      name={CONTACT_FORM_NAME}
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="flex flex-col gap-sm bg-white/5 rounded-card p-sm"
    >
      <input type="hidden" name="form-name" value={CONTACT_FORM_NAME} />

      <div className="grid grid-cols-2 gap-md">
        <Field id="contactFirstName" label="First Name" required>
          <input id="contactFirstName" name="firstName" type="text" required />
        </Field>
        <Field id="contactLastName" label="Last Name" required>
          <input id="contactLastName" name="lastName" type="text" required />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-md">
        <Field id="contactEmail" label="Email" required>
          <input id="contactEmail" name="email" type="email" required />
        </Field>
        <Field id="contactPhone" label="Phone" required>
          <input id="contactPhone" name="phone" type="tel" required />
        </Field>
      </div>

      <Field id="contactMessage" label="Message" required>
        <textarea id="contactMessage" name="message" rows={4} required className="resize-y" />
      </Field>

      {error && (
        <p className="text-red text-sm">Something went wrong. Please try again.</p>
      )}

      <div className="mt-sm">
        <Button type="submit" disabled={loading}>
          {loading ? "Sending…" : "Send Message"}
        </Button>
      </div>
    </form>
  );
}

const REQUIRED_FIELDS: Record<string, string> = {
  firstName: "First Name is required",
  lastName: "Last Name is required",
  email: "Email is required",
  phone: "Phone is required",
  subject: "Subject is required",
  message: "Message is required",
  address: "Address is required",
  city: "City is required",
  county: "County is required",
  state: "State is required",
  eventType: "Event Type is required",
  eventStartDate: "Event Start Date is required",
  eventEndDate: "Event End Date is required",
};

function BookAppointmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sponsorName, setSponsorName] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function clearError(name: string) {
    if (fieldErrors[name]) {
      setFieldErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errors: Record<string, string> = {};

    for (const [field, message] of Object.entries(REQUIRED_FIELDS)) {
      if (!formData.get(field)?.toString().trim()) {
        errors[field] = message;
      }
    }

    if (sponsorName.trim()) {
      for (const [field, label] of [
        ["sponsorFirstName", "First Name"],
        ["sponsorLastName", "Last Name"],
        ["sponsorEmail", "Email"],
        ["sponsorPhone", "Phone"],
      ] as [string, string][]) {
        if (!formData.get(field)?.toString().trim()) {
          errors[field] = `${label} is required`;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/resource/form-submit", {
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

  if (submitted) {
    return (
      <div className="bg-white/5 rounded-card p-lg text-center">
        <p className="text-lg">Thank you! We'll be in touch to confirm your appearance.</p>
      </div>
    );
  }

  return (
    <form
      name={BOOK_FORM_NAME}
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="flex flex-col gap-sm bg-white/5 rounded-card p-sm"
    >
      <input type="hidden" name="form-name" value={BOOK_FORM_NAME} />

      {/* ── YOUR CONTACT INFO ── */}
      <h4 className="uppercase tracking-wide border-b border-black/20 pb-sm">Your Contact Info</h4>

      <div className="grid grid-cols-2 gap-md">
        <Field id="firstName" label="First Name" required error={fieldErrors.firstName}>
          <input id="firstName" name="firstName" type="text" onChange={() => clearError("firstName")} />
        </Field>
        <Field id="lastName" label="Last Name" required error={fieldErrors.lastName}>
          <input id="lastName" name="lastName" type="text" onChange={() => clearError("lastName")} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-md">
        <Field id="email" label="Email" required error={fieldErrors.email}>
          <input id="email" name="email" type="email" onChange={() => clearError("email")} />
        </Field>
        <Field id="phone" label="Phone" required error={fieldErrors.phone}>
          <input id="phone" name="phone" type="tel" onChange={() => clearError("phone")} />
        </Field>
      </div>

      <Field id="subject" label="Subject" required error={fieldErrors.subject}>
        <input id="subject" name="subject" type="text" onChange={() => clearError("subject")} />
      </Field>

      <Field id="message" label="Message" required error={fieldErrors.message}>
        <textarea id="message" name="message" rows={4} className="resize-y" onChange={() => clearError("message")} />
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
            <Field id="sponsorFirstName" label="First Name" required error={fieldErrors.sponsorFirstName}>
              <input id="sponsorFirstName" name="sponsorFirstName" type="text" onChange={() => clearError("sponsorFirstName")} />
            </Field>
            <Field id="sponsorLastName" label="Last Name" required error={fieldErrors.sponsorLastName}>
              <input id="sponsorLastName" name="sponsorLastName" type="text" onChange={() => clearError("sponsorLastName")} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-md">
            <Field id="sponsorEmail" label="Email" required error={fieldErrors.sponsorEmail}>
              <input id="sponsorEmail" name="sponsorEmail" type="email" onChange={() => clearError("sponsorEmail")} />
            </Field>
            <Field id="sponsorPhone" label="Phone" required error={fieldErrors.sponsorPhone}>
              <input id="sponsorPhone" name="sponsorPhone" type="tel" onChange={() => clearError("sponsorPhone")} />
            </Field>
          </div>
        </>
      )}

      {/* ── EVENT INFO ── */}
      <h4 className="uppercase tracking-wide border-b border-black/20 pb-sm mt-sm">
        Event Info <span className="text-sm font-normal normal-case text-black/50">(required for quote/reservation)</span>
      </h4>

      <Field id="address" label="Address" required error={fieldErrors.address}>
        <input id="address" name="address" type="text" onChange={() => clearError("address")} />
      </Field>

      <Field id="address2" label="Address 2">
        <input id="address2" name="address2" type="text" />
      </Field>

      <div className="grid grid-cols-2 gap-md">
        <Field id="city" label="City" required error={fieldErrors.city}>
          <input id="city" name="city" type="text" onChange={() => clearError("city")} />
        </Field>
        <Field id="county" label="County" required error={fieldErrors.county}>
          <input id="county" name="county" type="text" onChange={() => clearError("county")} />
        </Field>
      </div>

      <Field id="state" label="State" required error={fieldErrors.state}>
        <input id="state" name="state" type="text" onChange={() => clearError("state")} />
      </Field>

      <Field id="eventType" label="Event Type" required error={fieldErrors.eventType}>
        <select id="eventType" name="eventType" onChange={() => clearError("eventType")}>
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

      <div className="grid grid-cols-2 gap-md">
        <Field id="eventStartDate" label="Event Start Date" required error={fieldErrors.eventStartDate}>
          <input id="eventStartDate" name="eventStartDate" type="date" onChange={() => clearError("eventStartDate")} />
        </Field>
        <Field id="eventStartTime" label="Event Start Time">
          <input id="eventStartTime" name="eventStartTime" type="time" />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-md">
        <Field id="eventEndDate" label="Event End Date" required error={fieldErrors.eventEndDate}>
          <input id="eventEndDate" name="eventEndDate" type="date" onChange={() => clearError("eventEndDate")} />
        </Field>
        <Field id="eventEndTime" label="Event End Time">
          <input id="eventEndTime" name="eventEndTime" type="time" />
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
  );
}

export function BookAppointmentSection({ data }: Props) {
  const [activeForm, setActiveForm] = useState<ActiveForm>("contact");

  return (
    <section id={SECTION_IDS.book} className="py-xl">
      <div className="max-w-wide mx-auto px-gutter">

        <div className="text-center mb-md">
          {data?.title && <h3>{data.title}</h3>}
          {data?.body && <SanityContent value={data.body} />}
        </div>

        <div className="max-w-[800px] mx-auto mt-[60px]">
          {/* Toggle switcher */}
          <div className="flex justify-center mb-xl">
            <div className="relative flex bg-black/10 rounded-full p-1 w-[480px]">
              {/* sliding pill */}
              <span
                aria-hidden="true"
                className={`absolute inset-y-1 w-1/2 rounded-full bg-black transition-transform duration-300 ease-in-out ${
                  activeForm === "book" ? "translate-x-full" : "translate-x-0"
                }`}
              />
              <button
                type="button"
                onClick={() => setActiveForm("contact")}
                className={`relative z-10 w-1/2 text-center px-8 py-3 rounded-full text-base font-semibold transition-colors duration-300 ${
                  activeForm === "contact" ? "text-white" : "text-black/60 hover:text-black"
                }`}
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={() => setActiveForm("book")}
                className={`relative z-10 w-1/2 text-center px-8 py-3 rounded-full text-base font-semibold transition-colors duration-300 ${
                  activeForm === "book" ? "text-white" : "text-black/60 hover:text-black"
                }`}
              >
                Book&nbsp;Appearance
              </button>
            </div>
          </div>

          {activeForm === "contact" ? <ContactUsForm /> : <BookAppointmentForm />}
        </div>

        <div className="w-3/4 max-w-[550px] text-center mx-auto">
          <p className="text-xl pt-lg">The Seahawks Delorean Car and Trailer are Available for Hire - for appearances in greater King County, Washington area.</p>
          <p className="text-sm italic text-black/50 max-w-[400px] mx-auto">*This is for an appearance or possible a ride-along as in a parade - Not to drive the car. The Trailer cannot be used for riding in.</p>
        </div>
      </div>
    </section>
  );
}
