import { useState, useEffect } from "react";
import { SanityContent } from "~/components/sanity/SanityContent";
import Button from "~/components/global/Button";
import type { BookSection as BookSectionType } from "~/types/homeTypes";
import { SECTION_IDS } from "~/types/homeTypes";

const CONTACT_FORM_NAME = "contact-us";
const BOOK_PRIVATE_FORM_NAME = "book-private";
const BOOK_PUBLIC_FORM_NAME = "book-public";

type ActiveForm = "contact" | "private" | "public";

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
    <div className={`flex flex-col${error ? " field-error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required && <span className="text-red ml-1">*</span>}
      </label>
      {children}
      {error && <span className="text-red text-xs mt-1">{error}</span>}
    </div>
  );
}

function Modal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-bg rounded-card w-full max-w-[700px] max-h-[90vh] overflow-y-auto p-lg shadow-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="sticky top-0 float-right text-black/50 hover:text-black text-xl leading-none w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/10 transition"
        >
          ✕
        </button>
        <div className="mb-md pr-10">
          <h3 className="uppercase">{title}</h3>
          {subtitle && (
            <p className="text-sm text-black/60 mt-1 mb-0">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

function ContactUsForm({
  values,
  onChange,
  onSubmitSuccess,
}: {
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onSubmitSuccess: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function clearError(name: string) {
    if (fieldErrors[name]) {
      setFieldErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
    }
  }

  function handleChange(name: string, value: string) {
    onChange(name, value);
    clearError(name);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errors: Record<string, string> = {};

    for (const [field, message] of [
      ["firstName", "First Name is required"],
      ["lastName", "Last Name is required"],
      ["email", "Email is required"],
      ["phone", "Phone is required"],
      ["message", "Message is required"],
    ] as [string, string][]) {
      if (!formData.get(field)?.toString().trim()) {
        errors[field] = message;
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTimeout(() => {
        document.getElementById(Object.keys(errors)[0])?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }

    setFieldErrors({});
    setLoading(true);
    setSubmitError(false);
    try {
      const res = await fetch("/netlify-forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      if (!res.ok) throw new Error("Non-OK response");
      setSubmitted(true);
      onSubmitSuccess();
    } catch {
      setSubmitError(true);
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
      className="flex flex-col gap-sm"
    >
      <input type="hidden" name="form-name" value={CONTACT_FORM_NAME} />

      <div className="grid grid-cols-2 gap-md">
        <Field id="firstName" label="First Name" required error={fieldErrors.firstName}>
          <input
            id="firstName" name="firstName" type="text"
            value={values.firstName ?? ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </Field>
        <Field id="lastName" label="Last Name" required error={fieldErrors.lastName}>
          <input
            id="lastName" name="lastName" type="text"
            value={values.lastName ?? ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-md">
        <Field id="email" label="Email" required error={fieldErrors.email}>
          <input
            id="email" name="email" type="email"
            value={values.email ?? ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Field>
        <Field id="phone" label="Phone" required error={fieldErrors.phone}>
          <input
            id="phone" name="phone" type="tel"
            value={values.phone ?? ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </Field>
      </div>

      <Field id="message" label="Message" required error={fieldErrors.message}>
        <textarea
          id="message" name="message" rows={4} className="resize-y"
          value={values.message ?? ""}
          onChange={(e) => handleChange("message", e.target.value)}
        />
      </Field>

      {submitError && (
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

const BASE_REQUIRED: Record<string, string> = {
  firstName: "First Name is required",
  lastName: "Last Name is required",
  email: "Email is required",
  phone: "Phone is required",
  eventType: "Event Type is required",
  address: "Address is required",
  city: "City is required",
  county: "County is required",
  state: "State is required",
  eventStartDate: "Event Start Date is required",
  eventEndDate: "Event End Date is required",
  additionalInfo: "Additional Info is required",
};

const SPONSOR_REQUIRED: Record<string, string> = {
  sponsorFirstName: "Sponsor First Name is required",
  sponsorLastName: "Sponsor Last Name is required",
  sponsorEmail: "Sponsor Email is required",
  sponsorPhone: "Sponsor Phone is required",
};

function BookAppointmentForm({
  formType,
  values,
  onChange,
  onSubmitSuccess,
}: {
  formType: "private" | "public";
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onSubmitSuccess: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const formName = formType === "private" ? BOOK_PRIVATE_FORM_NAME : BOOK_PUBLIC_FORM_NAME;

  function clearError(name: string) {
    if (fieldErrors[name]) {
      setFieldErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
    }
  }

  function handleChange(name: string, value: string) {
    onChange(name, value);
    clearError(name);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errors: Record<string, string> = {};

    const required = formType === "public"
      ? { ...BASE_REQUIRED, ...SPONSOR_REQUIRED }
      : BASE_REQUIRED;

    for (const [field, message] of Object.entries(required)) {
      if (!formData.get(field)?.toString().trim()) {
        errors[field] = message;
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTimeout(() => {
        document.getElementById(Object.keys(errors)[0])?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }

    setFieldErrors({});
    setLoading(true);
    setSubmitError(false);
    try {
      const res = await fetch("/netlify-forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      if (!res.ok) throw new Error("Non-OK response");
      setSubmitted(true);
      onSubmitSuccess();
    } catch {
      setSubmitError(true);
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
      name={formName}
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="flex flex-col gap-sm"
    >
      <input type="hidden" name="form-name" value={formName} />

      {/* ── YOUR CONTACT INFO ── */}
      <h4 className="uppercase tracking-wide border-b border-black/20 pb-sm">
        Your Contact Info
      </h4>

      <div className="grid grid-cols-2 gap-md">
        <Field id="firstName" label="First Name" required error={fieldErrors.firstName}>
          <input
            id="firstName" name="firstName" type="text"
            value={values.firstName ?? ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </Field>
        <Field id="lastName" label="Last Name" required error={fieldErrors.lastName}>
          <input
            id="lastName" name="lastName" type="text"
            value={values.lastName ?? ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-md">
        <Field id="email" label="Email" required error={fieldErrors.email}>
          <input
            id="email" name="email" type="email"
            value={values.email ?? ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Field>
        <Field id="phone" label="Phone" required error={fieldErrors.phone}>
          <input
            id="phone" name="phone" type="tel"
            value={values.phone ?? ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </Field>
      </div>

      {/* ── EVENT INFO ── */}
      <h4 className="uppercase tracking-wide border-b border-black/20 pb-sm mt-sm">
        Event Info
      </h4>

      <Field id="eventType" label="Event Type" required error={fieldErrors.eventType}>
        <select
          id="eventType" name="eventType"
          value={values.eventType ?? ""}
          onChange={(e) => handleChange("eventType", e.target.value)}
        >
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

      <Field id="address" label="Address" required error={fieldErrors.address}>
        <input
          id="address" name="address" type="text"
          value={values.address ?? ""}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </Field>

      <Field id="address2" label="Address 2">
        <input
          id="address2" name="address2" type="text"
          value={values.address2 ?? ""}
          onChange={(e) => handleChange("address2", e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-md">
        <Field id="city" label="City" required error={fieldErrors.city}>
          <input
            id="city" name="city" type="text"
            value={values.city ?? ""}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </Field>
        <Field id="county" label="County" required error={fieldErrors.county}>
          <input
            id="county" name="county" type="text"
            value={values.county ?? ""}
            onChange={(e) => handleChange("county", e.target.value)}
          />
        </Field>
      </div>

      <Field id="state" label="State" required error={fieldErrors.state}>
        <input
          id="state" name="state" type="text"
          value={values.state ?? ""}
          onChange={(e) => handleChange("state", e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-md">
        <Field id="eventStartDate" label="Event Start Date" required error={fieldErrors.eventStartDate}>
          <input
            id="eventStartDate" name="eventStartDate" type="date"
            value={values.eventStartDate ?? ""}
            onChange={(e) => handleChange("eventStartDate", e.target.value)}
          />
        </Field>
        <Field id="eventStartTime" label="Event Start Time">
          <input
            id="eventStartTime" name="eventStartTime" type="time"
            value={values.eventStartTime ?? ""}
            onChange={(e) => handleChange("eventStartTime", e.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-md">
        <Field id="eventEndDate" label="Event End Date" required error={fieldErrors.eventEndDate}>
          <input
            id="eventEndDate" name="eventEndDate" type="date"
            value={values.eventEndDate ?? ""}
            onChange={(e) => handleChange("eventEndDate", e.target.value)}
          />
        </Field>
        <Field id="eventEndTime" label="Event End Time">
          <input
            id="eventEndTime" name="eventEndTime" type="time"
            value={values.eventEndTime ?? ""}
            onChange={(e) => handleChange("eventEndTime", e.target.value)}
          />
        </Field>
      </div>

      <Field id="additionalInfo" label="Additional Info" required error={fieldErrors.additionalInfo}>
        <textarea
          id="additionalInfo" name="additionalInfo" rows={4} className="resize-y"
          value={values.additionalInfo ?? ""}
          onChange={(e) => handleChange("additionalInfo", e.target.value)}
        />
      </Field>

      {/* ── EVENT SPONSOR CONTACT INFO (public events only) ── */}
      {formType === "public" && (
        <>
          <h4 className="uppercase tracking-wide border-b border-black/20 pb-sm mt-sm">
            Event Sponsor Contact Info
          </h4>

          <Field id="sponsorOrgName" label="Name of Sponsoring Organization">
            <input
              id="sponsorOrgName" name="sponsorOrgName" type="text"
              value={values.sponsorOrgName ?? ""}
              onChange={(e) => handleChange("sponsorOrgName", e.target.value)}
            />
          </Field>

          <div className="grid grid-cols-2 gap-md">
            <Field id="sponsorFirstName" label="First Name" required error={fieldErrors.sponsorFirstName}>
              <input
                id="sponsorFirstName" name="sponsorFirstName" type="text"
                value={values.sponsorFirstName ?? ""}
                onChange={(e) => handleChange("sponsorFirstName", e.target.value)}
              />
            </Field>
            <Field id="sponsorLastName" label="Last Name" required error={fieldErrors.sponsorLastName}>
              <input
                id="sponsorLastName" name="sponsorLastName" type="text"
                value={values.sponsorLastName ?? ""}
                onChange={(e) => handleChange("sponsorLastName", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-md">
            <Field id="sponsorEmail" label="Email" required error={fieldErrors.sponsorEmail}>
              <input
                id="sponsorEmail" name="sponsorEmail" type="email"
                value={values.sponsorEmail ?? ""}
                onChange={(e) => handleChange("sponsorEmail", e.target.value)}
              />
            </Field>
            <Field id="sponsorPhone" label="Phone" required error={fieldErrors.sponsorPhone}>
              <input
                id="sponsorPhone" name="sponsorPhone" type="tel"
                value={values.sponsorPhone ?? ""}
                onChange={(e) => handleChange("sponsorPhone", e.target.value)}
              />
            </Field>
          </div>
        </>
      )}

      {submitError && (
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

const FORM_OPTIONS: { type: ActiveForm; action: string; description: string }[] = [
  {
    type: "contact",
    action: "CONTACT US",
    description: "for General Questions / Comments",
  },
  {
    type: "private",
    action: "PRICE / BOOK",
    description: "for Private Activity that you are planning",
  },
  {
    type: "public",
    action: "PRICE / BOOK",
    description: "for Public Event which a Sponsor is coordinating",
  },
];

const MODAL_CONFIG: Record<ActiveForm, { title: string; subtitle: string }> = {
  contact: { title: "Contact Us", subtitle: "General Questions / Comments" },
  private: { title: "Price / Book", subtitle: "Private Activity" },
  public: { title: "Price / Book", subtitle: "Public Event with Sponsor" },
};

export function BookAppointmentSection({ data }: Props) {
  const [activeForm, setActiveForm] = useState<ActiveForm | null>(null);
  const [formValues, setFormValues] = useState<Record<ActiveForm, Record<string, string>>>({
    contact: {},
    private: {},
    public: {},
  });

  function handleFieldChange(form: ActiveForm, name: string, value: string) {
    setFormValues((prev) => ({
      ...prev,
      [form]: { ...prev[form], [name]: value },
    }));
  }

  function resetFormValues(form: ActiveForm) {
    setFormValues((prev) => ({ ...prev, [form]: {} }));
  }

  return (
    <section id={SECTION_IDS.book} className="py-xl">
      <div className="max-w-wide mx-auto px-gutter">
        <div className="text-center mb-md">
          {data?.title && <h3>{data.title}</h3>}
          {data?.body && <SanityContent value={data.body} />}
        </div>

        <div className="max-w-[600px] mx-auto mt-[60px] flex flex-col gap-md">
          {FORM_OPTIONS.map(({ type, action, description }) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveForm(type)}
              className="text-left w-full rounded-card border-2 border-black/20 bg-white/50 hover:bg-white hover:border-teal hover:shadow-md px-lg py-md transition-all"
            >
              <div className="text-xl font-black uppercase">{action}</div>
              <div className="text-sm text-black/60">{description}</div>
            </button>
          ))}
        </div>

        <div className="w-3/4 max-w-[550px] text-center mx-auto">
          <p className="text-xl pt-lg">
            The Seahawks Delorean Car and Trailer are Available for Hire - for
            appearances in greater King County, Washington area.
          </p>
          <p className="text-sm italic text-black/50 max-w-[400px] mx-auto">
            *This is for an appearance or possibly a ride-along as in a parade -
            Not to drive the car. The Trailer cannot be used for riding in.
          </p>
        </div>
      </div>

      {activeForm && (
        <Modal
          title={MODAL_CONFIG[activeForm].title}
          subtitle={MODAL_CONFIG[activeForm].subtitle}
          onClose={() => setActiveForm(null)}
        >
          {activeForm === "contact" ? (
            <ContactUsForm
              values={formValues.contact}
              onChange={(n, v) => handleFieldChange("contact", n, v)}
              onSubmitSuccess={() => resetFormValues("contact")}
            />
          ) : (
            <BookAppointmentForm
              formType={activeForm}
              values={formValues[activeForm]}
              onChange={(n, v) => handleFieldChange(activeForm, n, v)}
              onSubmitSuccess={() => resetFormValues(activeForm)}
            />
          )}
        </Modal>
      )}
    </section>
  );
}
