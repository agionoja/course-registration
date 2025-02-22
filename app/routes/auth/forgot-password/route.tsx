import type { Route } from "./+types/route";
import { Form, href, Link } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  return { ping: "" };
}

export default function ForgotPassword({ actionData }: Route.ComponentProps) {
  return (
    <Form>
      {actionData?.ping}
      <Link
        to={href("/auth/reset-password/:token", {
          token: "98765",
        })}
      >
        Reset Password
      </Link>
    </Form>
  );
}
