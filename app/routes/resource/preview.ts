import { type LoaderFunctionArgs, redirect } from "react-router";

import { client } from "~/sanity/client";
import { commitSession, destroySession, getSession } from "~/sessions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const session = await getSession(request.headers.get("Cookie"));

  if (searchParams.get("enable") === "true") {
    session.set("projectId", client.config().projectId);
    return redirect("/", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};
