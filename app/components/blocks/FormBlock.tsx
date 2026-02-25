import { useState } from "react";
import type { FormBlock as FormBlockType } from "~/types/blockTypes";
import Button from "~/components/global/Button";

export default function FormBlock({
  formName,
  heading,
  fields,
  submitText = "Submit",
  successMessage = "Thank you! Your submission has been received.",
}: FormBlockType) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!formName || !fields?.length) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const data = new FormData(e.currentTarget);
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any).toString(),
      });
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-narrow mx-auto px-gutter py-lg text-center">
        <p className="text-lg">{successMessage}</p>
      </div>
    );
  }

  return (
    <div className="max-w-narrow mx-auto px-gutter py-lg">
      {heading && <h2 className="mb-lg">{heading}</h2>}

      <form
        name={formName}
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="flex flex-col gap-md"
      >
        {/* Required by Netlify */}
        <input type="hidden" name="form-name" value={formName} />

        {fields.map((field) => (
          <div key={field._key} className="flex flex-col">
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="ml-1 text-red">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                rows={5}
                className="resize-y"
              />
            ) : field.type === "select" ? (
              <select id={field.name} name={field.name} required={field.required}>
                <option value="">Select an option</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </div>
        ))}

        {error && (
          <p className="text-red text-sm">Something went wrong. Please try again.</p>
        )}

        <div>
          <Button type="submit" disabled={loading}>
            {loading ? "Sending…" : submitText}
          </Button>
        </div>
      </form>
    </div>
  );
}
