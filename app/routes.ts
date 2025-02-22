import {
  type RouteConfig,
  index,
  prefix,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.ts"),

  layout(
    "routes/auth/layout/route.tsx",
    prefix("auth", [
      route("login", "routes/auth/login/route.tsx"),
      route("register", "routes/auth/register/route.tsx"),
      route("forgot-password", "routes/auth/forgot-password/route.tsx"),
      route("reset-password/:token", "routes/auth/reset-password/route.tsx"),
    ]),
  ),

  layout(
    "routes/settings/layout/route.tsx",
    prefix("settings", [
      route("details", "routes/settings/details/route.tsx"),
      route("security", "routes/settings/password/route.tsx"),
    ]),
  ),
] satisfies RouteConfig;
