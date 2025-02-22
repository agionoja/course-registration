import type { Route } from "./+types/route";
import { register } from "~/controllers/auth.controller";

export async function action({ request }: Route.ActionArgs) {
  await register(request);
}

export default function RouteComponent() {
  return <></>;
}
