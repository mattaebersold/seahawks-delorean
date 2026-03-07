import { Calendar } from "lucide-react";
import { defineField, defineType } from "sanity";

export const bookSectionSchema = defineType({
  name: "bookSection",
  title: "Book Appointment",
  type: "document",
  icon: Calendar,
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: "Book Appointment" };
    },
  },
});
