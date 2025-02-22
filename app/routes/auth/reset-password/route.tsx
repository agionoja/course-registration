import type { Route } from "./+types/route";
import { queryClient } from "~/utils/query-client";
import { href } from "react-router";

async function throttle<T>(func: () => T, duration = 1) {
  await new Promise((resolve) => setTimeout(resolve, duration));
  return func();
}

export async function loader({ params }: Route.ActionArgs) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    user: {
      firstname: "Divine",
      lastname: "Doe",
      email: "divine@doe.com",
      age: throttle(() => 24),
    },
    params,
  };
}

export async function clientLoader({
  serverLoader,
  params,
}: Route.ClientLoaderArgs) {
  return queryClient.fetchQuery({
    queryKey: [href("/auth/reset-password/:token", { token: params.token })],
    queryFn: async () => await serverLoader(),
    staleTime: Infinity,
  });
}

clientLoader.hydrate = true;

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>{loaderData.user.firstname}</h1>
    </div>
  );
}
