import { Briefcase } from "lucide-react";
import { defineField, defineType } from "sanity";

export const forHireSectionSchema = defineType({
  name: "forHireSection",
  title: "For Hire",
  type: "document",
  icon: Briefcase,
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image1",
      title: "Image 1",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "image2",
      title: "Image 2",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "image3",
      title: "Image 3",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bottomText",
      title: "Bottom Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "bottomDisclaimerText",
      title: "Bottom Disclaimer Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "eventTypes",
      title: "Event Types",
      description: "List of event types displayed in the grid.",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: "For Hire" };
    },
  },
});
