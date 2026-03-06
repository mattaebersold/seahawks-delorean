import { useEffect } from "react";
import { useQuery } from "@sanity/react-loader";
import { useSearchParams, useLocation } from "react-router";

import { loadQueryOptions } from "~/sanity/loadQueryOptions.server";
import { loadQuery } from "~/sanity/loader.server";
import { HOME_PAGE_QUERY } from "~/sanity/queries";
import { HomeSection } from "~/components/home/HomeSection";
import { AboutSection } from "~/components/home/AboutSection";
import { GallerySection } from "~/components/home/GallerySection";
import { BookAppointmentSection } from "~/components/home/BookAppointmentSection";
import { SECTION_IDS } from "~/types/homeTypes";
import type { HomePage } from "~/types/homeTypes";
import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  const { options } = await loadQueryOptions(request.headers);
  const query = HOME_PAGE_QUERY;
  const initial = await loadQuery<HomePage>(query, {}, options);
  return { initial, query };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { initial, query } = loaderData;
  const { data } = useQuery<HomePage>(query, {}, { initial });
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // On initial load, scroll to the section specified in ?section=
  useEffect(() => {
    const section = searchParams.get("section");
    if (!section) return;
    const id = SECTION_IDS[section as keyof typeof SECTION_IDS];
    if (!id) return;
    // Small delay to let the page paint first
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(t);
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to section when hash changes (e.g. /#about or /#book-appointment)
  useEffect(() => {
    const raw = location.hash.replace("#", "");
    if (!raw) return;
    // Allow aliases like "book-appointment" -> "book"
    const HASH_ALIASES: Record<string, keyof typeof SECTION_IDS> = {
      "book-appointment": "book",
    };
    const hash = (HASH_ALIASES[raw] ?? raw) as keyof typeof SECTION_IDS;
    const id = SECTION_IDS[hash];
    if (!id) return;
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <main>
      <HomeSection data={data?.homeSection} />
      <AboutSection data={data?.aboutSection} />
      <GallerySection data={data?.gallerySection} />
      <BookAppointmentSection data={data?.bookSection} />
    </main>
  );
}
