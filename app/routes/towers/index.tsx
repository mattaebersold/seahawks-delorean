import { loadQueryOptions } from "~/sanity/loadQueryOptions.server";
import type { Route } from "./+types/index";
import { HOME_TOWER_QUERY } from "~/sanity/queries";
import { loadQuery } from "~/sanity/loader.server";
import { useQuery } from "@sanity/react-loader";
import BlocksList from "~/components/blocks/BlocksList";
import type { Tower } from "~/types/blockTypes";
export async function loader({ request }: Route.LoaderArgs) {
  const { options } = await loadQueryOptions(request.headers);
  const query = HOME_TOWER_QUERY;
  const initial = await loadQuery<Tower>(query, {}, options);

  return {
    initial,
    query,
  };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { initial, query } = loaderData;
  const { data } = useQuery(query, {}, { initial });

  if (!data) {
    return (
      <div className="max-w-narrow mx-auto px-xl py-lg">
        <h1 className="text-3xl font-bold">Home page not found</h1>
        <p className="mt-md">Create a Tower with slug "/" to set up the home page.</p>
      </div>
    );
  }

  return (
    <div>
      <title>{data.title || "Home"}</title>
      <main>
        <BlocksList blocks={data.blocks || []} />
      </main>
    </div>
  );
}
