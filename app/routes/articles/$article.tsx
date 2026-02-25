import { loadQueryOptions } from "~/sanity/loadQueryOptions.server";
import type { Route } from "./+types/$article";
import { ARTICLE_QUERY } from "~/sanity/queries";
import { loadQuery } from "~/sanity/loader.server";
import type { ARTICLE_QUERY_RESULT } from "~/types/sanity.generated";
import { useQuery } from "@sanity/react-loader";
import { SanityContent } from "~/components/sanity/SanityContent";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { options } = await loadQueryOptions(request.headers);
  const query = ARTICLE_QUERY;
  const initial = await loadQuery<ARTICLE_QUERY_RESULT>(query, params, options);

  return {
    initial,
    query,
    params,
  };
}

export default function Article({ loaderData }: Route.ComponentProps) {
  const { initial, query, params } = loaderData;
  const { data } = useQuery(query, params, { initial });
  return (
    <div>
      <title>{data?.title || "Untitled"}</title>
      <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>
      <SanityContent value={data?.content} />
    </div>
  );
}
