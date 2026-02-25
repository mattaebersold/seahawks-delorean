import { loadQueryOptions } from "~/sanity/loadQueryOptions.server";
import type { Route } from "./+types/$tower";
import { TOWER_QUERY } from "~/sanity/queries";
import { loadQuery } from "~/sanity/loader.server";
import { useQuery } from "@sanity/react-loader";
import BlocksList from "~/components/blocks/BlocksList";
import type { Tower } from "~/types/blockTypes";
export async function loader({ request, params }: Route.LoaderArgs) {
  const { options } = await loadQueryOptions(request.headers);
  const query = TOWER_QUERY;
  const initial = await loadQuery<Tower>(query, params, options);

  return {
    initial,
    query,
    params,
  };
}

export default function TowerPage({ loaderData }: Route.ComponentProps) {
  const { initial, query, params } = loaderData;
  const { data } = useQuery(query, params, { initial });

  if (!data) {
    return (
      <div className="max-w-narrow mx-auto px-xl py-lg">
        <h1 className="text-3xl font-bold">Tower not found</h1>
      </div>
    );
  }

  return (
    <div>
      <title>{data.title || "Untitled Tower"}</title>
      <main>
        <BlocksList blocks={data.blocks || []} />
      </main>
    </div>
  );
}
