import { useQuery } from "@sanity/react-loader";
import { VisualEditing } from "@sanity/visual-editing/react-router";
import { lazy, Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";

import { loadQuery } from "~/sanity/loader.server";
import { loadQueryOptions } from "~/sanity/loadQueryOptions.server";
import { SETTINGS_QUERY } from "~/sanity/queries";
import { useUserStore } from "~/stores/userStore";

import type { Route } from "./+types/layout";
import type { SETTINGS_QUERY_RESULT } from "~/types/sanity.generated";

const SanityLiveMode = lazy(() =>
  import("~/components/sanity/SanityLiveMode").then((module) => ({
    default: module.SanityLiveMode,
  }))
);
const ExitPreview = lazy(() =>
  import("~/components/sanity/ExitPreview").then((module) => ({
    default: module.ExitPreview,
  }))
);

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { preview, options } = await loadQueryOptions(request.headers);

  // Content from Sanity used in the global layout
  // TODO: Replace with global settings query
  const query = SETTINGS_QUERY;
  const params = {};
  const initial = await loadQuery<SETTINGS_QUERY_RESULT>(
    query,
    params,
    options
  );

  return {
    initial,
    query,
    params,
    sanity: { preview },
  };
};

function WebsiteContent({ loaderData }: Route.ComponentProps) {
  const { initial, query, params, sanity } = loaderData;
  const { data } = useQuery<typeof initial.data>(query, params, {
    initial,
  });
  const { name, hydrate } = useUserStore();
  const location = useLocation();
  const resetNavigate = useNavigate();

  
  // Hydrate store from localStorage on mount
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>

      <div>
        <Header title={data?.siteTitle} navLinks={data?.navLinks} />
        <Outlet />
        <Footer />
      </div>

      {/* Add Sanity Studio preview mode stuff */}
      {sanity.preview ? (
        <Suspense>
          {/* TODO: Can this be replaced with <SanityLive>? */}
          <SanityLiveMode />
          <ExitPreview />
          <VisualEditing />
        </Suspense>
      ) : null}
    </>
  );
}

export default function Website(props: Route.ComponentProps) {
  return <WebsiteContent {...props} />;
}
